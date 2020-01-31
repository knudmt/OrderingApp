class ConcessionList 
{
    constructor(city){
        this.city = city;
    }

    loadConcessions(){
        var concessions = null;

        $.ajax({
            type:'GET',
            url:'https://accompanyconcessions.azurewebsites.net/api/restaurants?city=' + this.city,
            contentType: 'text/plain',
            headers: {
                "Accept":"application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            async: false,
            dataType: 'json',
            success: function(responseData, textStatus, jqXHR){
                concessions = JSON.parse(responseData);
            },
            error: function(responseData, textStatus, errorThrown){
                console.log('ERROR' + errorThrown);
                concessions = 'ERROR' + errorThrown;
            }
        });

        return concessions;
    }

    format(concessions){
        
        var root = new Array(0);

        var i;
        for(i = 0; i < concessions.concessions.length; i++){
            var ta = new Array(0);
            ta[0] = concessions.concessions[i];
            root.push(ta);
        }

        return root;
    }
}
