class AppUser {

    constructor(user, phone, email, terminal, gate, tip){
        this._userName = user;
        this._phone = phone;
        this._email = email;
        this._terminal = terminal;
        this._gate = gate;
        this._tip = tip;
    }

    get userName(){
        return this._userName;
    }

    set userName(nUser){
        this._userName = nUser;
    }

    get phone(){
        return this._phone;
    }

    set phone(nPhone){
        this._phone = nPhone;
    }

    get email(){
        return this._email;
    }

    set email(nEmail){
        this._email = nEmail;
    }

    get terminal(){
        return this._terminal;
    }

    set terminal(nTerminal){
        this._terminal = nTerminal;
    }

    get gate(){
        return this._gate;
    }

    set gate(nGate){
        this._gate = nGate;
    }

    get tip(){
        return this._tip;
    }

    set tip(nTip){
        this._tip = nTip;
    }
}