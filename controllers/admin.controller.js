import asyncHandler from 'express-async-handler';
import Admin from '../models/admin.model.js';
import User from '../models/users.model.js';
import ExcelJS from 'exceljs';
import { Op } from "sequelize";


const signup = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const existingAdmin = await Admin.findOne({ where: { email } });
    if(existingAdmin){
        const message = "Email already exists";
        res.redirect(`/?message=${message}`);
        
    } else{

    const admin = await Admin.create({
        email,
        password

    });

    admin.save();
    res.redirect(`/admin/login`);
}
});



const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    //find the admin by email
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      res.redirect(`/admin/login?message=Email does not exist`);
    } else {
      req.session.adminId = admin.id;
      res.redirect("/admin");
    }
})

const displayEmails = asyncHandler(async (req, res) => {
    const users = await User.findAll();
    res.render('admin', { users });
  });

  const deleteEmail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.redirect('/admin');
  });
  
  // const searchEmails = asyncHandler(async (req, res) => {
  //   const { search } = req.query;
  //   const users = await User.findAll({ where: { email: search } });
  //   res.render('admin', { users, search }); // Pass the search variable
  // });

  const searchEmails = asyncHandler(async (req, res) => {
    const { search } = req.query;
    const users = await User.findAll({
      where: {
        email: {
          [Op.like]: `%${search}%`, // Use the like operator with % wildcards
        },
      },
    });
    res.render("admin", { users, search }); // Pass the search variable
  });

  const exportToExcel = asyncHandler(async (req, res) => {
    const { search } = req.query;
    let users;
  
    if (search) {
      users = await User.findAll({ where: { email: search } });
    } else {
      users = await User.findAll();
    }
  
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');
  
    // Add headers to the worksheet
    worksheet.addRow(['ID', 'Email', 'Created At']);
  
    // Add user data to the worksheet
    users.forEach((user) => {
      worksheet.addRow([user.id, user.email, user.createdAt]);
    });
  
    // Generate the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
  
    res.set('Content-Disposition', 'attachment; filename=users.xlsx');
    res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  });
  

export {signup, login, displayEmails, deleteEmail, searchEmails, exportToExcel}