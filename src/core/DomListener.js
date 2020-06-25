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
            this.$root.on(listener, this[method]) 
        })
             
    }

    removeDomListener(){

    }
}

function getEventMethod(eventName){
    return "on" + capitalize(eventName);
}