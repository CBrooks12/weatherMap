//adds new location button to sidebar
function setLoc(submittedLoc,placeID,temp) {
    if(submittedLoc === undefined){
        return;
    }
    var list =  document.getElementById("locList");
    var l2 = list.childNodes;
    for(var i = 2; i<l2.length;i++){
        try{
			//if button exists, ignore
            if(l2[i].childNodes[0].childNodes[0].innerHTML === submittedLoc){
                return;
            }
        }catch(err){}
    }
	
	//create element
	var entry = createElement(submittedLoc, temp, placeID);
	
	//add to list
    list.insertBefore(entry, list.childNodes[2]);
}

//set element as active and unactivate the others
function setActive(param) {
    setWindow(param.children[0].children[2].innerHTML);
    var x = document.getElementsByClassName("list-group-item active");
    x[0].className = "list-group-item";
    param.className = "list-group-item active";
    
}

//create new sidebar element
function createElement(submittedLoc, temp, placeID){
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
	return entry;
}