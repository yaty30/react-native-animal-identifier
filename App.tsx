import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';

import { observer } from 'mobx-react-lite';
import { globalVariables, objects } from './stores/store';
import { MainLoadingView, MainStyles } from './stores/styles';

import Home from './components/Home';
import Welcoming from './components/Welcoming';

export default observer(() => {
    return (
        // globalVariables.initialLoading ?
        //     <View style={MainLoadingView.container}>
        //         <ProgressBar color="white" />
        //         <Text>
        //             Initialising...
        //         </Text>
        //     </View>
        //     :
        //     <Home />
        <Welcoming />
    )
})
