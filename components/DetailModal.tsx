import React from 'react'

import { observer } from 'mobx-react-lite';
import { Modal, View, Image, Text, TouchableOpacity } from 'react-native';
import { objectImages } from '../stores/defaultImages';
import { ObjectModal } from '../stores/styles';
import { objects } from '../stores/store';

const DetailModal = observer(({ isVisible, onClose, id }: any) => {
    const data = objects.getObjectDetailById(id)
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={ObjectModal.centeredView}>
                <View style={ObjectModal.modalView}>
                    <Image
                        style={ObjectModal.titleImage}
                        source={{ uri: objectImages.getObjectImage(data.title) }}
                    />
                    <Text style={ObjectModal.modalTitle}>{data.title}</Text>
                    <Text style={ObjectModal.modalDescription}>{data.description}</Text>
                    <TouchableOpacity style={ObjectModal.buttonClose} onPress={onClose}>
                        <Text style={ObjectModal.textStyle}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
});

export default DetailModal;