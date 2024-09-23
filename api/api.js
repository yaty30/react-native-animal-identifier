import { fetch } from './fetch'
import { globalVariables, objects } from '../stores/store'

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
            globalVariables.setInitialLoad(false)
            if (item && item.data) {
                messages.newMessage(item.data)
            }
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