class AppDelivery 
{
    constructor(appUser, appItems, instructions, concessionName, total){
        this._appUser = appUser;
        this._appItems = appItems;
        this._instructions = instructions;
        this._concessionName = concessionName;
        this._total = total;
    }

    get appUser(){
        return this._appUser;
    }

    set appUser(nUser){
        this._appUser = nUser;
    }

    get appItems(){
        return this._appItems;
    }

    set appItems(nItems){
        this._appItems = nItems;
    }

    get instructions(){
        return this._instructions;
    }

    set instructions(nInstructions){
        this._instructions = instructions;
    }

    get concessionName(){
        return this._concessionName;
    }

    set concessionName(nConcessionName){
        this._concessionName = nConcessionName;
    }

    get total(){
        return this._total;
    }

    set total(nTotal){
        this._total = nTotal;
    }
}