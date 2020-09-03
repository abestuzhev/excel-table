export class TableSelection {
   static className = 'selected';
   constructor() {
      this.group = [];
      this.current = null;
   }

   select($el){
      this.clear();
      this.group.push($el);
      $el.focus().addClass(TableSelection.className);
      this.current = $el;
   }

   clear(){
      this.group.forEach( $el => $el.removeClass(TableSelection.className));
      this.group = [];
   }

   selectGroup(){

   }
}