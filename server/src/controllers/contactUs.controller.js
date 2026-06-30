import contactModel from "../models/contactUs.model";
import asyncHandler from "../helpers/asyncHandler";

// create contact
 export  const createContact = asyncHandler(async (req, res)=>{
    const {name,email,phone, subject,description, status}
    const data =await contactModel.create({
        name,
        email,
        phone,
        subject,
        description,
        status
    });
    res.status(201).json({
        success:true,
        message:"contact created successfully",
        data,
    });
 }) 