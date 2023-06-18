import { Request, Response } from 'express';
const router = require("express").Router()
const dotenv = require("dotenv")

dotenv.config()


const {
   FIREBASE_API_KEY,
   FIREBASE_AUTH_DOMAIN,
   FIREBASE_PROJECT_ID,
   FIREBASE_STORAGE_BUCKET,
   FIREBASE_MESSAGING_SENDER_ID,
   FIREBASE_APP_ID
} = process.env;

interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

const firebaseConfig: FirebaseConfig = {
    apiKey: FIREBASE_API_KEY!,
    authDomain: FIREBASE_AUTH_DOMAIN!,
    projectId: FIREBASE_PROJECT_ID!,
    storageBucket: FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID!,
    appId: FIREBASE_APP_ID!
};


router.get('/', (req: Request, res: Response) => {
    res.json({
        firebaseConfig
    });
});

module.exports = router;

