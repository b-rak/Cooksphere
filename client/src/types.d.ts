
export interface Category {
    id: number;
    name: string;
}

export interface Recipe {
    id: string;
    name: string;
    category: string;
    instructions: string[];
    image: string;
    tags: string[];
    ingredients: { ingredient: string; measure: string }[];
    cookingTimeInMinutes: number;
    rating: number;
    reviews: {
      author: string;
      message: string;
      rating: number;
      timestamp: Date;
    }[];
}

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    image: string;
    favoriteRecipes: any[]; // Replace `any[]` with the actual type
    uploadedRecipes: any[]; // Replace `any[]` with the actual type
  }