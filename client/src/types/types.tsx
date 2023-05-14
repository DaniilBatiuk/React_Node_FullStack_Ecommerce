export interface LivingInfo {
    photo: string;
    title: string;
    description: string;
    items: {
        flexDirection: "row" | "row-reverse";
    };
}


export interface Product {
    photo: string;
    title: string;
    price: number;
}


export interface TitleText {
    titleText: string;
    classNames: string;
}

export interface ProductAndTitleText {
    product: Product[];
    titleText: TitleText;
}