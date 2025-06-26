import { Product } from "@/interfaces/products";
import api from "@/lib/axios";

interface GetProductParams {
    productId: string
}

export async function getProduct({productId}: GetProductParams) {
    const response = await api.get<Product>(`/products/${productId}`)

    return response.data
}