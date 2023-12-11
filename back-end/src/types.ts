export interface Promotion {
    id: number;
    title: string;
    commerceName: string;
    creationDate: Date;
    content?: string;
    image?: string;
    hidden : boolean;
}