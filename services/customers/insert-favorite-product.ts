import api from "@/lib/axios";

interface InsertFavoriteProduct {
  productId: string;
}

export async function insertFavoriteProduct(products: InsertFavoriteProduct[]) {
  const customerId = localStorage.getItem("customerId");

  const response = await api.post(
    `/customers/${customerId}/favorites`,
    products
  );

  return response.data;
}
