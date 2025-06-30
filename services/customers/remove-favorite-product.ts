import api from "@/lib/axios";

export async function removeFavoriteProduct(productIds: string[]) {
  const customerId = localStorage.getItem("customerId");

  const response = await api.delete(`/customers/${customerId}/favorites`, {
    data: productIds, 
  });

  return response.data;
}
