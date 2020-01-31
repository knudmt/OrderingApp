class AppItems 
{
    constructor(description, price, quanity){
        this._description = description;
        this._price = price;
        this._quanity = quanity;
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

    get quanity(){
        return this._quanity;
    }

    set quanity(newQuanity){
        this._quanity = newQuanity;
    }

    log(){
        console.log(this._description + ', ' + 'at a price of: ' + this._price + ' with a quanity of: ' + this._quanity);
    }
}