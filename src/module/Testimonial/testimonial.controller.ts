import type { Request, Response, NextFunction } from "express";
import TestimonialService from "./TestimonialService";
import { cloudinary } from "../../utils/image.upload";


class TestimonialController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {

            console.log("Cloudinary config:", cloudinary.config());
            const result = await cloudinary.uploader.upload(req.body.image, {
                folder: "testimonial"
            });
            const data = {
                feedback: req.body.feedback,
                imageUrl: result.secure_url,
                publicId: result.public_id,
                active: req.body.active,
                designation: req.body.designation,
                company: req.body.company,
                type: req.body.type
            }

            const result2 = await TestimonialService.create(data);
            res.status(200).json({
                message: "Testimonial create successfully.",
                data: result2
            })
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { type } = req.query;

            const filter: any = {};
            if (type) {
                filter.type = type;
            }

            const testimonials = await TestimonialService.getAll(filter);
            res.status(200).json({
                message: "Testimonials retrieved successfully.",
                data: testimonials
            })
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = String(req.params.id);
            const testimonial = await TestimonialService.getById(id);

            if (!testimonial) {
                res.status(404).json({
                    message: "Testimonial not found."
                })
                return;
            }

            res.status(200).json({
                message: "Testimonial retrieved successfully.",
                data: testimonial
            })
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = String(req.params.id);
            const data: any = {
                feedback: req.body.feedback,
                designation: req.body.designation,
                company: req.body.company,
                type: req.body.type
            }

            // If a new image is uploaded
            if (req.body.image) {
                const testimonial = await TestimonialService.getById(id);

                if (testimonial && testimonial.publicId) {
                    await cloudinary.uploader.destroy(testimonial.publicId as string);
                }

                const result = await cloudinary.uploader.upload(req.body.image);
                data.imageUrl = result.secure_url;
                data.publicId = result.public_id;
            }

            const updatedTestimonial = await TestimonialService.update(id, data);

            if (!updatedTestimonial) {
                res.status(404).json({
                    message: "Testimonial not found."
                })
                return;
            }

            res.status(200).json({
                message: "Testimonial updated successfully.",
                data: updatedTestimonial
            })
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = String(req.params.id);
            const testimonial = await TestimonialService.getById(id);

            if (!testimonial) {
                res.status(404).json({
                    message: "Testimonial not found."
                })
                return;
            }

            // Delete image from cloudinary
            if (testimonial.publicId) {
                await cloudinary.uploader.destroy(testimonial.publicId as string);
            }

            const deletedTestimonial = await TestimonialService.delete(id);

            res.status(200).json({
                message: "Testimonial deleted successfully.",
                data: deletedTestimonial
            })
        } catch (error) {
            next(error);
        }
    }
}

export default new TestimonialController();