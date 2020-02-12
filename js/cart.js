/* Developer note: A singleton pattern is not the 'best' practice, especially in javascript 
   However, due to time constraints and the lack of planning, this is where we are.
   My apologies to the next developer that has to mess with this...
*/

class Cart {
    constructor(){
        if(!Cart.instance){
            this._items = [];
            Cart.instance = this;
        }
        return Cart.instance;
    }

    addItem(AppItems){
        if(AppItems == null){
            throw 'AppItems is undefined';
        }
        this._items.push(AppItems);
    }

    getItemCount(){
        return this._items.length;
    }

    getAllItems(){
        return this._items;
    }

    removeItem(index){
        var found = 0;

        for(var i = 0; i < this._items.length; i++){
            if(i == index){
                this._items.splice(i, 1);
                found = 1;
            }
        }

        if(found == 1){
            return "removed";
        }
        else
        {
            return "not found";
        }
    }

    deleteCart(){
        if(this._items.length > 0){
            this._items.splice(0, this._items.length);
        }else{
            return "cart is already empty";
        }
    }
}

const instance = new Cart();
Object.freeze(instance);

export default instance;
