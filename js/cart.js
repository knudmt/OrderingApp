class Cart 
{
    constructor(){
        this.items = []; 
    }

    addItem(AppItems){
        
        if(AppItems == null){
            throw 'AppItems is undefined';
        }

        this.items.push(AppItems);
    }
    //    *MUST* call save to set the array of items to the cart
    save(){
        if(this.items.length == 0){
            throw 'no items in cart';
        }
        window.localStorage.setItem('cart', JSON.stringify(this.items));
    }

    getItemCount(){
        return this.items.length;
    }

    getAllItems(){
        return this.items;
    }

    removeItem(index){

        var found = 0;

        for(var i = 0; i < this.items.length; i++){
            if(i == index){
                this.items.splice(i, 1);
                found = 1;
            }
        }

        if(found == 1)
        {
            return "removed";
        }
        else
        {
            return "not found";
        }
    }

    deleteCart(){
        if(this.items.length > 0){
            this.items.splice(0, this.items.length);
            window.localStorage.removeItem('cart');
        }else{
            return "cart already empty";
        }
    }
    
    printStorage(){
        var saved = JSON.parse(window.localStorage.getItem('cart'));
        
        for(var key in saved){
            if(saved.hasOwnProperty(key)){
               console.log('item: ' + saved[key].description + " price: " + saved[key].price + " quanity: " + saved[key].quanity);
            }
        }
    }
}
