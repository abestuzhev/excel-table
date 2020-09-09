import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener{

   constructor($root, options = {}){
      super($root, options.listeners);
      this.name = options.name || '';
      this.emitter = options.emitter;
      this.store = options.store;
      this.stateSub = null;

      this.prepare();
   }

   prepare(){

   }

   $dispatch(action){
      this.store.dispatch(action)
   }

   $subscribe(fn){
      this.stateSub = this.store.subscribe(fn)
   }

   $emit(event, args){
      this.emitter.emit(event, args);
   }

   $on(event, fn){
      this.emitter.subscribe(event, fn);
   }

   toHTML(){
      return `<h1>Excel Component</h1>`
   }

   init() {
      this.initDOMListener();
   }

   destroy(){
      this.removeDomListener();
      this.stateSub.unsubscribe();
   }
}