class Dom {
    constructor(selector){
        this.$el = typeof selector === "string"
        ? document.querySelector(selector)
        : selector
    }

    html(html) {
        if(typeof html === "string"){
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }

    id(parse){
        if (parse){
           const idArr = this.id().split(':');
           return {
             row: idArr[0],
             col: idArr[1]
           }
        }
        return this.$el.dataset.id
    }

    focus(){
        this.$el.focus();
        return this;
    }

    clear() {
        this.$el.html("");
        return this;
    }

    on(eventType, callback){
        this.$el.addEventListener(eventType, callback);
    }

    off(eventType, callback){
        this.$el.removeEventListener(eventType, callback);
    }

    closest(selector){
        return $(this.$el.closest(selector));
    }

    get data(){
        return this.$el.dataset;
    }

    findAll(selector){
        return this.$el.querySelectorAll(selector);
    }

    find(selector){
        return $(this.$el.querySelector(selector));
    }

    addClass(className){
        this.$el.classList.add(className);
    }

    removeClass(className){
        this.$el.classList.remove(className);
    }

    css(styles = {}){
        Object.keys(styles).forEach( key => {
            this.$el.style[key] = styles[key];
        })
    }

    id(boolean){
        //если true, то возвращает строку, иначе объект
        // return boolean ? {
        //     col: this.$el.dataset.col,
        //     row: this.$el.dataset.row,
        // }
        // : this.$el.dataset.id;


        const id = this.$el.dataset.id;
        const idArray = id.split(':');
        cosnt 
    }

    append(node){
        if(node instanceof Dom) {
            node = node.$el
        }
        if(Element.prototype.append) {
            this.$el.append(node);
        }else {
            this.$el.appendChild(node);
        }

        return this;
        
    }

    getCoords(){
        return this.$el.getBoundingClientRect()
    }
}

// $("div").html("<h1>Test</h1>").clear();

export function $(selector){
    return new Dom(selector);
}

$.create = (tagname, classes = '') => {
    const el = document.createElement(tagname);
    if(classes) {
        el.classList.add(classes);
    }
    return $(el);
}