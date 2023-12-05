import axios from 'axios';

// Module to handle API requests to the server.

export function createApiHandler() {
    const apiInstance = axios.create();

    //State variables (Manage requests state)
    let loading = false;
    let data = null;
    let error = null;

    async function makeRequest(url, requestData, onError = null) {
        loading = true;
        try {
            const response = await apiInstance.post(url, requestData);
            data = response.data;
            return data;
        } catch (err) {
            error = err;
            if (onError) {
                onError(err);
            } else {
                throw err;
            }
        } finally {
            loading = false;
        }
    }

    return {
        get loading() {
            return loading;
        },
        get data() {
            return data;
        },
        get error() {
            return error;
        },
        makeRequest
    };
}
