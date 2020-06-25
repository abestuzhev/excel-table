export class DomListener {
    constructor($root, listeners = []){
        if(!$root){
            throw new Error("No $root provider from DomListener");
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListener(){
        console.log(this.listeners);        
    }

    removeDomListener(){

    }


}