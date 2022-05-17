class ColorValue{
    constructor(red, green, blue){
        this.red = red;
        this.green = green;
        this.blue = blue;

    }
    getRed = function(){
        return this.red;
    }
    getRedDouble = function(){
        return this.red * 2;
    }

    getGreen = function(){
        return this.green;
    }
    getGreenDouble = function(){
        return this.green * 2;
    }

    getBlue = function(){
        return this.blue;
    }
    getBlueDouble = function(){
        return this.blue * 2;
    }



}

let randomProperty = function(obj){
    let keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}

let colorList = {red: new ColorValue(255, 0, 0),
                 light_blue: new ColorValue(0, 142, 247),
                 cyan: new ColorValue(77, 242, 247),
                 green: new ColorValue(0, 255, 13),
                 //yellow: new ColorValue(255, 255, 0),
                 orange: new ColorValue(255, 157, 0),
                 hot_pink: new ColorValue(255, 0, 255)};

function randomColor(){
    return randomProperty(colorList);
}

