// import {Shape} from "./classes0";
//import and export is not ok both in traceur and babel
var Shape=require("./classes0");
class Retangle extends Shape {
  constructor(w, h, color) {
    super(color);
    this.w = w;
    this.h = h;
    this.size = Retangle.getSize(this.w,this.h);
  }
  showSize() {
    return this.size
  }

  static getSize(w, h) {
    return w * h;
  }
}
// export default Retangle;
module.exports=Retangle;
