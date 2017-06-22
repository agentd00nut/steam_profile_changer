var SteamUser = require('steam-user'); // Replace this with `require('steam-user');` if used outside of the module directory
var os=require('os');
var fs=require('fs');
const username = require('username');



var loc = window.location.pathname;
//var local_dir = loc.substring(0, loc.lastIndexOf('/'));
var local_dir = loc.substring(0, loc.lastIndexOf('/')).substring( loc.lastIndexOf(":")+1 ) ;



var app = require('electron').remote; 
const nativeImage = require('electron').nativeImage
var dialog = app.dialog;


SteamUser.prototype.setAvatar = function(file_path){

    //let nativeImage.createFromPath(file_path);
    stats = fs.statSync(file_path);
    console.log(file_path, stats.size);
    
    if ( stats.size > 1000000 ){
        
        let image = nativeImage.createFromPath(file_path)
        image = image.resize({width:200,height:200});
        
        fs.writeFile(local_dir+"/../data/temp_imgs/tmp", image.toPNG(), (err) => {
            if(err) throw err;
        });

        
        console.log("Resized avatar!");
        file_path=local_dir+"/../data/temp_imgs/tmp";


    }

	var options = { method: 'POST',
	  url: 'http://steamcommunity.com/actions/FileUploader',
	  gzip: true,
	  headers: 
	   { 
	     cookie: web_cookies.join(';'), 
	     'accept-language': 'en-US,en;q=0.8',
	     'accept-encoding': 'gzip,deflate',
	     referer: 'http://steamcommunity.com/profiles/'+client.steamID.getSteamID64()+'/edit',
	     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	     'content-type': 'multipart/form-data',
	     'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML',
	     'upgrade-insecure-requests': '1',
	     origin: 'http://steamcommunity.com',
	     'cache-control': 'max-age=0',
	     connection: 'keep-alive',
	     host: 'steamcommunity.com'
	      },
	  formData: 
	   { type: 'player_avatar_image',
	     sId:  client.steamID.getSteamID64(),
	     sessionid: web_id,
	     doSub: '1',
	     json: '1',
	     avatar: 
	      { value: fs.createReadStream(file_path),
	        options: 
	         { filename: file_path,
	           contentType: "image/jpeg" } } } };

	
    request(options, function (error, response, body) {
	
    if (error) throw new Error(error);

		console.log("Avatar Set to: ", file_path);

	});
}


var client = new SteamUser();
var fs = require("fs");
var request = require("request");

var web_id;
var web_cookies;
var default_avatars_element;


client.apps_installed=[];



var profiles={};
read_array_from_file('profile_cache', (data)=>{ 
    if( data != "" ){
        profiles=data 
        console.log(profiles);
    }} );

if(  client.publicIP == undefined ){

    var creds = fs.readFileSync(local_dir+"/../data/credentials.txt","utf8").split(";");
    accountName=creds[0].trim();
    password=creds[1].trim();
    fs.unlinkSync(local_dir+"/../data/credentials.txt");

    client.logOn({
    	"accountName": accountName,
    	"password": password
    });

}

client.on('loggedOn', function(details) {
	console.log("Logged into Steam as " + client.steamID.getSteamID64());
	//client.setPersona( SteamUser.EPersonaState.Online );

});

client.on('error', function(e) {
	console.log(e);
});





client.on('webSession', function(sessionId, cookies) {
	
	web_id=sessionId;
	web_cookies=cookies;

	//client.setOption("enablePicsCache", true);

    populate_apps_list();   


});

function set_persona(app_id){
    console.log("Setting persona for ", app_id);
    if(profiles[app_id])
    {
        client.setPersona(1,  profiles[app_id][0][Math.floor(Math.random()*profiles[app_id][0].length)]  );
    }   
}

function set_avatar(app_id)
{
    console.log("Setting avatar for ", app_id);
    if(profiles[app_id])
    {
        client.setAvatar( profiles[app_id][1][Math.floor(Math.random()*profiles[app_id][1].length)] );
    }   
}

function set_profile(app_id){
    set_persona(app_id);
    set_avatar(app_id);
}

client.on('playingState', function(blocked,playingApp){
	console.log("We just started playing",playingApp);

	if( playingApp != 0 ){
		
		set_profile( playingApp );	

	}
	else
	{
		console.log("We stopped playing, going back to defaults...");

        set_profile( 0 );
		//client.setPersona(1, default_persona);
		//client.setAvatar(default_avatar);
	}

})

/*(client.on('licenses', function(licenses){

})


client.on('appOwnershipCached', function(){

	//var owned_apps =client.getOwnedApps();
	//http://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg

	//populate_owned_apps_list(owned_apps);
})*/


