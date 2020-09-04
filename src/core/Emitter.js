export class Emitter {
   constructor() {
      this.listeners = {}
   }

   //уведомляем слушателя
   emit(event, ...args){

   }

   //пидписка на уведомления
   subscribe(event, fn){
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(fn); 
   }
}