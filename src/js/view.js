document.addEventListener("DOMContentLoaded", function(event) { 
    //do work
    //.style.height = window.innerHeight;
    //console.log("lol");

    resize_to_window("left_region");
    default_avatars_element = document.getElementsByClassName('avatars')[0];
});


function resize_to_window(class_name)
{
    console.log("window resized to: ", document.documentElement.clientHeight);

    
    var elements = document.getElementsByClassName(class_name)

    for(var i = 0, length = elements.length; i < length; i++) 
    {
        elements[i].style.height = document.documentElement.clientHeight+"px";
    }
}


