import React, { useState } from 'react';
import { Alert, Modal, Text, Pressable, View, TextInput } from 'react-native';
import { observer } from 'mobx-react-lite';
import { UpdateTargetServerStyles } from '../stores/styles';
import { globalVariables } from '../stores/store';

const MainModal = () => {
    const styles = UpdateTargetServerStyles;

    return (
        <View style={styles.mainView}>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={globalVariables.openUpdateTargetServer}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        globalVariables.setOpenUpdateTargetServer(
                            !globalVariables.openUpdateTargetServer
                        );
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text: string) => globalVariables.setTargetServer(text)}
                                value={globalVariables.targetServer}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => globalVariables.setOpenUpdateTargetServer(
                                    !globalVariables.openUpdateTargetServer
                                )}>
                                <Text style={styles.textStyle}>Update</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default observer(MainModal);