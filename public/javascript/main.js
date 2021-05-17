const socket = io();

socket.on('message', message =>{
    console.warn(message);
    AppendEvent(message);
});

socket.on('user-count', data =>{
    console.warn(data.data);
    UpdateUserCount(data.data);
});

socket.on('receiveMessage', message =>{
    console.warn("Vastaanotit viestin: "+message);
    AppendMessage(message);
});

var GlobalCurrentName = "   ";

function testMessage(){
    var msg = document.forms["viestikenttä"]["viesti"].value;

    if(msg != null && msg != ""){
        console.log("lähetit viestin!");
        socket.emit('message', "["+GlobalCurrentName+"]:"+msg);

        document.forms["viestikenttä"]["viesti"].value = "";
        return false;
    }
    else{
        document.forms["viestikenttä"]["viesti"].value = "";
        
        return false;
    }
}

function AppendMessage(content){
    //array split
    var contentarray = content.split(':');
    var username = contentarray[0];
    var contentData = contentarray[1]
    //creation
    let kenttä = document.getElementById("viestikenttä");

    let name = document.createElement("h4");
    name.textContent = username+" : ";
    name.id = "username";
    
    let h1 = document.createTextNode(contentData);

    let div = document.createElement("div");
    div.id = "viesti";
    div.appendChild(name);
    div.appendChild(h1);
    
    kenttä.appendChild(div);
}

function AppendEvent(content){
    //array split
    //creation
    let kenttä = document.getElementById("viestikenttä");
    
    let h1 = document.createTextNode(content);

    let div = document.createElement("div");
    div.id = "event";
    div.appendChild(h1);
    
    kenttä.appendChild(div);
}

function SwitchName(){
    var name = document.forms["nimikenttä"]["nimi"].value;
    if(name != null && name != ""){
        var NewName = "Nykyinen nimimerkkisi on: "+name;
        console.log(name);
        GlobalCurrentName = name;
        document.getElementById("nimimerkki").textContent = NewName;
    }
    return false;
}

function UpdateUserCount(count){
    document.getElementById("count-field").textContent = "Käyttäjiä paikalla: "+count;
}
