import React, { useState, useEffect } from 'react';
import LoadingPage from '../../pages/LoadingPage/LoadingPage';
import { getRedirectResult } from "firebase/auth";
import { auth } from "../../firebase";

const LoadingWrapper = ({ children }) => {
    const [loading, setLoading] = useState(true);
    console.log(children)
    useEffect(() => {
        const handleRedirect = async () => {
            try {
                // Check if the authentication redirect has completed
                await getRedirectResult(auth);
            } catch (error) {
                console.error('Error handling redirect:', error.message);
            } finally {
                setLoading(false); // Set loading to false once redirect handling is complete
            }
        };

        // Call handleRedirect function
        handleRedirect();
    }, []);

    return loading ? <LoadingPage /> : children;
    
};

export default LoadingWrapper;
