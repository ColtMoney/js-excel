
export class TableSelection {

   static className = 'selected'

   constructor() {
      this.group = []
      this.selected = null
   }

   select($el) {
      this.clear()
      this.group = []
      this.group.push($el)
      this.selected = $el
      $el.addClass(TableSelection.className).focus()
   }

   clear() {
      this.group.forEach((el) => {
         el.removeClass(TableSelection.className)
      })
   }

   selectGroup($group = []) {
      this.clear()
      this.group = $group
      this.group.forEach($el => $el.addClass(TableSelection.className))
   }

}