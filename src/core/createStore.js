export function createStore() {
   const state = {};
   let listeners = [];
   return {
      //подписка на слушателей
      subscribe(fn) {
         listeners.push(fn);
         //отписка от подписки
         return {
            unsubscribe(){
               listeners = listeners.filter( listener => listener !== fn);
            }

         }
      },

      dispatch(){

      },

      getState() {
         return state;
      }
   }
}