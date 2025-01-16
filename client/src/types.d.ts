export interface Category {
    id: number;
    name: string;
}

export interface Recipe {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

export interface AuthUser {
    id: number;
    email: string;
    name: string;
}