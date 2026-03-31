import { model, Schema } from "mongoose";

export interface ITestimonial {
    feedback: string;
    imageUrl: string;
    publicId: string;
    active: boolean;
}


const TestimonialSchema = new Schema<ITestimonial>({
    publicId: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
})


const Testimonial = model<ITestimonial>("Testimonials", TestimonialSchema)

export default Testimonial;