function populate_apps_list(force=false){

    console.log("populating app list.");

    fs.access(local_dir+'/../data/cached_installed_apps', fs.F_OK, (err) => {

        if(err || force == true){

            console.log("cached_installed_apps not found");
            find_installed_apps( function(apps_installed){

                get_product_info( apps_installed,  function( app_info ){


                    write_array_to_file(app_info, 'cached_installed_apps');
                    update_apps_list( app_info );

                })

            })


        }else
        {
            console.log("Using cached_installed_apps file.");
            read_array_from_file( 'cached_installed_apps',  update_apps_list )
        }
    });

}

function find_installed_apps(callback)
{


    if  ( os.platform() == "darwin" ){
        path="/Users/"+username.sync()+"/Library/Application Support/Steam/steamapps/"    
    }
    else if ( os.platform() == "win32"){
        path="C:/Program Files (x86)/Steam/steamapps/"
    }

    console.log("Finding owned apps, looking at "+path);

    fs.readdir(path, function(err, items) {
     
        for (var i=0; i<items.length; i++) 
        {
            
            if( items[i].indexOf("appmanifest") > -1 )
            {
        
                app_id=items[i].split(".")[0].split("_")[1]
                       
                client.apps_installed.push( parseInt(app_id, 10) );
            }
        }

        callback(client.apps_installed);

    });
}

function get_product_info(apps, callback)
{
    client.getProductInfo(apps, [], function(apps, packages, ua, up){
        callback( apps );
    })
}




function generate_app(app_id, app_data)
{

    //console.log(app_data);
    if(app_data.appinfo.common.icon == "default")
    {
        icon_url = "imgs/default-logo.png"
    }else{
        icon_url = icon_url_root+app_id+"/"+app_data.appinfo.common.icon+".jpg"
    }

    app_name = app_data.appinfo.common.name;

    var li_e = document.createElement('li');
    li_e.classList.add('app');
    li_e.dataset.appid = app_id;


    var li_p = document.createElement('p');
    li_p.classList.add('app_title');
    li_p.appendChild( document.createTextNode(app_name) );


    var li_img = document.createElement('img');
    li_img.classList.add('icon');
    li_img.src=icon_url;


    li_e.appendChild(li_img);
    li_e.appendChild(li_p);


    li_e.onclick = select_app;

    return li_e;
}

function update_apps_list(owned_apps){
    var installed_app_e = document.getElementsByClassName('installed_apps')[0]
    var i;

    clear_node_of_children(installed_app_e);
    console.log("Updating app list");

    icon_url_root="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/"

    installed_app_e.appendChild( generate_app(0,{appinfo:{common:{name:"default",icon:"default"}}}) );

    //for (i = 0; i < owned_apps.length; i++) {
    Object.keys(owned_apps).forEach(function(key){ 

        app_id=key;
        app_data=owned_apps[app_id];

        var li_e = generate_app(app_id, app_data);

        installed_app_e.appendChild(li_e);

    });



        /*
         <li class="app" data-appid="252950">
            <img class="icon" src="">
            <p class="app_title">Rocket League</p>
          </li>
          */
 
}



var selected_app=-1;
function select_app(){

    if( selected_app != this.dataset.appid )
    {
        deselect_app(selected_app);

        this.classList.add("selected");
        selected_app=this.dataset.appid;

        show_profile_for_app();
    }

}

function deselect_app(app_id){
    
    last_selected=document.querySelector('[data-appid="'+app_id+'"]')
    
    if( last_selected != undefined ){
        last_selected.classList.remove('selected');
    }
}


/*<div class="avatar_container">
    <img class="avatar" src="personal_things/pictures/test1.png">
</div>*/






function show_profile_for_app(){
    var selection = document.getElementsByClassName('selected')[0];
    var avatars = document.getElementsByClassName('avatars')[0];
    var personas = document.getElementsByClassName('personas')[0];

    clear_node_of_children(avatars);
    clear_node_of_children(personas);

    var add = generate_avatar( 'imgs/add.svg' );
    add.onclick = add_avatar;
    avatars.appendChild( add );



    persona_add = document.createElement('div');
    persona_add.onclick=add_persona;

    var p_text = document.createElement('b');
    p_text.appendChild( document.createTextNode('Click this text to add a new persona.') );

    persona_add.appendChild(p_text);
    personas.appendChild(persona_add);

    if( profiles[selection.dataset.appid] ){

        for(var i=0; i < profiles[selection.dataset.appid][1].length; i++)
        {
            avatars.appendChild( generate_avatar( profiles[selection.dataset.appid][1][i] ));
        }

        for(var i=0; i < profiles[selection.dataset.appid][0].length; i++)
        {
            personas.appendChild( generate_persona(  profiles[selection.dataset.appid][0][i] ))
        }
    }

}


