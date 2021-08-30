const express=require('express');

const app=express ();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname +'/dist/escola-front'));

app.get('/*',(req,res)=> {
  res.sendFile(__dirname + '/dist/escola-front/index.html');
});



