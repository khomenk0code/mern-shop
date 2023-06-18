import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from "firebase/app";
import React from "react";
import { FirebaseConfig} from "../hooks/useFirebase.hooks";

const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    setImgUrl: React.Dispatch<React.SetStateAction<string>>,
    firebaseConfig: FirebaseConfig
) => {
    e.preventDefault();
    const image = e.target.files?.[0] || null;
    setImage(image);

    if (image) {
        const fileName = new Date().getTime() + image.name;
        const app = initializeApp(firebaseConfig); // Инициализация Firebase с помощью переданной конфигурации
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot: any) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error: any) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
                    setImgUrl(downloadURL);
                });
            }
        );
    }
};

export default handleImageChange;
