import {ExcelComponent} from "@core/ExcelComponent";
import { $ } from "../../core/dom";
import { Emitter } from "../../core/Emitter";

export class Excel {
   constructor(selector, options) {
      this.$el = $(selector);
      this.components = options.components || [];
      this.emitter = new Emitter();
      this.store = options.store;
   }

   getRoot(){
      const $root = $.create('div', 'excel');
      const componentEmitter = {
         emitter: this.emitter,
         store: this.store
      };

      this.components = this.components.map( Component => {

         const $el = $.create('div', Component.className);         
         const component = new Component($el, componentEmitter);
         // debugger
         $el.html(component.toHTML());
         $root.append($el);
         return component;
      });      
      return $root;
   }


   render(){
      this.$el.append(this.getRoot());

      this.components.forEach(component => component.init());
      
   }
}