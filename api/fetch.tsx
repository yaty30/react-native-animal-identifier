import axios from "axios";
import { globalVariables } from "../stores/store";
import { NativeModules } from 'react-native';
import { observer } from "mobx-react-lite";

interface FetchProps {
    host: string
    method: string
    url: string
    body: any
}

export const fetch = async ({ host, method, url, body }: FetchProps) => {
    // const host = "http://192.168.110.189"
    // const host = "http://192.168.50.32" 

    host = `http://${host}`
    const port = 8000

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
    catch (error: any) {
        console.error('Error:', error.message);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Data:', error.response.data);
          console.error('Status:', error.response.status);
          console.error('Headers:', error.response.headers);
        } else {
          // Something happened in setting up the request
          console.error('Error Message:', error.message);
          console.log(error)
        }
    }
}