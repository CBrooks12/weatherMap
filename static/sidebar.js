function setLoc(submittedLoc,placeID,temp) {
    if(submittedLoc === undefined){
        return;
    }
    var list =  document.getElementById("locList");
    var l2 = list.childNodes;
    for(var i = 2; i<l2.length;i++){
        try{
            if(l2[i].childNodes[0].childNodes[0].innerHTML === submittedLoc){
                return;
            }
        }catch(err){}
    }
    var entry = document.createElement("li");
    entry.onclick = function(){setActive(this)};
    var entryItem = document.createElement("a");
    entryItem.className = "list-group-item";
    entryItem.href = "#";
    entryItem.innerHTML = 
                  "<h4 class=\"list-group-item-heading\">"+ submittedLoc + "</h4> \n <p class=\"list-group-item-text\">"+temp+" F</p> \n <p hidden>" + placeID + "</p>";
    entry.appendChild(entryItem);
    try{
        var x = document.getElementsByClassName("list-group-item active");
        x[0].className = "list-group-item";
    }catch(err){
    }
    entry.className = "list-group-item active";
    list.insertBefore(entry, list.childNodes[2]);
}

function setActive(param) {
    setWindow(param.children[0].children[2].innerHTML);
    var x = document.getElementsByClassName("list-group-item active");
    x[0].className = "list-group-item";
    param.className = "list-group-item active";
    
}
