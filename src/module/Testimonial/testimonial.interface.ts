export interface ITestimonialCreateRequest {
    feedback: string;
    imageUrl: string;
    publicId: string;
    active?: boolean;
    designation: string;
    company: string;
    type: "SELLER" | "BUYER";
}

export interface ITestimonialUpdateRequest {
    feedback?: string;
    imageUrl?: string;
    publicId?: string;
    active?: boolean;
    designation?: string;
    company?: string;
    type?: "SELLER" | "BUYER";
}

export interface ITestimonialQuery {
    type?: string;
}
