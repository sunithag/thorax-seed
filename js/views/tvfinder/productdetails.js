var productDetailsView = Application.View.extend({
    name: "tvfinder/productdetails",
    id: "productOverlay",
    events:{},
    render: function() {
        this.$el.html(this.template());
        //  this.$el.html(this.model.attributes);
        return this;
    },

    initialize : function(){

       // this.listenTo(this.model, "change", this.render);
    }

});



