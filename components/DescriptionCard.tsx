import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, Image } from 'react-native';
import { DetectedObject, ObjectModal } from '../stores/styles';
import { observer } from 'mobx-react-lite';
import { objectImages } from '../stores/defaultImages';
import { globalVariables } from '../stores/store';

interface ObjectDetailsPropos {
    title: string;
    description: string;
}

interface DescriptionCardProps {
    x: number;
    y: number;
    width: number;
    height: number;
    object: ObjectDetailsPropos;
    confident: number;
}

const getBorderColor = (confident: number) => {
    if(confident > 0.8) {
        return '#39FF14'; // neon green
    } else if(confident > 0.6 && confident < 0.8) {
        return '#FFF700'; // lemon
    } else if(confident <= 0.6) {
        return '#EE4606' // vermilion
    }
}

const DescriptionCard = observer(({ x, y, width, height, object, confident }: DescriptionCardProps) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
        if(globalVariables.recording) globalVariables.setRecording(false);
    };

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalOpen}
                onRequestClose={handleModalOpen}
            >
                <View style={ObjectModal.centeredView}>
                    <View style={ObjectModal.modalView}>
                        <Image
                            style={ObjectModal.titleImage}
                            source={{ uri: objectImages.getObjectImage(object.title) }}
                        />
                        <Text style={ObjectModal.modalTitle}>
                            {object.title}
                        </Text>
                        <Text style={ObjectModal.modalDescription}>
                            {object.description}
                        </Text>
                        <TouchableOpacity
                            style={ObjectModal.buttonClose}
                            onPress={handleModalOpen}
                        >
                            <Text style={ObjectModal.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                style={[DetectedObject.object, {
                    top: x,
                    left: y,
                    width: width,
                    height: height,
                    borderColor: getBorderColor(confident),
                }]}
                onPress={handleModalOpen}
            >
                <Text style={DetectedObject.objectTitle}>
                    {object.title}
                </Text>
            </TouchableOpacity>
        </>
    );
});

export default DescriptionCard;