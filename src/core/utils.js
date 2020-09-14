export function capitalize(string){
    if(typeof string !== "string"){
        return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function storage(key, data){
    if(!data){
        return JSON.parse(localStorage.getItem(key));
    }else {
        return localStorage.setItem(key, JSON.stringify(data));
    }

}