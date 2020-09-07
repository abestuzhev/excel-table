import {ExcelComponent} from "@core/ExcelComponent";

export class Formula extends ExcelComponent{
   static className = 'excel__formula';

   constructor($root, options){
      super($root, {
         name: "Formula",
         listeners: ["input"],
         ...options
      });
   }

   init(){
      super.init();
      this.$subscribe('table:done', text => this.$root.find('.input').text(text));
   }

   toHTML() {
      return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
      `
   }

   onInput(event){
      const text = event.target.textContent.trim();
      this.$emit('formula:input', text);
      console.log('formula:input');
   }

   onKeydown(event){

   }
}