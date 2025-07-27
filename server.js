const express = require('express');
const session=require('express-session');
const mainRouter = require('./routes');
const app = express();
const fs= require('fs');
const path=require('path');
const { connect } = require('http2');
app.use(express.json());
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'muskan123',
    resave:false,
    saveUnitialized:true,
}))
app.get('/admin', (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    if (req.session && req.session.obj && req.session.obj.email && req.session.obj.role=='admin') {
        res.sendFile(path.join(__dirname, 'views', 'admin.html'));
    } else {
        res.status(401).send('Unauthorized: Please signin first');
    }
});
app.get('/teacher', (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    if (req.session && req.session.obj && req.session.obj.email && req.session.obj.role=='teacher') {
        res.sendFile(path.join(__dirname, 'views', 'teacher.html'));
    } else {
        res.status(401).send('Unauthorized: Please login first');
    }
});
app.post('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err) res.send('fail logout');
        res.send('logged out');

    })
})
app.use('/',mainRouter);
app.listen('3000',()=>{
    console.log('Server is running at 3000');
    
})