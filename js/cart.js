class Cart 
{
    constructor(){
        this.items = []; 
    }

    addItem(AppItems){
        if(AppItems.constructor.name != "AppItems"){
            throw new Error("Expected item to be of class 'AppItems'");
        }
        this.items.push(AppItems);
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
        }else{
            return "cart already empty";
        }
    }
}