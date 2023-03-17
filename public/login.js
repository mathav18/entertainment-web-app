

$(document).ready(function(){
    $("#signUp").click(function(){
      $(".message__container2").show();
       console.log("hello")
      });
  });

  $(document).ready(function(){
    $("#login").click(function(){
      $(".message__container2").hide();
       console.log("hello")
      });
  });

//   createAccount
function createAccount(){
    let elementarr=document.querySelectorAll('#inpsignUp');
    let display=document.getElementById('display2');
    let email=elementarr[0].value;
    let password=elementarr[1].value;
    let repeatPassword=elementarr[2].value;
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        if(password.length>7){
            if(password==repeatPassword){
                   display.innerText='';
                   uploaduserdetails(email,password);
                   elementarr[0].value="";
                   elementarr[1].value="";
                   elementarr[2].value="";
           }else{
                display.innerText='password and confirm password inncorrect!';
                return '';
               }
          }else{
            display.innerText="password length must longerthen 7 "
            return '';
          }
       }else{
         display.innerText='You have entered an invalid email address!';
         return '';
     }
}

//login Account
//JS TO SERVER.JS VIA FETCH
let alphatArr="QWERTYUIOPLKJHGFDSAZXCVBNM1234567890".split("");
let uniqueId="#";

function uploaduserdetails(email,password){

    for(let i=0;i<5;i++){
        let random=Math.floor(Math.random()*alphatArr.length);
        uniqueId+=alphatArr[random];
    }

      let obj={
        'email':email,
        'password':password,
        'uniqueId':uniqueId
      }

    fetch('/newuserLogin',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)
      })
      .then((res)=>{ return res.json(); })
      .then((data)=>{let val=data;
        localStorage.setItem('bookMark',JSON.stringify(val));
      })

    
    let data=JSON.stringify(obj);
    localStorage.setItem('email',data);
    localStorage.setItem('bookMark',[])
     window.location.href='/index';
    }

//login Account

function loginAccount(){
    let inputElementArr=document.querySelectorAll('#inpLogin');
    let display=document.querySelector('#display');

    let email=inputElementArr[0].value;
    let password=inputElementArr[1].value;
   
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        if(password.length>7){
            getUserDetails(email,password);
            inputElementArr[0].value="";
            inputElementArr[1].value="";

        }else{
            display.innerText='Inncorrect Password'
        }

    }else{
         display.innerText="Inncorrect Email!"
    }
}




//checkEmailAndPassword
function getUserDetails(email,password){
    fetch('/getUserDetail',{
        method:'GET',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then((res)=>{return res.json()})
    .then((data)=>{
       checkEmailAndPassword(data,email,password);
    })
}




function checkEmailAndPassword(data,currentEmail,currentPassword){
    let uniqueId="";
    let display=document.querySelector('#display');
     
      for(let i of data){
        if(i.email==currentEmail){
              if(i.password==currentPassword){
                 uniqueId=i.uniqueId;
                 getUserData(currentEmail,currentPassword,uniqueId);
                 uniqueId="";
                 display.innerText="Incorrect Email";
                 return "";
              
              }else{
                 display.innerText="Incorrect Password";
              }
         }
      }
    }




    //get userLoginData
 function getUserData(email,password,uniqueId){
       let obj={
        email:email,
        password:password,
        uniqueId:uniqueId
       }


       fetch('/getuserData',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)
      })
      .then((res)=>{return res.json()})
      .then((data)=>{
        console.log(data);
        let res=data;
        print(res,email,uniqueId)})
}


function print(data,email,uniqueId){
   
        let details={
            email:email,
            uniqueId:uniqueId
        }

      let userDetails=JSON.stringify(details);

      localStorage.setItem('email',userDetails);

      console.log(data)
      let bookmarkData=JSON.stringify(data)
      localStorage.setItem('bookMark',bookmarkData);
    window.location.href=`/index`;

}
