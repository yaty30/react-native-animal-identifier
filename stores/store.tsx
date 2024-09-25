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

type targetNatureType = "aquatic" | "terrestrial" | "aerial";

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
            let item = {}

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

// {
//     "id": 0,
//     "message": "Of course! Let me gather some details about pigs for you. One moment please!",
//     "timestamp": 0,
//     "from": 1,
//     "initiate": true,
//     "target": {
//         "name": "pig",
//         "nature": "terrestrial"
//     }
// }

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
        data: [
            // {
            //     x: 150,
            //     y: 43,
            //     width: 100,
            //     height: 100,
            //     object: { 
            //         title: 'Clownfish', 
            //         description: 'The clownfish can be many different colours, depending on its species, including yellow, orange, red, and black. Most have white details. They are smaller fish, with the smallest around 7 to 8cm long and the longest 17cm long.' 
            //     },
            //     confident: 0.86
            // },
            // {
            //     x: 393,
            //     y: 120,
            //     width: 121,
            //     height: 121,
            //     object: { 
            //         title: 'Blue Tang', 
            //         description: 'Blue tangs are high-bodied, compressed, pancake-shaped fishes with pointed snouts and small scales. Their eyes are located high on their heads and their mouths are small and positioned low. Their dorsal fins are continuous.' 
            //     },
            //     confident: 0.6
            // },
        ]
    });