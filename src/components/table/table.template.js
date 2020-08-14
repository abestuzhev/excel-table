const CODES = {
   A: 65,
   Z: 90
};

function toCell(){
   return `
    <div class="cell" contenteditable="">B2</div>
   `
}

function createCol(col){
   return `
    <div class="column">${col}</div>
   `
}

function createRow(content) {
   return `
   <div class="row">
      <div class="row-info"></div>      
      <div class="row-data">${content}</div>
   </div>
   `
}

function toChar(_, index){
   return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
   const colsCount = CODES.Z - CODES.A + 1;
   const rows = [];

   const cols = new Array(colsCount)
      .fill('')
      .map( (el, index) => toChar(el, index) )
      .map( el => createCol(el) )
      .join("");

   rows.push(createRow(cols));

   for (let i = 0; i < rowsCount;i++) {
      const cells = new Array(colsCount)
         .fill('')
         .map( () => toCell() )
         .join('');
      rows.push( createRow(cells) );
   }

   return rows.join("");
}