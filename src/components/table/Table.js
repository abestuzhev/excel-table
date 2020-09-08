import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {isCell, shouldResize} from "@/components/table/table.function";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@core/dom";

export class Table extends ExcelComponent {
   static className = 'excel__table';

   constructor($root, options) {
      super($root, {
         name: "Table",
         listeners: ['mousedown', 'keydown'],
         ...options
      }
      );
   }

   toHTML() {
      return createTable();
   }

   prepare() {
      this.selection = new TableSelection();
   }

   init() {
      super.init();
      const $cell = this.$root.find('[data-id="0:0"]');

      this.selectCell($cell);

      this.$subscribe('formula:input', text => this.selection.current.text(text));
      this.$subscribe('formula:done', () => this.selection.current.focus());
   }

   selectCell($cell){
      this.$emit('table:select', $cell);
      this.selection.select($cell);      
   }

   onMousedown(event) {
      if (shouldResize(event)) {
         resizeHandler(this.$root, event);
      }else if(isCell(event)){
         const $target = $(event.target);
         this.selection.select($target)
      }
   }
   onKeydown(event){
      const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'];
      if(keys.includes(event.key) && !event.shiftKey){
         event.preventDefault();
         const id = this.selection.current.id(true);
         const $next = this.$root.find(nextSelector(event.key, id));
         
         this.selectCell($next);
      }     
      
      this.$emit('table:done', this.selection.current.text());
   }
}

function nextSelector(key, {row, col}) {
   const MIN_VALUE = 0;
   switch(key){
      case 'Enter':
      case 'ArrowDown':
         row++;
         break;
      case 'Tab':
      case 'ArrowRight':
         col++;
         break;
      case 'ArrowLeft':
         col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
         break;
      case 'ArrowUp':
         row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
         break;
   }
   return `[data-id="${row}:${col}"]`
}