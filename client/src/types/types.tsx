export interface LivingInfo {
    photo: string;
    title: string;
    description: string;
    items: {
        flexDirection: "row" | "row-reverse";
    };
}


export interface Product {
    _id: string;
    title: string;
    price: number;
    rating: number;
    img: string[];
    type: string;
    characteristic: Characteristic[];
    user: string;
}

export interface Characteristic {
    title: string,
    description: string,
}

export interface TitleText {
    titleText: string;
    classNames: string;
}

export interface ProductAndTitleText {
    product: Product[];
    titleText: TitleText;
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