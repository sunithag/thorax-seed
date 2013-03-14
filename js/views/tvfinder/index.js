(function () {
    var slider;



Application.View.extend({
    name: "tvfinder/index",



    events:{

        'click #tvfitems a' : 'productDetails',

        'click #overlay .close': 'hideOverlay',

        'click #clear_filters': 'clearFilters',

        'change .tvfAction select': 'updateProductList',

        'rendered': function(event){

            //this.setupData();
            this.setupSlider(event);
        }

    },

    ready: function(event){
        console.log("show items");
    },

    productDetails: function(event){

        event.preventDefault();
        var str = event.target.innerHTML;
        var panel = this.$( "#overlay" );
        this.$("#overlay .title").replaceWith(str);
        panel.css("display","block");
        window.scrollTo(0,0);
    },

    hideOverlay: function(event){
        this.$( "#overlay" ).css("display","none");
    },

    setupSlider: function(event){
        var range = [0,0];
        var range_min = 13, range_max=100, range_mid = parseInt((range_max + range_min) / 2);;
        var self=this;

        slider = this.$("#size-slider").slider({ animate: false, range: true, min: 0, max: 100, values: [0, 0],
            slide: function (event, ui) {

                if (ui.values[0] > ui.values[1])
                    return false;

                $(this).find(".ui-slider-handle:eq(0)").attr("data-value", ui.values[0]);
                $(this).find(".ui-slider-handle:eq(1)").attr("data-value", ui.values[1]);

                range[0] = ui.values[0];
                range[1] = ui.values[1];
                //self.updateProductList();

            } });

        slider.bind("setvals", function (e, p) {
            $(this).slider("option", "values", p.values);
            $(this).slider("option", "slide").call($(this), null, p);
        });

        slider.trigger("setvals", { values: [range_mid-20, range_mid+20] } );
        //this.updateProductList();
    },

    clearFilters: function(event){
        $('.tvfAction select').val('None');
        //slider.trigger("setvals", { values: [range_mid-20, range_mid+20] } );
        this.updateProductList();
    },

    updateProductList: function(event){
        var tvfitems = this.$("#tvfitems");
        var matches = this.$("#count");

        var data = this.collection.models;
        var type = $("#typeList :selected").text();
        var brand = $("#brandList :selected").text();
        var size;
        var sort = $("#sortList :selected").text();


       //tvfitems.html("");
       var i, nitems = 0;
       this.newArray = data.filter(function(item){

            return (type.match(/All/) || item.attributes.name.match(type));
        });

       this.newArray = this.newArray.filter(function(item){
          return (brand.match(/All/) || item.attributes.name.match(brand));
        });

       this.newArray.sort(function(a,b) {
            return parseFloat(b.attributes.listPrice) - parseFloat(a.attributes.listPrice);
        });

       //this.newArray = this.newArray.where({item.attributes.name: "Musketeer"});

        matches.html("");
        matches.html(this.newArray.length + " MATCHES ");

       var model = new Backbone.Model({items:this.newArray});

         var view = new Application.Views["tvfinder/itemlist"]({
           model:model
        });
        view.render();
        Application.$el.append(view.el)

        //$('.tvfitems').replaceWith(view.el);



/*
     var str = $("<ul class='nav nav-pills'>");


       for(i in this.newArray){
           var j = this.newArray[i];
           var li = $("<li >");
           var a = $("<a>");
            a.attr("href", j.attributes.url);
            $("<img>").attr("src", j.attributes.image).appendTo(a);
            $("<span>").attr("class", 'title').text(j.attributes.name).appendTo(a);
            $("<span>").attr("class", 'price').text("$" + j.attributes.listPrice).appendTo(a);
           a.appendTo(li);
           li.appendTo(str);

        };

        this.$("#tvfitems").fadeOut(300);
        this.$("#tvfitems").html("");
        setTimeout(this.$("#tvfitems").fadeIn(300), 300);
        tvfitems.append(str);
*/
    }

});

    $(document).ready(function() {
        console.log("document is ready");
        //console.log("collection models " + this.collection.models);
        //appView.updateProductList();


    });

})();