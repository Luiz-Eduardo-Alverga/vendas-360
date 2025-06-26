import api from "@/lib/axios";

interface GetProductTagsParams {
    productId: string
}

export async function getProductTags({productId}: GetProductTagsParams) {
    const response = await api.get(`/products/${productId}/tags`)

    return response.data
}