import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener{

   constructor($root, options = {}){
      super($root, options.listeners);
      this.name = options.name || '';
      this.emitter = options.emitter;

      this.prepare();
   }

   prepare(){

   }

   $emit(event, fn){
      this.emitter.emit(event, fn);
   }

   toHTML(){
      return `<h1>Excel Component</h1>`
   }

   init() {
      this.initDOMListener();
   }

   destroy(){
      this.removeDomListener();
   }
}