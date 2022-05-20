
function sendRipple(x, y, color, big){
    //let sendData = new DataObject(x, y, color, big);

    let red = color.getRed();
    let green = color.getGreen();
    let blue = color.getBlue();

    socket.emit('ripple data', {x: x, y: y, red: red, green: green, blue: blue, big: big});

}









