import {range} from '@core/utils'

export function shouldResize(event) {
   return event.target.dataset.resize
}

export function isCell(event) {
   return event.target.dataset.id
}

export function matrix($target, $current) {
   const target = $target.parseId()
   const current = $current.parseId()
   const cols = range(current.col, target.col)
   const rows = range(current.row, target.row)
   
   return rows.reduce((acc, row) => {
      cols.forEach(col => acc.push(`${row}:${col}`))
      return acc
   }, [])
   
}