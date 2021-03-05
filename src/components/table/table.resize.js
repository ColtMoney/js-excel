import { $ } from '@core/dom';

export function resizeHundler(event, $root) {
   const $resizer = $(event.target)
   const resizeType = $resizer.data('resize')
   const $parent = $resizer.closest('[data-type="resizable"]')
   const coords = $parent.getCoodrs()
   let value
   let cell

   if(resizeType === 'col') {
      cell = $root.getAllElements('[data-col="'+ $parent.data('col') +'"]')
      $resizer.addClass('resize-vertical')
   } else {
      cell = $root.getAllElements('[data-row="'+ $parent.data('row') +'"]')
      $resizer.addClass('resize-horizontal')
   }

   document.onmousemove = e => {
      e.preventDefault()
      
      if(resizeType === 'col') {
         const delta = e.pageX - coords.right
         value = coords.width + delta
         if(value >= 40) {
            $resizer.css({
               right: -delta-4 + 'px'
            })
         }
      } else {
         const delta = e.pageY - coords.bottom
         value = coords.height + delta
         if(value >= 20) {
            $resizer.css({
               bottom: -delta-4 + 'px'
            })
         }
      }
   }
   document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      resizeType === 'col' ? $resizer.removeClass('resize-vertical') : $resizer.removeClass('resize-horizontal')
      $resizer.removeAttr('style')
      if(resizeType === 'col' && value > 40 || resizeType === 'row' && value > 20) {
         cell.forEach((item) => {
            resizeType === 'col' ? $(item).css({width: value + 'px'}) : $(item).css({height: value + 'px'})
         })
      }
   }
}