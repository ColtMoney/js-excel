import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.tamplate';
import { resizeHundler } from './table.resize';
import { ROWS_COUNT } from './table.config';
import { shouldResize, isCell, matrix, nextSelector } from './table.functions';
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
        const keys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter']
        if (keys.includes(keyCode)) {
            event.preventDefault()
            const id = this.selection.selected.parseId()
            this.selection.select(this.$root.find(nextSelector(keyCode, id)))
        }  
    }

    toHTML() {
        return createTable(ROWS_COUNT)
    }
}
