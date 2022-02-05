import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        setTimeout(() => {
            // Signal for addding abortController to fetch, to abort it when the component unmounts
            fetch(url,{ signal: abortController.signal })
            .then(res => {
                if(!res.ok) {
                    throw Error("Failed to fetch the data")    
                }
                return res.json();
            })
            .then(fetchedData => {
                setData(fetchedData);
                setIsPending(false);
                setError(true);
            })
            .catch(err => {
                //Checking if the error is an abort error.
                if(err.name === "AbortError") {
                    console.log("Fetch Aborted");
                }
                else {
                    setIsPending(false);
                    setError(err.message);
                }
            })
        }, 500);
        
        //Stopping the useEffect with the component unmounts.
        return () => abortController.abort();

    }, [url]);

    return { data, isLoading, error };
}

export default useFetch;
