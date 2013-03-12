/*var ItemsView = Application.View.extend({
    name: "tvfinder/itemlist",

    events:{},
    render: function(data){
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    initialize : function(){
        this.template = _.template($("#tvfitems").html());
    }
})
*/
var ItemsView = Application.View['items'] = Backbone.View.extend({

    className : 'items',

    render: function() {
        var context = this.model.attributes;
        output = this.options.template(context);
        this.$el.html(output);
    }

});

