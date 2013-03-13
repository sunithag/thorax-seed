Application.View.extend({
    name: "tvfinder/index",





    events:{
        'click #tvfitems a': function(event){
            console.log("item anchor clicked");
            event.preventDefault();
            var str = event.target.innerHTML;
            var panel = this.$( "#overlay" );

           this.$("#overlay .title").replaceWith(str);
            panel.css("display","block");
            window.scrollTo(0,0);

        },
        'click #overlay .close': function(event){
            console.log("clicked on close icon");
            this.$( "#overlay" ).css("display","none");
        },

        'rendered': function(event){


      /*      slider = $("#size-slider").slider({ animate: false, range: true, min: range_min, max: range_max, values: [0, 0],
                slide: function (event, ui) {

                    if (ui.values[0] > ui.values[1])
                        return false;

                    $(this).find(".ui-slider-handle:eq(0)").attr("data-value", ui.values[0]);
                    $(this).find(".ui-slider-handle:eq(1)").attr("data-value", ui.values[1]);

                    range[0] = ui.values[0];
                    range[1] = ui.values[1];

                    filterTypes();
                } });

            slider.bind("setvals", function (e, p) {
                $(this).slider("option", "values", p.values);
                $(this).slider("option", "slide").call($(this), null, p);
            });

            slider.trigger("setvals", { values: [range_mid-10, range_mid+10] } );

             /*  this.$( "#slider-range" ).slider({
                    range: true,
                    min: 0,
                    max: 500,
                    values: [ 75, 300 ],
                    slide: function( event, ui ) {
                        this.$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
                    }
                });
                this.$( "#amount" ).val( "$" + this.$( "#slider-range" ).slider( "values", 0 ) +
                    " - $" + this.$( "#slider-range" ).slider( "values", 1 ) );

                    */


        },
        'ondragmove .hdl': function(event){
            console.log("drag move");

        },
        'ondragstop .hdl' : function(event){
            console.log("drag stop");

        },

        'change input[type="range"]': function(event) {
            var el, newPoint, newPlace, offset, width;
            el = this.$("#srange");
            width = el.width();
            newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
            offset = -5.3;
            if (newPoint < 0) { newPlace = 0;  }
            else if (newPoint > 1) { newPlace = width; }
            else { newPlace = width * newPoint + offset; offset -= newPoint;}
            el
                .next("output")
                .css({
                    left: newPlace,
                    marginLeft: offset + "%"
                })
                .text(el.val());
        },
        'click #clear_filters': function(event){
            console.log("clicked on clear filters");
            $('.tvfAction select').val('None');
            this.tvfItemList();
           // $("input[type='search']:visible:enabled:first").focus();
        },

        'change #typeList': function(event){
            console.log("type list changed");

            this.tvfItemList();
        },

        'change #brandList':function(event){


            console.log("brand list changed");

            this.tvfItemList();
       /*
        var tvfitems, data, str = "brand list changed";
        data = this.collection.models;
            data = data.splice(20);
            tvfitems = this.$(".tvfitems");
            if(this.$('em').length ==0){
                var $em = $('<em>').html(str);
                tvfitems.html('');
                tvfitems.append($em);
                $em.fadeIn();
            } else {

                this.$('em').stop().fadeOut(function(){
                    $(this).html( str ).fadeIn();
                });

            } */

        },

        'change #sortList':function(event){
            console.log("sort list changed");
            this.tvfItemList();
        }




    },

    tvfItemList: function(event){
        console.log("in itemlist");
        var tvfitems = this.$("#tvfitems");
        var matches = this.$("#count");

        var data = this.collection.models;
        var type = $("#typeList :selected").text();
        var brand = $("#brandList :selected").text();
        var sort = $("#sortList :selected").text();


        tvfitems.html("");
        var i, nitems = 0;

     //   for(i in data){
       //    console.log( data[i].attributes.name);
        //}


       this.newArray = data.filter(function(item){

            return (type.match(/All/) || item.attributes.name.match(type));
        });

            this.newArray = this.newArray.filter(function(item){
          return (brand.match(/All/) || item.attributes.name.match(brand));
        });

        this.newArray.sort(function(a,b) {
            return parseFloat(b.attributes.listPrice) - parseFloat(a.attributes.listPrice);
        });

        matches.html("");
        matches.html(this.newArray.length + " MATCHES ");


      /*  var model = new Backbone.Model({items:newArray});

        var view = new Application.Views["tvfinder/itemlist"]({
            model:model
        });
        Application.setView(view);
        view.render();
        $('.tvfitems').replaceWith(view.el);*/

      //  tvfitems.html("");
        var str = $("<ul class='nav nav-pills' data-view-cid='view7' data-view-helper='collection' data-collection-element='true' data-collection-cid='collection3'></ul>");


        for(i in this.newArray){

            var j = this.newArray[i];
           var li = $("<li data-model-cid='c109'>");
           var a = $("<a>");
            a.attr("href", j.attributes.url);
           // $("<li>").appendTo(str);
            //$("<a>").attr("href", j.attributes.url).appendTo(li);
            $("<img>").attr("src", j.attributes.image).appendTo(a);
            $("<span>").attr("class", 'title').text(j.attributes.name).appendTo(a);
            $("<span>").attr("class", 'title').text("$" + j.attributes.listPrice).appendTo(a);
           a.appendTo(li);
           li.appendTo(str);
           // tvfItems.append(str);

        };

        this.$("#tvfitems").fadeOut(300);
        this.$("#tvfitems").html("");
        tvfitems.append(str);
        setTimeout(this.$("#tvfitems").fadeIn(300), 300);





    }

 /*   events: {
        rendered: function() {
            this.$("#tvRangeSlider").rangeSlider();
        }
        "submit form": function(event) {
            event.preventDefault();
            var attrs = this.serialize();
            this.collection.add(attrs);
            this.$('input[name="title"]').val('');
        },
        'change input[type="checkbox"]': function(event) {
            var model = $(event.target).model();
            model.set({done: event.target.checked});
        }
    }*/
});