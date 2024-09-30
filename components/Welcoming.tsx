import React, { useState, memo } from 'react';
import { Image, Keyboard, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { observer } from 'mobx-react-lite';

import AnimatedAnimals from './AnimatedAnimals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { globalVariables } from '../stores/store';
import { WelcomeView } from '../stores/styles';
import Feather from 'react-native-vector-icons/Feather';
import { talk } from '../api/api';
import { getRandomValues, shuffleArray, WelcomingIcons } from '../stores/utils';
import Initialising from './Initialising';

const getRandomIconsList = () => {
    const shuffled = WelcomingIcons.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 15);
}

const paths = getRandomIconsList()

interface AnimationProps {
    size: number;
    seq: number;
}

const Animation = memo(({ size, seq }: AnimationProps) => {
    return (
        <View style={WelcomeView.container}>
            {shuffleArray(paths).map((path: any, index: number) => {
                const latency = seq % 2 == 0 ? 1500 : 0;
                const values = getRandomValues(latency);

                return (
                    <AnimatedAnimals
                        key={index}
                        duration={values.duration}
                        outputRange={values.outputRange}
                        imagePath={path}
                        margin={size}
                    />
                )
            })}
        </View>
    )
})

export default observer(() => {
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleNameChange = (text: any) => {
        setName(text)
    }

    const storeData = async () => {
        try {
            setLoading(true)
            Keyboard.dismiss()
            await AsyncStorage.setItem('username', name).then(() => {
                setLoading(false)
                globalVariables.setFirstTime(false)
                globalVariables.setInitialLoad(true)
           })
            
            talk({
                id: 0,
                timestamp: 0,
                message: `Hello there, you may call me ${name}.`
            }).then(() => {
                globalVariables.setInitialLoad(false)
            })

        } catch (e) {
            console.error("error on storing data.");
        }
    };

    return (
        <View style={WelcomeView.mainContainer}>
            {Array.from({ length: 1 }).map((_, i) =>
                <Animation key={i} size={4 * i + 1} seq={i + 1} />
            )}
            <View style={WelcomeView.inputContainer}>
                {globalVariables.initialLoading ?
                    <Initialising />
                    :
                    <View style={WelcomeView.inputView}>
                        <Image source={require("../assets/welcome.png")} style={WelcomeView.welcome} />
                        <TextInput
                            style={WelcomeView.input}
                            onChangeText={handleNameChange}
                            value={name}
                            placeholder="Hi, what's your name?"
                            placeholderTextColor="#9514E8"
                        />
                        {name.length > 0 &&
                            <TouchableOpacity onPress={storeData}>
                                {loading ?
                                    <ProgressBar color="#9514E8" style={{ height: 20 }} />
                                    :
                                    <Feather
                                        name="check"
                                        size={24}
                                        style={WelcomeView.icon}
                                    />
                                }
                            </TouchableOpacity>
                        }
                    </View>
                }
            </View>
            <View style={WelcomeView.versionView}>
                <Text style={WelcomeView.version}>
                    {globalVariables.getVersion()}
                </Text>
            </View>
        </View>
    );
})
