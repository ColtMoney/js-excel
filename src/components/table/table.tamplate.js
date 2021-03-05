const CODES = {
    A: 65,
    Z: 90
}

function createRow(content, index = '') {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div div class="row" >
            <div class="row-info">
                ${index}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function createCell() {
    return `
        <div class="cell" contenteditable=""></div>
    `
}

function createColumn(content) {
    return `
        <div class="column">
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createColumn)
        .join('')

    rows.push(createRow(cols))

    for (let i = 0; i < rowsCount; i++) {
        const cell = []
        for (let j = 0; j < colsCount; j++) {
            cell.push(createCell())
        }
        rows.push(createRow(cell.join(''), i + 1))
    }

    return rows.join('')
}