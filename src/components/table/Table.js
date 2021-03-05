import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.tamplate';

export class Table extends ExcelComponent {
    static className = 'excel__table'
    static isMouseDown = false
    static resizeEl = ''

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'mousemove', 'mouseup']
        })
    }

    onMousedown(event) {
        Table.isMouseDown = true
        resizeStart(event)
    }

    onMousemove(event) {
        if (Table.resizeEl) {
            const positionY = Table.resizeEl.getBoundingClientRect().top
            resizeMove(event, positionY)
        }
    }

    onMouseup(event) {
        Table.isMouseDown = false
        if (Table.resizeEl) {
            const cellWidth = calcCellWidth(Table.resizeEl, event.pageX)
            console.log(cellWidth)
            const nodes = Array.prototype.slice.call(Table.resizeEl.closest('.row-data').children)
            const cellIndex = nodes.indexOf(Table.resizeEl.parentElement)

            changeCellSize(cellWidth, cellIndex)
            resizeEnd()
        }
    }

    toHTML() {
        return createTable(20)
    }
}

function resizeStart(event) {
    const element = event.target
    if (event.target.dataset.resize) {
        const resize = element.dataset.resize
        if (resize === 'col') {
            element.classList.add('resize-vertical')
            Table.resizeEl = element
        } else if (resize === 'row') {
            element.classList.add('resize-horizontal')
        }
    }
}

function resizeEnd() {
    const resize = document.querySelector('.resize-vertical')
    resize.classList.remove('resize-vertical')
    Table.resizeEl = ''
}

function resizeMove(event, positionEl) {
    event.preventDefault();
    if (Table.isMouseDown && Table.resizeEl) {
        const resizeEl = Table.resizeEl
        if (calcCellWidth(resizeEl, event.pageX) > 10) {
            resizeEl.style.position = 'fixed'
            resizeEl.style.top = positionEl + 'px'
            resizeEl.style.left = event.pageX + 'px'
        }
    }
}

function calcCellWidth(resizeEl, resizeElPosition) {
    const cell = resizeEl.parentElement
    const cellOffsetLeft = cell.getBoundingClientRect().left
    return resizeElPosition - cellOffsetLeft
}

function changeCellSize(cellSize, cellIndex) {
    const rowsData = document.querySelectorAll('.row-data')
    rowsData.forEach((rowData) => {
        const rowItems = rowData.children
        for (let i = 0; i < rowItems.length; i++) {
            const rowItemIdx = Array.prototype.slice.call(rowItems)
            if (rowItemIdx.indexOf(rowItems[i]) === cellIndex) {
                rowItems[i].style.width = cellSize + 'px'
            }
        }
    })
}

// function getCoords(element) {
//     const box = element.getBoundingClientRect();

//     return {
//         top: box.top + pageYOffset,
//         left: box.left + pageXOffset
//     };

// }