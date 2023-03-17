function filter(ele,val){
    
    
   
    let elearr=document.querySelectorAll('#imageIcon');
    let arr=[1,'assets/icon-nav-movies.svg','assets/icon-nav-tv-series.svg','assets/icon-nav-bookmark.svg'];
    let arr2=[1,'assets/icon-category-movie.svg','assets/icon-category-tv.svg','assets/icon-bookmark-full.svg'];

    for(let i=1;i<arr.length;i++){
        elearr[i].src=arr[i];

        if(val==i){
            ele.src=arr2[val]
        }

    }

    if(val==3){
        bookmarkFilter();
        return '';
    }




//filter div
let valArr=["home","Movie","TV Series","bookmark"];

let content=valArr[val];

let elementArray=document.querySelectorAll(".recommnd__Div");


// fillter loop

for(let i of elementArray){
   
    let baby=i.childNodes;
    let text=baby[3].innerText.split("•")[1].trim();
   

    if(text==content){
        i.style.display="block";
        
    }else{
        i.style.display="none"
    }

  if(content=="home"){
        i.style.display="block"
    }

}


let trendingElementArr=document.querySelectorAll(".trending");
for(let i of trendingElementArr){
   
    let baby=i.children[0].childNodes[3].childNodes[1].innerText.split("•")[1].trim();
   

    if(baby==content){
        i.style.display="block";
        
    }else{
        i.style.display="none"
    }
    if(content=="home"){
        i.style.display="block"
        i.style.display="flex"
    }
}

}


//search filter
function searchFilter(ele){
   let query=ele.value.toUpperCase();

  

    let trendingElementArr=document.querySelectorAll(".trending");
for(let i of trendingElementArr){
   let baby=i.children[0].childNodes[3].childNodes[3].innerText;
  baby=baby.toUpperCase();
   if(baby.includes(query)){
        i.style.display="block";
        
    }else{
        i.style.display="none"
    }
    if(query==""){
        i.style.display="block"
        i.style.display="flex"
    }
}

let elementArray=document.querySelectorAll(".recommnd__Div");
// fillter loop
for(let i of elementArray){
    let baby=i.children[2].innerText.toUpperCase();
    console.log(baby)
 if(baby.includes(query)){
        i.style.display="block";
        
    }else{
        i.style.display="none"
    }

  if(query==""){
        i.style.display="block"
 }
}
}
//bookMark function

function bookMarkFunction(ele){
    let baby=ele.children[0];
    let movieName=ele.value;
    let email=localStorage.getItem('email')
  
    if(baby.src==="http://localhost:4000/assets/icon-bookmark-empty.svg"){
        baby.src='assets/icon-bookmark-full.svg';
        getBookMarkDetails(email,movieName);
        
    }else{
        baby.src='assets/icon-bookmark-empty.svg';
        removeBookMark(email,movieName)
         }
   }

//bookMark fetch function

function getBookMarkDetails(email,movie){
    let emailAndUniqueId=JSON.parse(email);
    let obj={
        email:emailAndUniqueId.email,
        uniqueId:emailAndUniqueId.uniqueId,
        movieName:movie
    }
    
    fetch('/addBookMark',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>{return res.json()})
    .then((data)=>{
        localStorage.setItem('bookMark',JSON.stringify(data));
    });
}

//REMOVE BOOKMARK FUNCTION
function removeBookMark(email,movie){
    let emailAndUniqueId=JSON.parse(email);
    let obj={
        email:emailAndUniqueId.email,
        uniqueId:emailAndUniqueId.uniqueId,
        movieName:movie
    }
    fetch('/removeBookMark',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>{return res.json()})
    .then((data)=>{
        localStorage.setItem('bookMark',JSON.stringify(data));
    })
}

//find Bookmark function
function bookMarked(){
 let data=JSON.parse(localStorage.getItem('bookMark'));
  let movieArr=[]
 for(let i of data){
    movieArr.push(i.movieName)
 }
 console.log(movieArr)
  //fillter bookmark and Unbookmark
  let trendingElementArr=document.querySelectorAll(".trending");
for(let i of trendingElementArr){
//get bookmarkicon
let imageicon=i.childNodes[1].childNodes[1].childNodes[1];

   let baby=i.children[0].childNodes[3].childNodes[3].innerText;
   if(movieArr.includes(baby)){
    imageicon.src='assets/icon-bookmark-full.svg';
}
 }
// find recommond Div bookmark 
let elementArray=document.querySelectorAll(".recommnd__Div");

for(let i of elementArray){
    let imageicon=i.childNodes[1].childNodes[1].childNodes[1];
   
    let baby=i.children[2].innerText;
    if(movieArr.includes(baby)){
        imageicon.src='assets/icon-bookmark-full.svg';
    }
 
}


}
//onloaded call function
bookMarked();

//filter bookmark function

function bookmarkFilter(){
    let count=0;
   let trendingEleArray=document.querySelectorAll(('.trending'));
   let trendingDisplay=document.querySelector('.trending__parent')
   //filter loop
   for(let i of trendingEleArray){
    i.style.display="block"
   }
   for(let i of trendingEleArray){
          let findBookmark=i.childNodes[1].childNodes[1].childNodes[1].src;
         if(findBookmark==="http://localhost:4000/assets/icon-bookmark-empty.svg"){
            i.style.display='none';
            count++;
         }
   }
   //no more not bookmark
 
   //reeecommd filter loop
   let recommndDivArray=document.querySelectorAll(('.recommnd__Div'));
   //filter loop
   for(let i of recommndDivArray){
    i.style.display="block"
   }
   for(let i of recommndDivArray){
          let findBookmark=i.childNodes[1].childNodes[1].childNodes[1].src;
          console.log(findBookmark)
          if(findBookmark==="http://localhost:4000/assets/icon-bookmark-empty.svg"){
            i.style.display='none'
         }
   }


}




//upload videoes

let videoArr=['beyondEart.mp4','car.mp4','undiscover.mp4','1998.mp4','darkmoon.mp4','greatland.mp4','direy.mp4','untouch.mp4','nobeyondEarth.mp4',
'Animal.mp4','AutoSport.mp4','sameAnswer.mp4','echo.mp4','rockies.mp4','rentlesss.mp4','community.mp4','vanlife.mp4','theheiress.mp4','truck.mp4',
'hills.mp4','112.mp4','loanheart.mp4','production.mp4','dog.mp4','asia.mp4','food.mp4','dark.mp4','unsolved.mp4','mission.mp4'];


//play video function
function playVideo(e){
   
    let parent=document.querySelector('.video__parent')
    parent.style.display='block';
    parent.style.display='flex'
    let child=parent.childNodes[3];
    child.src=`/assets/videos/${videoArr[e.value]}`;
    
}

function removevideo(){
    let parent=document.querySelector('.video__parent')
    let child=parent.childNodes[3];
    child.pause();
    parent.style.display='none';
}