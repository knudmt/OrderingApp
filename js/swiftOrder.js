class SwiftOrder
{
    constructor(AppDelivery){
        
        if(AppDelivery == null){
            throw 'AppDelivery is null or undefined';
        }

        this._appDelivery = AppDelivery;
    }

    //<summary>
    // submits an order to our delivery api
    // returns error or response data
    //</summary>
    submitOrder(){

        var resp = null;

        $.ajax({
            type:'POST',
            url: 'https://accompanyweborder.azurewebsites.net/api/Delivery',  
            contentType: 'application/json',
            headers: {
                "Accept" : "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            async: false,
            data: JSON.stringify(this._appDelivery),
            dataType: 'json',
            success: function(responseData, textStatus, jqXHR){
                console.log('SUCCESS: ' + responseData);
                resp = responseData;
            },
            error: function(responseData, textStatus, errorThrown){
                if(responseData.statusText === "Booking Created"){ // bug here. not sure what
                    console.log("BOOKING CREATED");
                    return responseData.statusText;
                }else {
                    throw "ERROR Booking failed with: " + errorThrown;
                }
                
            }
        });

        return resp;
    }
}
