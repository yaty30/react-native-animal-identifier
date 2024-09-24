import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { View, Animated, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';

import AnimatedAnimals from './AnimatedAnimals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { globalVariables } from '../stores/store';
import { WelcomeView } from '../stores/styles';
import Feather from 'react-native-vector-icons/Feather';

const paths = [
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
];

const randomDuration = () => {
    const min = 8500;
    const max = 10500;
    const step = 500;

    const numSteps = (max - min) / step;
    const randomStepIndex = Math.floor(Math.random() * (numSteps + 1));

    return min + randomStepIndex * step;
};

const getRandomValues = (latency: number) => {
    const duration = randomDuration() + latency;
    const durations = [duration, duration];
    const outputRange = [
        Math.floor(Math.random() * (-450 - -150 + 1)) + -150,
        Math.floor(Math.random() * (650 - 450 + 1)) + 450
    ];

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

const Animation = ({ size, seq }: AnimationProps) => {
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
}

export default observer(() => {
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleNameChange = (text: any) => {
        setName(text)
    }

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('username', name);
            setLoading(true)
            globalVariables.setInitialLoad(true)

            setInterval(() => {
                globalVariables.setInitialLoad(false)
                globalVariables.setFirstTime(false)
                setLoading(false)
            }, 1500)

        } catch (e) {
            console.error("error on storing data.");
        }
    };

    return (
        <View style={WelcomeView.mainContainer}>
            {Array.from({ length: 2 }).map((_, i) =>
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
                                    <ProgressBar color="#9514E8" style={{height: 20}} />
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
