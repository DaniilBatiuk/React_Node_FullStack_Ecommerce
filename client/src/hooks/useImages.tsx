import { useEffect, useState } from "react";
import axios from "../axios";


export default function useImages(productImage: string[], changeImg: string[]) {
    const [mainPhoto, setMainPhoto] = useState(productImage[0]);
    const [imgLinks, setImgLinks] = useState<string[]>(productImage);
    const [load, setLoad] = useState<boolean>(false);

    useEffect(() => {
        const uploadImage = async () => {
            try {
                let images: string[] = [];
                for (let i = 0; i < changeImg.length; i++) {
                    const formData = new FormData();
                    formData.append('image', changeImg[i]);
                    const { data } = await axios.post('upload', formData);
                    images.push(data.url);
                }
                setImgLinks(images);
                setMainPhoto(images[0]);
                setLoad(false);
            } catch (err) {
                console.warn(err);
            }
        };
        if (changeImg?.length >= 3) {
            setLoad(true);
            uploadImage();
        }
    }, [changeImg]);

    const clearPhoto = () => {
        setMainPhoto("");
        setImgLinks([]);
    }


    return {
        mainPhoto,
        setMainPhoto,
        imgLinks,
        clearPhoto,
        load
    }
}