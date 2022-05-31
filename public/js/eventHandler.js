document.addEventListener("click", clickTrigger  );


//canvas.onmousemove = hover(e);

function clickTrigger(e){
    let x = Math.floor(e.clientX/s);
    let y = Math.floor(e.clientY/s);

    let percentX = percentage(x, true);
    let percentY = percentage(y, false);

    let colorChosen = randomColor();
    sendRipple(percentX, percentY, colorChosen, false);

    ripple(x, y, colorChosen);
}

function percentage(valIn, width){
    if(width) {

        return 100 / (canvas.width / valIn);
    }
    else{
        return 100/ (canvas.height / valIn);
    }
}


window.addEventListener("resize",function(){
    location.reload();
});