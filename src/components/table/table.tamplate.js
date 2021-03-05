const CODES = {
    A: 65,
    Z: 90
}

function createRow(content, index = '') {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div div class="row" >
            <div class="row-info" data-type="resizable" data-row="${index-1}">
                ${index}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
} 

function createCell(colIndex, rowIndex) {
    return `
        <div class="cell" data-id="${rowIndex}:${colIndex}" data-col="${colIndex}" data-row="${rowIndex}" contenteditable=""></div>
    `
}

function createColumn(content, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
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
        .map((content, index) => {
            return createColumn(content, index)
        })
        .join('')
    
    rows.push(createRow(cols))

    for (let i = 0; i < rowsCount; i++) {
        const cell = []
        for (let j = 0; j < colsCount; j++) {
            cell.push(createCell(j, i))
        }
        rows.push(createRow(cell.join(''), i + 1))
    }

    return rows.join('')
}