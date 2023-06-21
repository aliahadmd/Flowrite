import express from 'express';
import {signup, login, displayEmails, deleteEmail, searchEmails, exportToExcel} from '../controllers/admin.controller.js';
import {authenticateSession, unauthenticateSession } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateSession, displayEmails,(req, res) => {
    if (req.user) {
        return res.redirect('/admin');
      }
   

});

router.get('/signup', unauthenticateSession, (req, res) => {
   
    res.render('signup');
});
router.get('/login', unauthenticateSession, (req, res) => {
   
    res.render('login');
});

router.post('/signup', signup);
router.post('/login', login);



router.get('/delete/:id', authenticateSession, deleteEmail);
router.get('/search', authenticateSession, searchEmails);


router.get('/export', exportToExcel);



export default router;