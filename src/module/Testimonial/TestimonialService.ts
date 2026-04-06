import Testimonial, { type ITestimonial } from "../../models/Testimonial";
import type { ITestimonialCreateRequest, ITestimonialUpdateRequest, ITestimonialQuery } from "./testimonial.interface";

class TestimonialService {

    async create(testimonial: ITestimonialCreateRequest) {
        return await Testimonial.create(testimonial);
    }

    async getAll(filter: ITestimonialQuery = {}) {
        return await Testimonial.find(filter);
    }

    async getById(id: string) {
        return await Testimonial.findById(id);
    }

    async update(id: string, testimonial: ITestimonialUpdateRequest) {
        return await Testimonial.findByIdAndUpdate(id, testimonial, { new: true });
    }

    async delete(id: string) {
        return await Testimonial.findByIdAndDelete(id);
    }

}

export default new TestimonialService();