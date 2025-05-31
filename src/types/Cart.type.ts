export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    description: string;
    category: string;
}

export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
    totalItems: number;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
} 