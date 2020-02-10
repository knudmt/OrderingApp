class AppItems 
{
    constructor(description, price, quantity){
        this._description = description;
        this._price = price;
        this._quantity = quantity;
    }

    get description(){
        return this._description;
    }

    set description(newDescription){
        this._description = newDescription;
    }

    get price(){
        return this._price;
    }

    set price(newPrice){
        this._price = newPrice;
    }

    get quantity(){
        return this._quantity;
    }

    set quantity(newQuantity){
        this._quantity = newQuantity;
    }

    log(){
        console.log(this._description + ', ' + 'at a price of: ' + this._price + ' with a quantity of: ' + this._quantity);
    }


}