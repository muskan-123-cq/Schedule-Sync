const express=require('express');
const {printLectures, setCurrentUser} = require('../controllers/postData');
const postRouter=express.Router();
postRouter.post('/data',printLectures);
postRouter.post('/currentUser',setCurrentUser);
module.exports=postRouter;