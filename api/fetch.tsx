import axios from "axios";

// const host = "http://192.168.110.189"
const host = "http://192.168.0.188"
// const host = "http://192.168.50.36"

const port = 8000

interface FetchProps {
    method: string
    url: string
    body: any
}

export const fetch = async ({ method, url, body }: FetchProps) => {
    const mainFetch = async () => {

        if (method === "post") {
            return axios({
                method: 'post',
                url: host + ":" + port + url,
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