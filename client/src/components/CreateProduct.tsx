import React, { useEffect, useState } from "react";
import "../styles/CreateProduct.scss";
import MyInput from "./UI/Modal/Input/MyInput";
import MyButton from "./UI/Modal/Button/MyButton";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import Modal from "./UI/Modal/Modal";
import { Product } from "../types/types";
import { fetchCreateProduct } from "../redux/slices/products";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import axios from "../axios";

export interface CreateProductProps {
    active: boolean;
    setActive: (isActive: boolean) => void;
}


const CreateProduct: React.FC<CreateProductProps> = ({ active, setActive }: CreateProductProps) => {
    const dispatch = useAppDispatch();
    const { types } = useSelector((state: RootState) => state.type);
    const [error, setError] = useState(false);
    const [mainPhoto, setMainPhoto] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<Product>();
    const [imgLinks, setImgLinks] = useState<string[]>([]);


    const onSubmit: SubmitHandler<Product> = (data: Product) => {
        data.img = imgLinks;
        if (data.type === "") data.type = types[0]?.name;
        console.log(data);
        dispatch(fetchCreateProduct(data))
            .unwrap()
            .then((response) => {
                setError(false);
            })
            .catch((error) => {
                setError(true);
                setErrorMessage(error[0]?.msg);
            });
    };

    const { fields, append, remove } = useFieldArray({
        name: 'characteristic',
        control
    });

    useEffect(() => {
        append({ title: "", description: "" });
    }, []);

    const changeImg = watch("img");

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
            } catch (err) {
                console.warn(err);
            }
        };
        if (changeImg?.length === 3) {
            uploadImage();
        }
    }, [changeImg]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Modal active={active} maxDivWidth="600px">
                <div className="modal__header">
                    <div className="modal__title title">Create Product</div>
                    <svg onClick={() => setActive(false)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" fill="#000000"></path> </svg>
                </div>
                {((errors.title || errors.price || errors.characteristic || errors.img || errors.type) && !error) && (
                    <div className="alert alert-danger" role="alert">
                        <div>
                            All fields must be filled
                        </div>
                    </div>
                )}
                {(error) && (
                    <div className="alert alert-danger" role="alert">
                        <div>
                            {errorMessage}
                        </div>
                    </div>
                )}
                <div className="modal__main">
                    <label className="modal__label">Title</label>
                    <MyInput type="text" placeholder="Enter title" label="title" register={register} required />
                    <label className="modal__label">Price</label>
                    <MyInput type="text" placeholder="Enter price" label="price" register={register} required />
                    <label className="modal__label">Gender Selection</label>
                    <select {...register("type")} className="form-select">
                        {(types.length !== 0) && (
                            types.map((type) => (
                                <option key={type._id} value={type.name}>{type.name}</option>)
                            )
                        )}
                    </select>
                    <label className="modal__label">Images</label>
                    <input id="inputFile" className="my-form-control form-control" type="file" {...register("img")} required multiple accept="image/*" />
                    <div className="photos__main">
                        {(imgLinks?.length === 3) && (
                            <div className="photos__main-photo">
                                <img src={`http://localhost:4000${mainPhoto}`} alt="" />
                            </div>
                        )}
                        <div className="photos__all">
                            {(imgLinks?.length === 3) && (
                                imgLinks?.map((elem) => (
                                    <div className="photos__litle-photo" key={elem}>
                                        <img src={`http://localhost:4000${elem}`} alt="" onClick={() => setMainPhoto(elem)} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <label className="modal__label">Characteristic</label>
                    {
                        fields.map((field, index) => (
                            <div key={field.id} className="modal__characteristic">
                                <div className="modal__characteristic-MyInput">
                                    <MyInput type="text" placeholder="Enter title" label={`characteristic.${index}.title`} register={register} required />
                                </div>
                                <div className="modal__characteristic-MyInput">
                                    <MyInput type="text" placeholder="Enter value" label={`characteristic.${index}.description`} register={register} required />
                                </div>
                                {index >= 0 && (
                                    <svg onClick={() => remove(index)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" fill="#000000"></path> </svg>
                                )
                                }
                            </div>
                        )
                        )
                    }
                    <div className="modal__button-div">
                        <MyButton type="button" onClick={() => append({ title: "", description: "" })} value="Add Characteristic" style={{ width: "250px" }} />
                    </div>
                </div>
                <MyButton type="submit" value="Create Product" />
            </Modal>
        </form>
    );
};

export default CreateProduct;