const express=require('express');
const app =express();
const port=4000;
const database=require('mysql');
const bodyParser=require('body-parser');
const { render } = require('ejs');
const { json } = require('body-parser');
var LocalStorage = require('node-localstorage').LocalStorage;

var localStorage = new LocalStorage('./my-storage-directory');



let db=database.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'movies'
});

app.use(express.static('public'));
app.set("view engine","ejs");

var urlencode=bodyParser.urlencoded({extended:false});
app.use(bodyParser.json());


let data="";
let arr=[];

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/index',(req,res)=>{
   
let sql=`select * from movieslist`;
db.query(sql,(err,result)=>{
    
    for(let i of result){
    let a=JSON.parse(i.datas);
    arr.push(a);
  }

   res.render('index',{ arr });
   arr=[];
})
})

app.post('/test',(req,res)=>{
   let sql='select * from movieslist'
    db.query(sql,(err,result)=>{
       for(let i of result){
        arr.push(i.datas);
          }
    })
   console.log(arr[0].title)
    res.redirect('index')
})


app.post('/newuserLogin',urlencode,(req,res)=>{
    console.log("helo")
   let email=req.body.email;
   let password=req.body.password;
   let uniqueId=req.body.uniqueId;

   let sql=`insert into userDetaila (email,password,uniqueId) values ('${email}','${password}','${uniqueId}')`;
   db.query(sql,(err,result)=>{
      if(err){
        console.log(err)
      }else{
        let sql=`select * from bookMarkTable WHERE userName='${email}' and uniqueId='${uniqueId}'`;
        db.query(sql,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                
                res.json(result);
             }
        })
      }
   })
 })

 //GET USERDETAILS TABLE VALUE

 app.get('/getUserDetail',urlencode,(req,res)=>{
    let sql='select * from userDetaila'
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
 })

 //get userData
app.post('/getuserData',urlencode,(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    let uniqueId=req.body.uniqueId;

    let sql=`select * from bookMarkTable WHERE userName='${email}' and uniqueId='${uniqueId}'`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            
            res.json(result);
         }
    })
})


//book mark post method
app.post('/addBookMark',urlencode,(req,res)=>{
    let email=req.body.email;
    let movieName=req.body.movieName;
    let uniqueId=req.body.uniqueId;
    
    let sql=`insert into bookMarkTable (userName,movieName,uniqueId) values ('${email}','${movieName}','${uniqueId}')`;
    db.query(sql,(err,result)=>{

        sql=`select * from bookMarkTable WHERE userName='${email}' and uniqueId='${uniqueId}'`;
       db.query(sql,(err,resul)=>{
        if(err){

        }else{
            res.json(resul)
        }
       })
})

    
})
//remove bookmark post method

app.post('/removeBookMark',urlencode,(req,res)=>{
    let email=req.body.email;
    let movieName=req.body.movieName;
    let uniqueId=req.body.uniqueId;

    let sql=`DELETE FROM bookMarkTable WHERE userName='${email}' AND movieName='${movieName}' AND uniqueId='${uniqueId}'`;
    db.query(sql,(err,result)=>{
       sql=`select * from bookMarkTable WHERE userName='${email}' and uniqueId='${uniqueId}'`;
       db.query(sql,(err,resul)=>{
        if(err){

        }else{
            res.json(resul)
        }
       })
    })
})




app.listen(port,()=>{console.log("lisnting port",port);})

