import axios from "axios";

const client = axios.create({baseURL: 'http://localhost:4000'});

export const request = ({...options})=>{
    client.defaults.headers.common.Authorization = `Bearer token`
    const onSuccess = response => response
    const onError = error =>{
        //optionally catch errors and add additionally logging errors. perhaps you can also redirect to the log in page if lets say the status code 401. just make sure to return the error at the end
        return error
    }

    return client(options).then(onSuccess).catch(onError)

}