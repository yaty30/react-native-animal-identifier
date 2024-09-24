import React, { useState } from 'react';
import { Image, TextInput } from 'react-native';
import { View, Animated, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';

import AnimatedAnimals from './AnimatedAnimals';

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
        <View style={styles.container}>
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
    return (
        <View style={styles.mainContainer}>
            {Array.from({ length: 2 }).map((_, i) =>
                <Animation key={i} size={4 * i + 1} seq={i + 1} />
            )}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Hi, what's your name?"
                    placeholderTextColor="#9514E8"
                />
            </View>
        </View>
    );
})

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff'
    },
    container: {
        position: 'absolute',
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
        paddingLeft: 50,
        paddingRight: 50
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlign: 'center',
        display: 'flex',
        color: '#191919',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 50,
    },
});