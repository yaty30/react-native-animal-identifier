import { types } from "mobx-state-tree";

export const testing = types
    .model({
        frame: types.string
    })
    .actions(self => ({
        setFrame(frame: string) {
            if (frame != "") self.frame = frame
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

            if (self.name != "" && self.nature != "") {
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
        frameBase64: types.string,
        version: types.string,
        openUpdateTargetServer: types.boolean,
        targetServer: types.string
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
        },
        setVersion(version: string) {
            self.version = version
        },
        setTargetServer(server: string) {
            self.targetServer = server
        },
        setOpenUpdateTargetServer(status: boolean) {
            self.openUpdateTargetServer = status
        }
    }))
    .views(self => ({
        getVersion() {
            return self.version
        }
    }))
    .create({
        recording: false,
        keyboardTrigger: false,
        messageLoading: false,
        initialLoading: false,
        nameLoading: false,
        firstTime: false,
        frameBase64: "",
        version: "v1.0.0",
        openUpdateTargetServer: false,
        targetServer: "192.168.0.188"
    })

interface ObjectDetailsPropos {
    title: string;
    description: string;
}

interface ObjectPropos {
    id: number;
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
        id: types.number,
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
            if (globalVariables.recording) {
                self.data.clear()
                item.forEach(object => {
                    self.data.push(object)
                })
            } else {
                console.log("Pasued.")
            }
        },
        clear() {
            self.data.clear()
        },
    }))
    .views(self => ({
        getObjectDetailById(id: number) {
            const index = self.data.findIndex(obj => obj.id === id)
            return self.data[index].object
        }
    }))
    .create({
        data: [
            {
                id: 9384290,
                x: 66,
                y: 112,
                width: 36,
                height: 36,
                object: {
                    title: "Blue Tang",
                    description: "Blue tangs are high-bodied, compressed, pancake-shaped fishes with pointed snouts and small scales. Their eyes are located high on their heads and their mouths are small and positioned low. Their dorsal fins are continuous."
                },
                confident: 0.88
            },
            {
                id: 49384290,
                x: 166,
                y: 212,
                width: 86,
                height: 86,
                object: {
                    title: "Clownfish",
                    description: "ASDASDA bodied, compressed, pancake-shaped fishes with pointed snouts and small scales. Their eyes are located high on their heads and their mouths are small and positioned low. Their dorsal fins are continuous."
                },
                confident: 0.88
            }
        ]
    });