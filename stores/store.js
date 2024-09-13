import { types } from "mobx-state-tree";

export const testing = types
    .model({
        frame: types.string
    })
    .actions(self => ({
        setFrame(frame) {
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

export const messages = types
    .model({
        list: types.array(message)
    })
    .actions(self => ({
        newMessage(item) {
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
        list: [
            {
                id: 0,
                message: "testing",
                timestamp: 0,
                from: 1
            },{
                id: 1,
                message: "testingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtesti",
                timestamp: 0,
                from: 0
            },{
                id: 2,
                message: "testing",
                timestamp: 0,
                from: 1
            },{
                id: 3,
                message: "testing",
                timestamp: 0,
                from: 1
            },{
                id: 4,
                message: "testing",
                timestamp: 0,
                from: 0
            },
        ]
    })