import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react-lite';
import { globalVariables } from './stores/store';

import Home from './components/Home';
import Welcoming from './components/Welcoming';
import { talk } from './api/api';
import UpdateTargetServer from './components/UpdateTargetServer';

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
                    host: globalVariables.targetServer,
                    body: {
                        id: 0,
                        timestamp: 0,
                        message: `Hello there, I am ${value}.`
                    }
                })
            }
        } catch (e) {
            console.error(e)
        }
    };

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'This app needs access to your camera.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Camera permission granted');
                } else {
                    console.log('Camera permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <UpdateTargetServer />
            {
                globalVariables.firstTime || globalVariables.initialLoading ?
                    <Welcoming />
                    :
                    <Home />
            }
        </>
    )
})
