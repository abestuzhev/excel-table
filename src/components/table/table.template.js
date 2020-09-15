const CODES = {
   A: 65,
   Z: 90
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

// function toCell(row, col) {
//    return `
//     <div
//        class="cell"
//        contenteditable=""
//        data-col="${col}"
//        data-row="${row}"
//     ></div>
//    `
// }

function toCell(row, state) {
   return function(_, col){
      return `
    <div 
       class="cell" 
       contenteditable=""
       data-col="${col}" 
       data-row="${row}" 
       data-type="cell"
       data-id="${row}:${col}"
       style="width: ${getWidth(state.colState, col)}"
    >    
</div>
   `
   }
}

function createCol({col, index, width}) {
   return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
   `
}

function createRow(index, content, state) {
   const height = getHeight(state, index);
   return `
   <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
      <div class="row-info">
         ${index ? index : ''}
         ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}         
      </div>      
      <div class="row-data">${content}</div>
   </div>
   `
}

function toChar(_, index) {
   return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index){
   return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index){
   return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function withWidthFrom(state) {
   return function (col, index) {
      return {
         col, index, width: getWidth(state.colState, index)
      }
   }
}

export function createTable(rowsCount = 40, state) {
   console.log('state', state);
   const colsCount = CODES.Z - CODES.A + 1;
   const rows = [];

   const cols = new Array(colsCount)
      .fill('')
      .map((el, index) => toChar(el, index))
      .map(withWidthFrom(state))
      .map(createCol)
      .join("");

   rows.push(createRow(null, cols, {}));

   for (let row = 0; row < rowsCount; row++) {
      const cells = new Array(colsCount)
         .fill('')
         .map((row, col) => toCell(row, col))
         .map(toCell(row, state))
         .join('');
      rows.push(createRow(row + 1, cells, state.rowState));
   }

   return rows.join("");
}