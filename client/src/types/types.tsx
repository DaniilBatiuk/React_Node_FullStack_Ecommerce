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
    characteristic: Characteristic[];
}


export interface TitleText {
    titleText: string;
    classNames: string;
}

export interface ProductAndTitleText {
    product: Product[];
    titleText: TitleText;
}

export interface Characteristic {
    title: string,
    description: string,
}
