import express from 'express';
import {newsLetter} from '../controllers/home.controller.js';
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get('/', (req, res) => {
    const message = req.query.message;
    res.render('index', { message });
});

router.post('/', newsLetter);
  


export default router;