
export interface ILivingInfo {
    photo: string;
    title: string;
    description: string;
    items: {
        flexDirection: "row" | "row-reverse";
    };
}


export interface IProduct {
    _id: string;
    title: string;
    price: number;
    rating: number;
    img: string[];
    type: IType;
    characteristic: ICharacteristic[];
    user: IUser;
}
export interface IUser {
    _id: string;
    email: string;
    fullName: string;
    basket: {
        product: IProduct,
        quantity: number,
    }[];
    createdAt: string;
}

export interface IProductCreate {
    _id: string;
    title: string;
    price: number;
    rating: number;
    img: string[];
    type: string;
    characteristic: ICharacteristic[];
    user: string;
}

export interface IType {
    _id: string;
    name: string;
    __v: number;
}


export interface ICharacteristic {
    title: string,
    description: string,
}

export interface IFormValues {
    email: string;
    password: string;
}

export interface IFormValues2 {
    fullName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}