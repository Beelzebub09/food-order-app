import { useState, useEffect, useCallback } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || "oops something went wrong");
    }

    return resData;
}

export default function useHttp(url, config) {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const sendRequest = useCallback(async function sendRequest() {
        setIsLoading(true);
        try {
            const resData = sendHttpRequest(url, config);
            setData(resData);
        } catch (error) {
            setError(error.message || "something went wrong");
        }
        setIsLoading(false);
    }, [url, config]);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    return {
        data,
        isLoading,
        error
    }
}