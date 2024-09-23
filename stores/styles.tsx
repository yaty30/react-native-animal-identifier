import { StyleSheet } from 'react-native';
import { globalVariables } from '../stores/store';
import { observer } from 'mobx-react-lite';

const MainStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyView: {
        flex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        position: 'relative',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
    },
    avatar: {
        backgroundColor: "#9514E8",
        padding: 15,
        borderRadius: 50,
        width: 45,
        height: 45
    },
    name: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    status: {
        position: 'absolute',
        right: 0,
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 25
    }
});

const InputAreaStyles = StyleSheet.create({
    bottomView: {
        position: 'absolute',
        left: 25,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    inputStyle: {
        backgroundColor: "rgba(52, 52, 52, 0.25)",
        padding: 10,
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        height: 60,
        width: '65%',
        fontSize: 18,
        color: '#DEDEDE',
        padding: 20,
        borderRadius: 10
    },
    recordButton: {
        width: 60,
        height: 60,
        marginTop: 5,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    sendButton: {
        backgroundColor: '#CD32D7',
        borderRadius: 50,
        padding: 10,
        paddingRight: 13,
        paddingTop: 13,
        marginTop: 10,
        marginBottom: 10
    }
});

const CommentStyles = StyleSheet.create({
    commentView: {
        position: 'absolute',
        bottom: 120,
        left: 25,
        width: '100%',
        maxHeight: 180,
        zIndex: 1
    },
    commentInnerScrollView: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: '100%',
        zIndex: 1
    },
    commentBlock: {
        backgroundColor: "rgba(219, 216, 225, 0.35)",
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    commentSystemAvatar: {
        backgroundColor: "#9514E8",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 35,
        height: 35,
        marginRight: 20,
    },
    commentUserAvatar: {
        backgroundColor: "#004F46",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 35,
        height: 35,
        marginRight: 20,
    },
    commentText: {
        flex: 1,
        fontWeight: 'bold',
        marginRight: 10
    },
});

const ObjectModal = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 5,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        padding: 10,
        backgroundColor: 'rgba(240, 240, 240, 0.8)',
        elevation: 2,
    },
    buttonClose: {
        borderRadius: 5,
        backgroundColor: 'rgba(149, 20, 232, 0.85)',
        padding: 5,
        width: 100,
    },
    textStyle: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTitle: {
        marginBottom: 15,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        color: '#191919',
        backgroundColor: 'transparent'
    },
    modalDescription: {
        marginBottom: 15,
        color: '#191919'
    },
    titleImage: {
        width: 250,
        height: 120,
        borderRadius: 5,
        marginBottom: 10
    }
});

const DetectedObject = StyleSheet.create({
    object: {
        position: 'absolute',
        borderWidth: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    objectTitle: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(25, 25, 25, 0.55)',
        color: '#fff',
        width: '100%',
        textAlign: 'center'
    }
})

export {
    MainStyles, InputAreaStyles, CommentStyles, ObjectModal,
    DetectedObject
}