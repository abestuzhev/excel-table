const CODES = {
   A: 65,
   Z: 90
};

function toCell(_, col){
   return `
    <div class="cell" contenteditable="" data-col="${col}"></div>
   `
}

function createCol(col, index){
   return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
   `
}

function createRow(index, content) {
   return `
   <div class="row" data-type="resizable">
      <div class="row-info">
         ${index ? index : ''}
         ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}         
      </div>      
      <div class="row-data">${content}</div>
   </div>
   `
}

function toChar(_, index){
   return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 20) {
   const colsCount = CODES.Z - CODES.A + 1;
   const rows = [];

   const cols = new Array(colsCount)
      .fill('')
      .map( (el, index) => toChar(el, index) )
      .map( (el, index) => createCol(el, index) )
      .join("");

   rows.push(createRow(null, cols));

   for (let i = 0; i < rowsCount;i++) {
      const cells = new Array(colsCount)
         .fill('')
         .map( (_, index) => toCell(_, index) )
         .join('');
      rows.push( createRow(i + 1, cells) );
   }

   return rows.join("");
}