import React, { useState, memo } from 'react';
import { Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { View, Animated, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';

import AnimatedAnimals from './AnimatedAnimals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { globalVariables } from '../stores/store';
import { WelcomeView } from '../stores/styles';
import Feather from 'react-native-vector-icons/Feather';
import { talk } from '../api/api';

const allIcons = [
    require('../assets/animal_icons/1.png'),
    require('../assets/animal_icons/2.png'),
    require('../assets/animal_icons/3.png'),
    require('../assets/animal_icons/4.png'),
    require('../assets/animal_icons/5.png'),
    require('../assets/animal_icons/6.png'),
    require('../assets/animal_icons/7.png'),
    require('../assets/animal_icons/8.png'),
    require('../assets/animal_icons/9.png'),
    require('../assets/animal_icons/10.png'),
    require('../assets/animal_icons/11.png'),
    require('../assets/animal_icons/12.png'),
    require('../assets/animal_icons/13.png'),
    require('../assets/animal_icons/14.png'),
    require('../assets/animal_icons/15.png'),
    require('../assets/animal_icons/16.png'),
    require('../assets/animal_icons/17.png'),
    require('../assets/animal_icons/18.png'),
    require('../assets/animal_icons/19.png'),
    require('../assets/animal_icons/20.png'),
    require('../assets/animal_icons/21.png'),
    require('../assets/animal_icons/22.png'),
    require('../assets/animal_icons/23.png'),
    require('../assets/animal_icons/24.png')
]

const getRandomIconsList = () => {
    const shuffled = allIcons.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 15);
}

const paths = getRandomIconsList()

const randomDuration = () => {
    const min = 7500;
    const max = 14500;
    const step = 500;

    const numSteps = (max - min) / step;
    const randomStepIndex = Math.floor(Math.random() * (numSteps + 1));

    return min + randomStepIndex * step;
};

const getRandomValues = (latency: number) => {
    const duration = randomDuration() + latency;
    const durations = [duration, duration];
    const startX = Math.floor(Math.random() * (101)) - 200;
    const endX = Math.floor(Math.random() * (420)) + 600;

    const outputRange = [startX, endX];


    return {
        duration: durations,
        outputRange: outputRange
    }
}

const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

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
                    <View>
                        <ProgressBar color="#9514E8" />
                        <Text style={WelcomeView.initialiseText}>
                            Initialising...
                        </Text>
                    </View>
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
        </View>
    );
})
