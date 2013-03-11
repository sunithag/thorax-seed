new (Backbone.Router.extend({

    routes: module.routes,
    index: function() {
        var TVFCollection = Application.Collection.extend({
            url: 'http://localhost:8000/tvs.json',
            //localStorage : new Backbone.LocalStorage("TVFinder"),
            refreshFromServer : function() {
                return Backbone.ajaxSync.apply(this, arguments);
            },

            parse : function(data){
                //   data.splice(20);
                return data;
            }
        });

        var collection = new TVFCollection();
        collection.fetch({
            success: function() {
                console.log("fetch sucess");
                //collection.trigger('ready');
                // console.log(collection);

            },
            error: function() {
                console.log("fetch error"); }
        });

        var view = new Application.Views["tvfinder/index"]({
            collection:collection
        });
        Application.setView(view);

        /*
         var collection = new TVFCollection();
         var view = new Application.Views["tvfinder/index"]({
         collection: collection
         });
         Application.setView(view);*/

    }

}));
/*
 TVFCollection.instance = new TVFCollection();
 TVFCollection.instance.fetch({
 success: function() {
 console.log("fetch is successful");
 //trigger ready function?
 });
 },
 error: function() {
 console.log(arguments); }
 });
 var view = new Application.Views["tvfinder/index"]({
 collection:TVFCollection

 });
 Application.setView(view);

 */




