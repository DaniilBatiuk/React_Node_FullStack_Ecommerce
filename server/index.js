import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import { productCreateValidation, typeCreateValidation, basketAddValidation,basketPatchValidation, registerValidation, loginValidation } from './validations.js';

import { checkAuthMiddleware, handlerValidationErrorsMiddleware } from './middleware/index.js'

import { UserController, ProductController, TypeController } from './controllers/index.js'

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGOOSE_CONNECTION)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();
app.use(cors());

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });


app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handlerValidationErrorsMiddleware, UserController.login);
app.post('/auth/register', registerValidation, handlerValidationErrorsMiddleware, UserController.register);
app.get('/auth/me', checkAuthMiddleware, UserController.getMe);
app.post('/auth/addToBasket', checkAuthMiddleware, basketAddValidation, handlerValidationErrorsMiddleware, UserController.addToBasket);
app.patch('/auth/updateBasket', checkAuthMiddleware, basketPatchValidation, handlerValidationErrorsMiddleware, UserController.updateBasket);


app.get('/type', TypeController.getAll);
app.get('/type/:id', TypeController.getOne);
app.post('/type', checkAuthMiddleware, typeCreateValidation, handlerValidationErrorsMiddleware, TypeController.create);
app.delete('/type/:id', checkAuthMiddleware, TypeController.remove);
app.patch('/type/:id', checkAuthMiddleware, typeCreateValidation, handlerValidationErrorsMiddleware, TypeController.update);


app.get('/product/:id', ProductController.getOne);
app.get('/product/type/:type', ProductController.getAllByType);
app.get('/product', ProductController.getAll);
app.post('/product', checkAuthMiddleware, TypeController.getIdByName, productCreateValidation, handlerValidationErrorsMiddleware, ProductController.create);
app.delete('/product/:id', checkAuthMiddleware, ProductController.remove);
app.patch('/product/:id', checkAuthMiddleware, TypeController.getIdByName, productCreateValidation, handlerValidationErrorsMiddleware, ProductController.update);

app.post('/upload', checkAuthMiddleware, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});







const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT} `));
    }
    catch (err) {
        console.log(err);
    }
}

start();
