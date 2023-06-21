import asyncHandler from "express-async-handler";
import User from "../models/users.model.js";

const newsLetter=asyncHandler(async(req, res)=>{
    const {email} =req.body;
    // if user exists
    const existingUser = await User.findOne({ where: { email } });
    if(existingUser){
        const message = "Email already exists!";
        res.redirect(`/?message=${message}`);
        
    } else{
        const user = await User.create({ email });
        user.save();
    
        const message = 'Sucessfully subscribed! Thankyou! 😍';
        res.redirect(`/?message=${message}`);

    }

   
    

});


export {newsLetter}