var fs=require('fs');
var loc = window.location.pathname;
//var local_dir = loc.substring(0, loc.lastIndexOf('/'));
var local_dir = loc.substring(0, loc.lastIndexOf('/')).substring( loc.lastIndexOf(":")+1 ) ;


function set_cookie(){

    username=document.querySelector('[id="username"]');
    password=document.querySelector('[id="password"]');

    console.log("trying to set coooookie");

    fs.writeFile(local_dir+"/../data/credentials.txt", username.value+";"+password.value,(err)=>{
        if(err)throw err;     
        window.location="index.html"
    });


}