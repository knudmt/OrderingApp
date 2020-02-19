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
            var json = { token : tkn, amount: amt }; // the amount must be in cents...

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
                    /*
                        var swift = new SwiftOrder(AppDelivery);
                        var submitted = swift.submitOrder();

                        this could also be done in checkout.html in the script code
                        but this method would have to return a boolean or an object
                        to ensure that the order should be placed

                        also need to make a method to handle the different status that come
                        back. unauthorized, requires 2nd auth, declined 
                    */
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