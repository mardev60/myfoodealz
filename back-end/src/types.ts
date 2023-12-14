export interface Promotion {
    id: number;
    title: string;
    commerceName: string;
    creationDate: Date;
    content?: string;
    image?: string;
    hidden : boolean;
}

export interface User {
    id: number;
    username : string;
    password : string;
}