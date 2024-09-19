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
        keyboardTrigger: types.boolean
    })
    .actions(self => ({
        setRecording(recording: boolean) {
            self.recording = recording
        },
        setKeyboardTrigger(keyboardTrigger: boolean) {
            self.keyboardTrigger = keyboardTrigger
        },
    }))
    .create({
        recording: false,
        keyboardTrigger: false
    })