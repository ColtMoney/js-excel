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


    closest(selector) {
        return $(this.$el.closest(selector))
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this.$el
    }

    data(dataAtribute) {
        return this.$el.dataset[dataAtribute]
    }

    removeClass(className) {
        return this.$el.classList.remove(className)
    }

    getCoodrs() {
        return this.$el.getBoundingClientRect()
    }

    css(styles = {}) {
        Object.keys(styles).forEach((key) => {
            return this.$el.style[key] = styles[key]
        })
    }

    getAllElements(selector) {
        return this.$el.querySelectorAll(selector)
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    removeAttr(attributeName) {
        return this.$el.removeAttribute(attributeName)
    }

    parseId() {
        const id = $(this.$el).data('id').split(':')
        return {
            row: +id[0],
            col: +id[1]
        }
    }

    focus() {
        this.$el.focus()
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
