


//Modal 1 Stuff

let modal1 = document.getElementById("myModal1");
let content1 = document.getElementById("modal1");
content1.classList.add("modalFadeIn");

//let btn = document.getElementById("myBtn");
let span = document.getElementById("close")[0];


let okBtn = document.getElementById("sub");

let nameForm = document.getElementById("name");
let locationForm = document.getElementById("location");

/*btn.onclick = function(){
    modal.style.display = "block";
}
*/

okBtn.onclick = function(e){
    e.preventDefault();

    if((nameForm.value.localeCompare("") != 0) && (locationForm.value.localeCompare("") != 0)){
        assignUser(nameForm.value, locationForm.value);
        content1.classList.remove("modalFadeIn");
        content1.classList.add("modalFadeOut");

        modal1.style.display = "none";


        modal2.style.display = "block";
        content2.classList.add("modalFadeIn");


        document.getElementById("confirm").innerHTML = "Your name is " + user.getName() + "and your location is " + user.getLocation() + "?";
    }

}



document.getElementById("close").onclick = function(){
    modal1.style.display = "none";
}

function assignUser(name, location){
    user = new User(name, location);
}



//Modal 2 Stuff

let modal2 = document.getElementById("myModal2");
let content2 = document.getElementById("modal2");

let okBtn2 = document.getElementById("sub2");

okBtn2.onclick = function(e){
    e.preventDefault();

    content2.classList.remove("modalFadeIn");
    content2.classList.add("modalFadeOut");
    modal2.style.display = "none";

    introDone = true;
}



