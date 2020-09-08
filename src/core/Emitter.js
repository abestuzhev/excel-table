export class Emitter {
   constructor() {
      this.listeners = {}
   }

   //уведомляем слушателя
   emit(event, ...args){
      this.listeners[event].forEach(listener => {
         listener(...args);
      });
   }

   //пидписка на уведомления
   subscribe(event, fn){
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(fn); 
   }
}