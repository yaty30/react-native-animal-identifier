import React, { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react-lite';
import { globalVariables } from './stores/store';

import Home from './components/Home';
import Welcoming from './components/Welcoming';

export default observer(() => {
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            if (value == null) {
                globalVariables.setInitialLoad(false)
                globalVariables.setFirstTime(true)
            }
        } catch (e) {
            console.error(e)
        }
    };


    useEffect(() => {
        getData()
    }, [])

    return (
        globalVariables.firstTime?
            <Welcoming />
            :
            <Home />
    )
})
