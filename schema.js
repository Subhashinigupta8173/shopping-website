const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().trim().min(1).required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    }),
    img: Joi.string().uri().required().messages({
        'string.empty': 'Image URL is required',
        'string.uri': 'Image must be a valid URL',
        'any.required': 'Image URL is required'
    }),
    price: Joi.number().min(0).required().messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price cannot be less than 0',
        'any.required': 'Price is required'
    }),
    desc: Joi.string().trim().min(1).required().messages({
        'string.empty': 'Description is required',
        'any.required': 'Description is required'
    })
});
const reviewSchema = Joi.object({
    rating: Joi.number().min(0).max(5).required().messages({
        'number.base': 'Rating must be a number',
        'number.min': 'Rating cannot be less than 0',
        'number.max': 'Rating cannot be more than 5',
        'any.required': 'Rating is required'
    }),
    comment: Joi.string().trim().min(1).required().messages({
        'string.empty': 'Comment is required',
        'any.required': 'Comment is required'
    })
});

module.exports = { productSchema, reviewSchema};
