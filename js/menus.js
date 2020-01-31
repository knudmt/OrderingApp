class Menus {
    constructor(id){
        this.id = id;
    }

    getMenus(){
        var menu = null;

        $.ajax({
            type:'GET',
            url:'https://accompanyconcessions.azurewebsites.net/api/concessions?id=' + this.id,
            contentType: 'text/plain',
            headers:{
                "Accept":"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            async: false,
            dataType: 'json',
            success: function(responseData, textStatus, jqXHR){
                menu = JSON.parse(responseData);
            },
            error: function(responseData, textStatus, errorThrown){
                console.log('ERROR' + errorThrown);
                menu = 'ERROR' + errorThrown;
            }
        });

        return menu;
    }
}