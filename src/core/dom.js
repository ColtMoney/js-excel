class Dom {
    constructor(element) {
        this.$el = typeof element === 'string'
        ? document.querySelector(element)
        : element
    }

    html(html) {
        if(typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        } else {
            return this.$el.outerHTML.trim()
        }
    }

    append(node) {
        if(node instanceof Dom) {
            node = node.$el
        }
        if(Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
    }

    on(event, eventMethod) {
        this.$el.addEventListener(event, eventMethod)
    }

    off(event, eventMethod) {
        this.$el.removeEventListener(event, eventMethod)
    }
}

export function $(element) {
    return new Dom(element)
}

$.create = (tagName, className = '') => {
    const el = document.createElement(tagName)
    if(className) {
        el.classList.add(className)
    }
    return $(el)
}
