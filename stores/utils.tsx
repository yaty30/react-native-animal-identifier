export const GetTimestamp = () => {
    const d = new Date()
    return d.getTime();
}

export const WelcomingIcons = [
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

const WelcomingRandomDuration = () => {
    const min = 7500;
    const max = 14500;
    const step = 500;

    const numSteps = (max - min) / step;
    const randomStepIndex = Math.floor(Math.random() * (numSteps + 1));

    return min + randomStepIndex * step;
}

export const getRandomValues = (latency: number) => {
    const duration = WelcomingRandomDuration() + latency;
    const durations = [duration, duration];
    const startX = Math.floor(Math.random() * (101)) - 200;
    const endX = Math.floor(Math.random() * (420)) + 600;

    const outputRange = [startX, endX];


    return {
        duration: durations,
        outputRange: outputRange
    }
}

export const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}