import React, { useState, useEffect } from 'react';

const NavigationPrompt = () => {
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // For Chrome
            return ''; // For Firefox
        };

        const handleUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // For Chrome
            return ''; // For Firefox
            window.alert('Unsaved log. Are you sure you want to exit the page?');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('unload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('unload', handleUnload);
        };
    }, []);

    return null;
};

export default NavigationPrompt;
