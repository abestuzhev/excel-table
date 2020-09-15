import {$} from "@core/dom";

export function resizeHandler($root, event) {

   return new Promise( resolve => {

      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
   
      const type = $resizer.data.resize;
      let value;
   
   
      document.onmousemove = e => {
         if (type === 'col') {
            const delta = e.pageX - coords.right;
            value = coords.width + delta;
   
            $resizer.css({
               right: -delta + 'px',
               height: 5000 + 'px'
            })
         } else {
            const delta = e.pageY - coords.bottom;
            value = coords.height + delta;
            $resizer.css({
               bottom: -delta + 'px',
               width: 5000 + 'px'
            })
         }
      };
   
      document.onmouseup = () => {
         document.onmousemove = null;
         document.onmouseup = null;
   
         if (type === 'col') {
   
            $parent.css({width: value + 'px'})
            cells.forEach(el => el.style.width = value + 'px');
            $resizer.css({right: 0, height: 'auto'});
   
         } else {
   
            $parent.css({height: value + 'px'})
            cells.forEach(el => el.style.height = value + 'px');
            $resizer.css({bottom: 0, width: 'auto'})
   
         }

         resolve({
            value: value || null,
            id:  type === 'col' ? $parent.data.col : $parent.data.row,
            type: type
         });
      }

   });
   
}