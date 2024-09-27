import { fetch } from './fetch'
import { globalVariables, objects, specificTarget } from '../stores/store'

import { testing, messages } from '../stores/store'
export const feed = (data) => {
    return fetch("post", "/streamFeed", data)
        .then((item) => {
            testing.setFrame(item.data.footageFrame)
            return item.data
        })
}

export const talk = (data) => {
    globalVariables.setMessageLoad(true)
    return fetch("post", "/talk", data)
        .then((item) => {
            globalVariables.setMessageLoad(false)
            if (item && item.data) {
                messages.newMessage(item.data)
                if(item.data.initiate) {
                    console.log(`line 21: initiate ${item.data.initiate.toString()}`)
                    specificTarget.setTarget(item.data.target)
                    globalVariables.setRecording(false)
                    globalVariables.setRecording(true)
                }
            }
            globalVariables.setInitialLoad(false)
        })
        .catch((e) => {
            console.error(e)
            globalVariables.setMessageLoad(false)
            globalVariables.setInitialLoad(false)
        })
}

export const PassFrame = (data) => {
    return fetch("post", "/receiveFrame", data)
        .then((item) => {
            if (item && item.data) {
                objects.setFrameSkia(item.data)
            }
            return item
        })
}