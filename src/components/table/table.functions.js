import {range} from '@core/utils'
import { COLS_COUNT, ROWS_COUNT } from './table.config';

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

export function nextSelector(key, {row, col}) {
    if (key === 'ArrowDown' || key === 'Enter') {
        ROWS_COUNT > row + 1 ? row++ : row
    } else if (key === 'ArrowUp') {
        row - 1 >= 0 ? row-- : row
    } else if (key === 'ArrowLeft') {
        col - 1 >= 0 ? col-- : col
    } else if (key === 'ArrowRight' || key === 'Tab') {
        COLS_COUNT > col + 1 ? col++ : col
    }
    return `[data-id="${row}:${col}"]`
}