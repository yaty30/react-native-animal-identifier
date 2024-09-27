import React from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';

import { ProgressBar } from '@react-native-community/progress-bar-android';
import { WelcomeView } from '../stores/styles';

export default observer(() => {

    return (
        <View>
            <ProgressBar color="#9514E8" />
            <Text style={WelcomeView.initialiseText}>
                Initialising...
            </Text>
        </View>
    );
})
