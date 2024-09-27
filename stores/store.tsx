import { types } from "mobx-state-tree";

export const testing = types
    .model({
        frame: types.string
    })
    .actions(self => ({
        setFrame(frame: string) {
            if(frame != "") self.frame = frame
        }
    }))
    .create({
        frame: ""
    })

const message = types
    .model({
        id: types.number,
        message: types.string,
        timestamp: types.number,
        from: types.number
    })

type targetNatureType = "aquatic" | "terrestrial" | "aerial" | "";

interface NewMessageTargetProps {
    name: string;
    nature: targetNatureType;
}

interface NewMessageProps {
    id: number;
    message: string;
    timestamp: number;
    from: number;
    initiate: boolean;
    target: NewMessageTargetProps | {};
}

export const specificTarget = types
    .model({
        name: types.string,
        nature: types.string
    })
    .actions(self => ({
        setTarget(target: NewMessageTargetProps) {
            self.name = target.name;
            self.nature = target.nature;
        }
    }))
    .views(self => ({
        get() {
            let item = {
                name: "",
                nature: ""
            }

            if(self.name != "" && self.nature != "") {
                item = {
                    name: self.name,
                    nature: self.nature
                }
            }

            return item
        }
    }))
    .create({
        name: "",
        nature: ""
    })
    
export const messages = types
    .model({
        list: types.array(message)
    })
    .actions(self => ({
        newMessage(item: NewMessageProps) {
            item.id = self.list.length;
            self.list.push(item);
        }
    }))
    .views(self => ({
        getMessageList() {
            return self.list.sort((a, b) => a.id - b.id);
        }
    }))
    .create({
        list: []
    })

export const globalVariables = types
    .model({
        recording: types.boolean,
        keyboardTrigger: types.boolean,
        messageLoading: types.boolean,
        initialLoading: types.boolean,
        nameLoading: types.boolean,
        firstTime: types.boolean,
        frameBase64: types.string
    })
    .actions(self => ({
        setRecording(recording: boolean) {
            self.recording = recording
        },
        setKeyboardTrigger(keyboardTrigger: boolean) {
            self.keyboardTrigger = keyboardTrigger
        },
        setMessageLoad(loading: boolean) {
            self.messageLoading = loading
        },
        setInitialLoad(loading: boolean) {
            self.initialLoading = loading
        },
        setNameLoading(loading: boolean) {
            self.nameLoading = loading
        },
        setFirstTime(firstTime: boolean) {
            self.firstTime = firstTime
        },
        setFrameBase64(data: string) {
            self.frameBase64 = data
        }
    }))
    .create({
        recording: false,
        keyboardTrigger: false,
        messageLoading: false,
        initialLoading: false,
        nameLoading: false,
        firstTime: false,
        frameBase64: ""
    })

interface ObjectDetailsPropos {
    title: string;
    description: string;
}

interface ObjectPropos {
    x: number;
    y: number;
    width: number;
    height: number;
    object: ObjectDetailsPropos;
    confident: number;
}

const objectDetails = types
    .model({
        title: types.string,
        description: types.string
    })

const object = types
    .model({
        x: types.number,
        y: types.number,
        width: types.number,
        height: types.number,
        object: objectDetails,
        confident: types.number
    })

export const objects = types
    .model({
        data: types.array(object)
    })
    .actions(self => ({
        setFrameSkia(item: ObjectPropos[]) {
            'worklet';
            self.data.clear()
            item.forEach(object => self.data.push(object))
        },
        clear() {
            self.data.clear()
        },
    }))
    .create({
        data: []
    });