import Testimonial, { type ITestimonial } from "../../models/Testimonial";

class TestimonialService {

    async create(testimonial: ITestimonial) {
        return await Testimonial.create(testimonial);
    }

    async getAll() {
        return await Testimonial.find();
    }

    async getById(id: string) {
        return await Testimonial.findById(id);
    }

    async update(id: string, testimonial: Partial<ITestimonial>) {
        return await Testimonial.findByIdAndUpdate(id, testimonial, { new: true });
    }

    async delete(id: string) {
        return await Testimonial.findByIdAndDelete(id);
    }

}

export default new TestimonialService();