import { body } from 'express-validator'

export const productCreateValidation = [
    body('title', 'title error').isLength({ min: 3 }).isString(),
    body('price', 'price error').isDecimal(),
    body('rating', 'rating error').optional().isInt(),
    body('img', 'img error').isArray({ min: 3, max: 3 }),
    body('type', 'type error').isLength({ min: 3 }).isString(),
    body('characteristic', 'characteristic error').isArray({ min: 3 }),
]

export const typeCreateValidation = [
    body('name', 'name error').isLength({ min: 3 }).isString(),
]

export const registerValidation = [
    body('fullName', 'fullName error').isLength({ min: 3 }).isString(),
    body('email', 'email error').isEmail(),
    body('password', 'password error').isLength({ min: 5 }).isString(),
]

export const loginValidation = [
    body('email', 'Email error').isEmail(),
    body('password', 'password error').isLength({ min: 5 }).isString(),
]

export const basketUpdateValidation = [
    body('basket', 'basket error').isArray(),
]


