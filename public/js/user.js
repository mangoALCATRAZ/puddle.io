class User{
    constructor(name, location){
        this.name = name;
        this.location = location;
    }

    getName = function(){
        return this.name;
    }

    getLocation = function(){
        return this.location;
    }
}