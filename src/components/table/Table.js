import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.tamplate';
import { resizeHundler } from './table.resize';
import { shouldResize, isCell, matrix } from './table.functions';
import { TableSelection } from './TableSelection';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table' 

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown']
        })
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $root = this.$root.find('[data-id="0:0"]')
        this.selection.select($root)
    }

    onMousedown(event) {
        if(shouldResize(event)) {
            resizeHundler(event, this.$root)
        }
        if(isCell(event)) {
            const $el = $(event.target)
            if(event.shiftKey) {               
                const $cells = matrix($el, this.selection.selected).map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)

            } else {
                this.selection.select($el)
            }
        }
    }

    onKeydown(event) {
        const keyCode = event.code
        if(keyCode === 'ArrowDown' || keyCode === 'ArrowUp' || keyCode === 'ArrowLeft' || keyCode === 'ArrowRight' || keyCode === 'Tab' || keyCode === 'Enter') {
            const row = this.selection.selected.parseId().row
            const col = this.selection.selected.parseId().col
            if(keyCode === 'ArrowDown' && row+1 < 20) {  
                const $el = this.$root.find(`[data-id="${row+1}:${col}"]`)
                this.selection.select($el)
            } else if(keyCode === 'ArrowUp' && row-1 >= 0) {  
                const $el = this.$root.find(`[data-id="${row-1}:${col}"]`)
                this.selection.select($el)
            } else if(keyCode === 'ArrowLeft' && col-1 >= 0) {
                const $el = this.$root.find(`[data-id="${row}:${col-1}"]`)
                this.selection.select($el)
            } else if(keyCode === 'ArrowRight' && col+1 < 20) {
                const $el = this.$root.find(`[data-id="${row}:${col+1}"]`)
                this.selection.select($el)
            } else if(keyCode === 'Tab') {
                event.preventDefault()
                let id = `${row}:${col+1}`
                console.log(id)
                if(col === 25) {
                    id = `${row+1}:${0}`
                }
                const $el = this.$root.find(`[data-id="${id}"]`)
                this.selection.select($el)
            } else if(keyCode === 'Enter' && row+1 < 20) {
                event.preventDefault()
                const $el = this.$root.find(`[data-id="${row+1}:${col}"]`)
                this.selection.select($el)
            }
             
        }  
    }

    toHTML() {
        return createTable(20)
    }
}
