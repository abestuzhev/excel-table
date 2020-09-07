import { capitalize } from "./utils";

export class DomListener {
    constructor($root, listeners = []){
        if(!$root){
            throw new Error("No $root provider from DomListener");
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListener(){
        this.listeners.forEach( listener => {
            const method = getEventMethod(listener);
            if(!this[method]){
                const name = this.name || "";
                throw new Error(`Methode ${method} is not implemented is not ${name} Component`);
            }
            this[method] = this[method].bind(this);
            this.$root.on(listener, this[method])
        })
    }

    removeDomListener(){
        this.listeners.forEach( listener => {
            this.$root.off(listener, this[method])
        });
    }
}

function getEventMethod(eventName){
    return "on" + capitalize(eventName);
}