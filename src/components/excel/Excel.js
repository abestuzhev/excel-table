import {ExcelComponent} from "@core/ExcelComponent";

export class Excel {
   constructor(selector, components) {
      this.$el = document.querySelector(selector);
      this.components = components || [];
   }

   render(){

      const node = `<h1>test</h1>`;
      this.$el.insertAdjacentHTML('afterbegin', node);
   }
}