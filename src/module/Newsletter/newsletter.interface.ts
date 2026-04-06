export interface INewsletterSubscribeRequest {
  email: string;
}

export interface INewsletterQuery {
  page?: number;
  limit?: number;
  active?: boolean;
}
