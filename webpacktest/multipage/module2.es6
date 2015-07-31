export class Hello{
    constructor(name="mike"){
        this.name=name
    }
    say(){
        var name=this.name;
        console.log(`hello im ${name}`)
    }
}
