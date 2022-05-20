document.addEventListener("click", clickTrigger  );

function clickTrigger(e){
    let x = Math.floor(e.clientX/s);
    let y = Math.floor(e.clientY/s);

    let colorChosen = randomColor();
    sendRipple(x, y, colorChosen, false);

    ripple(x, y, colorChosen);
}


window.addEventListener("resize",function(){
    location.reload();
});