import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react-lite';
import { globalVariables } from './stores/store';
import { Dimensions } from 'react-native';

import Home from './components/Home';
import Welcoming from './components/Welcoming';
import { talk } from './api/api';

export default observer(() => {
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            if (value == null || value.length == 0) {
                globalVariables.setInitialLoad(false)
                globalVariables.setFirstTime(true)
            } else {
                globalVariables.setInitialLoad(true)
                talk({
                    id: 0,
                    timestamp: 0,
                    message: `Hello there, I am ${value}.`
                })
            }
        } catch (e) {
            console.error(e)
        }
    };

    const debug = async () => {
        try {
            console.log("DEBUG TESTING")
            await AsyncStorage.setItem('username', "");
        } catch (e) {
            console.error("error on storing data.");
        }
    };


    useEffect(() => {
        // debug()
        console.log(Dimensions.get('window'))
        getData()
    }, [])

    return (
        globalVariables.firstTime || globalVariables.initialLoading?
            <Welcoming />
            :
            <Home />
    )
})
