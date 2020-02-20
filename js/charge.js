class Charge {

    constructor(){
        
        this.stripe = new Stripe('pk_test_4SVq4mEaj4SjhMhHzgYLj6sC003YB7jnir');
        this.init();
    }

    init(){
        document.querySelector("button").disabled = true; 
        var elements = this.stripe.elements();

        var style = {
            base: {
                color: "#32325d",
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#aab7c4"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        };

        
        var card = elements.create("card", {style: style});
        card.mount("#card-element");

        // client secret
        this.enable(card, 'sk_test_lYdrgrBchpJ3LV0LFpymd44E00vuNQOFB6');
    }

    enable(card, clientSecret){
        document.querySelector("button").disabled = false; 
        
        var form = document.getElementById("payment-form");
        form.addEventListener("submit", (e)=> {
            e.preventDefault();
            this.getToken(card, clientSecret);    // on click, get token, process
        });
    }

    getToken(card, clientSecret){
        var fname = document.getElementById("first_name").value;
        var lname = document.getElementById("last_name").value;
        var term = document.getElementById("terminal").value;
        var gate = document.getElementById("gate").value;
        var phone = document.getElementById("phone").value;
        var email = document.getElementById("email").value;
        var tip = document.getElementById("tip").value;
        // parse & set the local storage
        var total = parseFloat(localStorage.getItem('cartTotal')).toFixed(2);
        // convert to cents
        var totalCents = total*100;
        // set to local storage
        localStorage.setItem('totalCents', totalCents);

        if(fname === "" || lname === "" || term === "" || gate === "" || phone === "" || email === "" || tip === ""){
            alert("You must complete the form");
            // change state
            this.changeLoadingState(false);
            // throw to stop processing...
            throw 'form items not completed';
            
        } else {
            var usr = { first: fname, last: lname };
            var user = new User(usr, phone, email, term, gate, tip);
            window.localStorage.setItem('user', JSON.stringify(user));
        }


        this.changeLoadingState(true);
        var tkn = null;

        this.stripe.createToken(card).then(function(result){
            if(result.error){
                console.log('ERROR: ' + result.error);
                throw 'error retreiving token from "stripe"';
            } else {
                tkn = result.token.id;
                console.log('Token received');
            }
        })
        .then(function(){

            var amt = document.getElementById("order-amount").textContent;
            var json = { token : tkn, amount: totalCents }; // the amount must be in cents...

            $.ajax({
                type: 'POST',
                url: 'https://accompanypayments.azurewebsites.net/api/payment',
                contentType: 'application/json',
                headers: {
                    "Accept" : "application/json",
                    "Access-Control-Allow-Origin" : "*",
                },
                async: false,
                data: JSON.stringify(json),
                dataType: 'json',
                success: function(responseData, textStatus, jqXHR){
                    console.log('RECEIVED: ' + responseData); // returns string[] = ["status", 200, true]
                    
                    // check that responseData[0] = 'authorized'
                    // check that responseData[1] = 200
                    // check that responseData[2] = true
                    if(responseData[2] === "True")
                    {
                        var usrParsed = JSON.parse(localStorage.getItem('user'));
                        var nme = usrParsed.userName.first.concat(usrParsed.userName.last);
                        var usr = new User(nme, usrParsed.phone, usrParsed.email, usrParsed.terminal, usrParsed.gate, usrParsed.tip);
                        // get the items
                        var itms = JSON.parse(localStorage.getItem('cart'));
                        var appDev = new AppDelivery(usr, itms.items, "in airport", "PDQ Chicken", totalCents);
                        
                        var swift = new SwiftOrder(appDev);
                        // the call to submitOrder is throwing a 500, MTK will investigate
                        //var submitted = swift.submitOrder();
                    }
                   alert("Your card has been charged successfully!");
                },
                error: function(responseData, textStatus, errorThrown){
                    console.log('ERROR: ' + errorThrown);
                    // show an alert that says there is a problem with the server
                }
            });
        });
    }

    handleStripeEvent(option){
        //based on input do...
    }

    changeLoadingState(isLoading){
        if(isLoading){
            document.querySelector("button").disabled = true;
            document.querySelector("#spinner").classList.remove("hidden");
            document.querySelector("#button-text").classList.add("hidden");
        } else {
            document.querySelector("button").disabled = false;
            document.querySelector("#spinner").classList.add("hidden");
            document.querySelector("#button-text").classList.remove("hidden");
        }
    }
}
