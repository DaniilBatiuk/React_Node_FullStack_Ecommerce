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