import { fetch } from './fetch'
import { globalVariables, objects, specificTarget } from '../stores/store'

import { testing, messages } from '../stores/store'
import { useRef } from 'react'
export const feed = (data: any) => {
    return fetch({method:"post", url: "/streamFeed", body: data})
        .then((item: any) => {
            testing.setFrame(item.data.footageFrame)
            return item.data
        })
}

export const talk = (data: any) => {
    globalVariables.setMessageLoad(true)
    return fetch({
        method: "post", 
        url: "/talk", 
        body: data
    })
        .then((item: any) => {
            globalVariables.setMessageLoad(false)
            if (item && item.data) {
                messages.newMessage(item.data)
                if(item.data.initiate) {
                    specificTarget.setTarget(item.data.target)
                    globalVariables.setRecording(false)
                    globalVariables.setRecording(true)
                }
            }
            globalVariables.setInitialLoad(false)
        })
        .catch((e: Error) => {
            console.error(e)
            globalVariables.setMessageLoad(false)
            globalVariables.setInitialLoad(false)
        })
}

export const PassFrame = (data: any) => {
    return fetch({
        method: "post", 
        url: "/receiveFrame", 
        body: data
    })
    .then((item: any) => {
        if (item && item.data) {
            objects.setFrameSkia(item.data)
        }
        return item
    })
}