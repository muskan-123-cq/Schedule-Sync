//getData.js
const express=require('express');
const {reading, getCurrentUser, getLecture, getLecturesByEmail}= require('../controllers/getData');
const getRouter=express.Router();
getRouter.get('/data',reading);
getRouter.post('/lectures',getLecture);
getRouter.get('/currentUser',getCurrentUser); 
getRouter.get('/email',getLecturesByEmail); 
module.exports=getRouter;