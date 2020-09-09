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
      this.$formula = this.$root.find('.input');
      this.$on('table:done', text => this.$formula.text(text));
      this.$on('table:select', $cell => this.$formula.text($cell.text()));
      this.$on('table:input', $cell => this.$formula.text($cell.text()))

      this.$subscribe( state => {
         console.log("FormulaState", state)
      })
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