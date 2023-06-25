import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, updateDoc } from "firebase/firestore";
import React from "react";
import ImageCompressor from "image-compressor.js";
import { FirebaseConfig } from "../hooks/useFirebase.hooks";

interface ImageUrls {
    fullSizeImageURL: string;
    lightweightImageURL: string;
}

const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    setFullSizeImgUrl: React.Dispatch<React.SetStateAction<string>>,
    setLightweightImgUrl: React.Dispatch<React.SetStateAction<string>>,
    firebaseConfig: FirebaseConfig
): Promise<ImageUrls> => {
    return new Promise((resolve, reject) => {
        e.preventDefault();
        const image = e.target.files?.[0] || null;
        setImage(image);

        if (!image) {
            reject(new Error("No image selected."));
            return;
        }

        const fileName = new Date().getTime() + image.name;
        const lightweightFileName =
            fileName.replace(/\.[^/.]+$/, "") +
            "_lightweight" +
            image.name.substring(image.name.lastIndexOf("."));

        const app = initializeApp(firebaseConfig);
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const lightweightStorageRef = ref(storage, lightweightFileName);

        const compressor = new ImageCompressor();

        Promise.all([
            compressor.compress(image, { quality: 1 }), // Full-size image compression
            compressor.compress(image, { maxWidth: 300, quality: 0.3 }), // Lightweight image compression
        ])
            .then(([fullSizeImage, lightweightImage]) => {
                const uploadTask = uploadBytesResumable(storageRef, fullSizeImage);
                const lightweightUploadTask = uploadBytesResumable(
                    lightweightStorageRef,
                    lightweightImage
                );

                uploadTask.on(
                    "state_changed",
                    (snapshot: any) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setProgress(progress);
                    },
                    (error: any) => {
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((fullSizeImageURL: string) => {
                                const firestore = getFirestore(app);
                                const imagesCollection = collection(firestore, "images");
                                const imageDocRef = doc(imagesCollection);

                                updateDoc(imageDocRef, {
                                    fullSizeImageURL: fullSizeImageURL,
                                });

                                setFullSizeImgUrl(fullSizeImageURL);

                                lightweightUploadTask.on(
                                    "state_changed",
                                    () => {},
                                    (error: Error) => {
                                        reject(error);
                                    },
                                    () => {
                                        getDownloadURL(lightweightUploadTask.snapshot.ref)
                                            .then((lightweightImageURL: string) => {
                                                updateDoc(imageDocRef, {
                                                    lightweightImageURL: lightweightImageURL,
                                                });

                                                setLightweightImgUrl(lightweightImageURL);

                                                const imageUrls: ImageUrls = {
                                                    fullSizeImageURL: fullSizeImageURL,
                                                    lightweightImageURL: lightweightImageURL,
                                                };

                                                resolve(imageUrls);
                                            })
                                            .catch((error: Error) => {
                                                reject(error);
                                            });
                                    }
                                );
                            })
                            .catch((error: Error) => {
                                reject(error);
                            });
                    }
                );
            })
            .catch((error: Error) => {
                reject(error);
            });
    });
};

export default handleImageChange;
