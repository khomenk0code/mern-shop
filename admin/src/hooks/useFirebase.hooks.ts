import { useEffect, useState } from "react";
import axios from "axios";

export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

export const useFirebaseConfig = (): any | null => {
    const [firebaseConfig, setFirebaseConfig] = useState<any | null>(null);

    useEffect(() => {
        axios
            .get("https://mern-shop-api.vercel.app/api/config")
            .then((response) => {
                const { firebaseConfig } = response.data;
                setFirebaseConfig(firebaseConfig);
            })
            .catch((error: any) => {
                console.error("Error fetching config:", error);
            });
    }, []);

    return firebaseConfig;
};
