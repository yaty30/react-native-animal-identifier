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

interface NewMessageProps {
    id: number;
    message: string;
    timestamp: number;
    from: number;
}
export const messages = types
    .model({
        list: types.array(message)
    })
    .actions(self => ({
        newMessage(item: NewMessageProps) {
            item.id = self.list.length;
            console.log(item);
            self.list.push(item);
        },
        stopLoading() {
            const index = self.list.findIndex(x => x.from === 2)
            self.list.slice(index, 1)
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
        firstTime: types.boolean
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
        }
    }))
    .create({
        recording: false,
        keyboardTrigger: false,
        messageLoading: false,
        initialLoading: false,
        nameLoading: false,
        firstTime: false
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