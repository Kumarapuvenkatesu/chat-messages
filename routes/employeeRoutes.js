const employeeController=require('../controllers/employeeController');
const express=require('express');
const router=express.Router();

router.post('/register',employeeController.registration);
router.post('/login',employeeController.login);
router.get('/get-employees/:id',employeeController.getAllEmployees);

module.exports=router;
