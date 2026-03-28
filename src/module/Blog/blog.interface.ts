export interface IBlogCreateRequest {
  title: string;
  slug?: string;
  blogJSONData: object;
  bannerImgUrl?: string;
}

export interface IBlogUpdateRequest {
  title?: string;
  slug?: string;
  blogJSONData?: object;
  bannerImgUrl?: string;
  active?: boolean;
}

export interface IBlogQuery {
  page?: number;
  limit?: number;
  active?: boolean;
  sortBy?: string;
  order?: "asc" | "desc";
}
