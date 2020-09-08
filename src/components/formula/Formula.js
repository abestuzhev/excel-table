import {ExcelComponent} from "@core/ExcelComponent";


export class Formula extends ExcelComponent{
   static className = 'excel__formula';

   constructor($root, options){
      super($root, {
         name: "Formula",
         listeners: ["input", "keydown"],
         ...options
      });
   }

   init(){
      super.init();
      this.$subscribe('table:done', text => this.$root.find('.input').text(text));
      this.$subscribe('table:select', $cell => this.$root.find('.input').text($cell.data.value));
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
   }

   onKeydown(event){
      const keys = ['Enter', 'Tab'];
      if(keys.includes(event.key)){
         event.preventDefault();
         this.$emit("formula:done");
      }
   }
}