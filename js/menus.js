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
    format(menu){
        
        var root = new Array(0);

        var numCategories = menu.menus.menu.categories.length;
        console.log('Number of Categories = ' + numCategories);

        var i;
        var j;
        for(j=0; j< numCategories; j++){
            console.log('category name =' + menu.menus.menu.categories[j].name);
            if (menu.menus.menu.categories[j].hasOwnProperty('menuItems')){
                for(i = 0; i < menu.menus.menu.categories[j].menuItems.length; i++){
                    var ta = new Array(2)
                    
                    ta[0] = menu.menus.menu.categories[j].menuItems[i].name;
                    ta[1] = menu.menus.menu.categories[j].menuItems[i].description;
                    ta[2] = menu.menus.menu.categories[j].menuItems[i].subItems[0].price;
                    console.log(ta[0] + " , " + ta[1] + " , " + ta[2]);
                    root.push(ta);
                }

            }
            
        }
        

        return root;
    }
    
    
   
}
