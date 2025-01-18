
export interface Category {
    id: number;
    name: string;
}

export interface Recipe {
    recipeId: string;
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
    favoriteRecipes: any[];
    uploadedRecipes: any[]; 
}

export interface Review {
    author: Author;
    message: string;
    rating: number;
    timestamp: string;
    likesCount?: number;
}

export interface NewReview {
    recipeId: string;
    message: string;
    rating: number;
    author?: string;
    timestamp?: string;
}

export interface ReviewsProps {
    reviews: Reviews[];
}

export interface AppRoutesProps {
    categories: any[];
    latestRecipes: any[];
}

export interface GeneralCardProps {
    recipe: Recipe;
}