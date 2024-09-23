import { fetch } from './fetch'
import { objects } from '../stores/store'

import { testing, messages } from '../stores/store'
export const feed = (data) => {
    return fetch("post", "/streamFeed", data)
        .then((item) => {
            testing.setFrame(item.data.footageFrame)
            return item.data
        })
}

export const talk = (data) => {
    return fetch("post", "/talk", data)
        .then((item) => {
        if (item && item.data) {
                messages.newMessage(item.data)
           }
        })
}

export const PassFrame = (data) => {
    return fetch("post", "/receiveFrame", data)
        .then((item) => {
            console.log(JSON.stringify(item))
            if (item && item.data) {
                objects.setFrameSkia(item.data)
            }
            return item
        })
}

// export const restoreDogList = () => {
//     return fetch("get", "/dog/getAllDogs")
//         .then((res) => {
//             let list = res.data.map(x => ({
//                 id: +x.id,
//                 name: x.name,
//                 gender: x.gender,
//                 location: x.location,
//                 seterillsed: x.seterillsed,
//                 breed: x.breed,
//                 birthday: x.birthday,
//                 mircochipNo: x.mircochipNo,
//                 intake: x.intake,
//                 description: x.description,
//                 profileImage: x.profileImage,
//                 notes: x.notes,
//                 size: x.size,
//                 weight: x.weight
//             }))
//             dogList.restoreList(list)
//         })
// }
