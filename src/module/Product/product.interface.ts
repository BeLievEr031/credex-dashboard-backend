export interface IProductCreateRequest {
  product: string;
  validity: string;
  credits: string[];
  rateLimit?: string;
  productImgUrl?: string;
}

export interface IProductUpdateRequest {
  product?: string;
  validity?: string;
  credits?: string[];
  rateLimit?: string;
  productImgUrl?: string;
  active?: boolean;
}

export interface IProductQuery {
  page?: number;
  limit?: number;
  active?: boolean;
  validity?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}