function generate_avatar(file_path)
{
    var avatar = document.createElement('div');
    avatar.classList.add('avatar_container');
    
    var avatar_img = document.createElement('img');
    avatar_img.classList.add('avatar');
    avatar_img.src = file_path;

    avatar.appendChild( avatar_img );
    avatar.onclick = remove_avatar;

    return avatar;

}

function add_avatar(){
    
    console.log("Attempting to add an avatar...");
    
    get_file_path(function(file_paths){

        for(var i=0; i < file_paths.length; i++){
            file_path=file_paths[i];
            console.log("User picked: ", file_path);

            var avatars = document.getElementsByClassName('avatars')[0];
            var selection = document.getElementsByClassName('selected')[0];

            if( ! profiles[ selection.dataset.appid ] ){
                profiles[ selection.dataset.appid ]=[[],[]];
            }
            
            profiles[ selection.dataset.appid ][1].push(file_path);

            avatars.appendChild( generate_avatar( file_path ));
        }

        write_array_to_file(profiles, "profile_cache");
    });
  
}

function remove_avatar(){
    var avatars = document.getElementsByClassName('avatars')[0];
    var selection = document.getElementsByClassName('selected')[0];
    var img = this.querySelector('img');
    var src = img.src.slice( 7 );

    console.log("Trying to remove "+src+" For "+selection.dataset.appid);

    if( profiles[selection.dataset.appid] ){
        var index = profiles[selection.dataset.appid][1].indexOf( src );
        profiles[selection.dataset.appid][1].splice(index,1);

    }

    avatars.removeChild(this);

    write_array_to_file(profiles, "profile_cache");
}


/*
<div class="persona">
    <input type="text" name="persona">
</div>
*/
function generate_persona(text){
    var persona = document.createElement('div');
    persona.classList.add('persona');

    var input = document.createElement('input');
    input.type = "text";
    input.defaultValue = text;

    persona.appendChild( input );

    var remove = document.createElement('img');
    remove.classList.add('persona_removal')
    remove.src='imgs/del.png'
    remove.onclick=remove_persona;

    input.onblur=save_persona

    persona.appendChild(remove);

    return persona

}

function add_persona(){
    var personas = document.getElementsByClassName('personas')[0];
    var selection = document.getElementsByClassName('selected')[0];
    app_id=selection.dataset.appid;


    console.log("Attempting to add a persona");
    personas.appendChild( generate_persona("") );

    //if( profiles[app_id][0].indexOf( "" ) === -1  ){
    //    profiles[app_id][0].push("");
    //    write_array_to_file(profiles, "profile_cache");
    //}

}

function save_persona(){
    var selection = document.getElementsByClassName('selected')[0];
    app_id=selection.dataset.appid;


    if( this.value == "" ){
        return;
    }

    console.log("Trying to save", this.value, this.value.length);

    if( profiles[app_id] == null)
    {
        profiles[app_id] = [[],[]]
    }

    if( profiles[app_id][0].indexOf( this.value ) === -1  ){
        profiles[app_id][0].push(this.value);
        write_array_to_file(profiles, "profile_cache");
    }

}


function remove_persona(){
    var personas = document.getElementsByClassName('personas')[0];
    persona=this.previousSibling.value;

    var selection = document.getElementsByClassName('selected')[0];
    app_id=selection.dataset.appid;


    console.log("Trying to remove "+persona+" For "+app_id);

    if( profiles[app_id] ){
        var index = profiles[app_id][0].indexOf( persona );
        profiles[app_id][0].splice(index,1);

    }

    personas.removeChild(this.parentElement);

    write_array_to_file(profiles, "profile_cache");
}






function clear_node_of_children(node)
{
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}


function get_file_path(cb){

    dialog.showOpenDialog( {properties: ["openFile","multiSelections"]}, (fileNames) => {
        // fileNames is an array that contains all the selected
        if(fileNames === undefined){
            console.log("No file selected");
            return;
        }


        cb( fileNames );
    });

} 


function write_array_to_file(array, file, cb){

    fs.writeFile(local_dir+"/../data/"+file, JSON.stringify(array), (err) => {
        if(err){ console.log(err); }
        else{ 
            console.log(" Saved to "+file);

            if(cb){
                cb(array);
            }
        }
    })
}

function read_array_from_file(file,  cb){

    var container = {};
    fs.readFile(local_dir+"/../data/"+file, (err, data) => {
        if(err) throw err;

        if( data != "" ){
            container=JSON.parse(data);
        }

        if(cb){
            cb(container);
        }

    })
}



