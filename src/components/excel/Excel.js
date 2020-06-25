import {ExcelComponent} from "@core/ExcelComponent";
import { $ } from "../../core/dom";

export class Excel {
   constructor(selector, options) {
      this.$el = $(selector);
      this.components = options.components || [];
   }

   getRoot(){
      const $root = $.create('div', 'excel');

      this.components = this.components.map( Component => {

         const $el = $.create('div', Component.className);         
         const component = new Component($el);
         // console.log($el.$el);
         // debugger
         $el.html(component.toHTML());
         $root.append($el);

         return component;
      });
      
      console.log($root);
      
      return $root;
   }


   render(){
      this.$el.append(this.getRoot());

      this.components.forEach(component => component.init());
      
   }
}