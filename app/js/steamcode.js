var fs=require('fs');
var loc = window.location.pathname;
//var local_dir = loc.substring(0, loc.lastIndexOf('/'));
var local_dir = loc.substring(0, loc.lastIndexOf('/')).substring( loc.lastIndexOf(":")+1 ) ;



function submit_steamguard_code()
{
    code=document.querySelector('[id="code"]').value;

    console.log("submitting ", code);
    //steamguard_callback(code);
    fs.writeFile(local_dir+"/../data/steamcode.txt", code,(err)=>{
        if(err)throw err;     
        window.location="index.html"
    });

}