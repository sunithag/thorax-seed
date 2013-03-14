var ItemView = Application.View.extend({
    name: "tvfinder/itemlist",
    id: 'tvfitems',


    events:{},
    render: function() {
        this.$el.html(this.template(this.model.attributes));
      //  this.$el.html(this.model.attributes);
        return this;
    },
    initialize : function(){
      this.listenTo(this.model, "change", this.render);
      // this.template = _.template($("#tvfitems").html());
    }

});






