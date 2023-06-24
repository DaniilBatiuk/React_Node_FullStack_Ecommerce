import { body } from 'express-validator'

export const productCreateValidation = [
    body('title', 'Error : title length must be min 3').isLength({ min: 3 }).isString(),
    body('price', 'Error : price must be a number').isDecimal(),
    body('rating', 'rating error').optional().isInt(),
    body('img', 'Error : there must be 3 images').isArray({ min: 3, max: 3 }),
    body('type', 'Error : type length must be min 3').isLength({ min: 3 }).isString(),
    body('characteristic', 'Error : there must be min 3 characteristic').isArray({ min: 3 }),
]

export const typeCreateValidation = [
    body('name', 'name error').isLength({ min: 3 }).isString(),
]

export const registerValidation = [
    body('fullName', 'Error : fullName length must be min 3').isLength({ min: 3 }).isString(),
    body('email', 'Error : email is not exist').isEmail(),
    body('password', 'Error : password length must be min 5').isLength({ min: 5 }).isString(),
]

export const loginValidation = [
    body('email', 'Error : email is not exist').isEmail(),
    body('password', 'Error : password length must be min 5').isLength({ min: 5 }).isString(),
]

export const basketAddValidation = [
    body('id', 'id error').isString(),
    body('quantity', 'quantity error').isInt({ min: 1 }),
]

export const basketPatchValidation = [
    body('id', 'id error').isString(),
]
