import type { FetchProductsParams } from "../types/product";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const useProducts = (params: FetchProductsParams) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => api.fetchProducts(params),
        retry:2,
        retryDelay: 1000,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchInterval: false,
    })
}   