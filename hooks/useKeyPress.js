import { useEffect } from "react";

export function useKeyPress(key, callback) {
    useEffect(() => {
        const handler = (e) => {
            if (e.key === key) {
                callback();
            }
        };

        // add to document
        document.addEventListener("keydown", handler);

        // remove from document on unmount
        return () => {
            document.removeEventListener("keydown", handler);
        };

    }, [key, callback]);
};