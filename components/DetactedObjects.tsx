import React, { useState, useCallback } from 'react';
import { View, Modal, TouchableOpacity, Text, Image } from 'react-native';
import { DetectedObject, ObjectModal } from '../stores/styles';
import { observer } from 'mobx-react-lite';
import { objectImages } from '../stores/defaultImages';
import { globalVariables, objects } from '../stores/store';
import DetailModal from './DetailModal';

interface ObjectDetailsProps {
    title: string;
    description: string;
}

const getBorderColor = (confident: number) => {
    if (confident >= 0.8) {
        return '#39FF14'; // neon green
    } else if (confident > 0.6 && confident < 0.8) {
        return '#FFF700'; // lemon
    } else if (confident <= 0.6) {
        return '#EE4606' // vermilion
    }
}

const DetailModel = observer(() => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedObject, setSelectedObject] = useState<number>(-1);

    const handleModalOpen = useCallback((id: number) => {
        setSelectedObject(id);
        setModalOpen(true);
    }, []);

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedObject(-1);
    };

    return (
        <>
            {objects.data.map((object) => (
                <TouchableOpacity
                    key={object.id}
                    onPress={() => handleModalOpen(object.id)}
                    style={[DetectedObject.object, {
                        top: object.x,
                        left: object.y,
                        width: object.width,
                        height: object.height,
                        borderColor: getBorderColor(object.confident),
                    }]}
                >
                    <Text>{object.object.title}</Text>
                </TouchableOpacity>
            ))}

            {modalOpen && selectedObject && (
                <DetailModal
                    isVisible={modalOpen}
                    onClose={handleModalClose}
                    id={selectedObject}
                />
            )}
        </>
    );
});

export default DetailModel;