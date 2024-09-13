import axios from "axios";
// import * as https from 'https';

const host = "http://192.168.0.188:8000"
// const host = "http://192.168.50.36:8000"

export const fetch = async (method, url, body) => {
    const mainFetch = async () => {

        if (method === "post") {
            return axios({
                method: 'post',
                url: host + url,
                data: body,
            }).then(res => res)
        } else {
            return axios({
                method: 'get',
                url: host + url,
                responseType: 'json'
            })
            .then(res => res)
        }
    }

    try {
        const res = await mainFetch()
        return res
    }
    catch (err) {
        console.log(err)
    }
}