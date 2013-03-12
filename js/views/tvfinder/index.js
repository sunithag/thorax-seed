Application.View.extend({
    name: "tvfinder/index",

    events:{
        'rendered': function(event){

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
            $('form select').val('None');
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
        tvfitems.html("");
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

        };


       // var $em = $('<em>').html(str);
        if(this.$('em').length ==0){
            var $em = $('<em>').html(str);
            tvfitems.html('');
            tvfitems.append($em);
            $em.fadeIn("slow");
        } else {

            this.$('em').stop().fadeOut(function(){
                $(this).html( str ).fadeIn("slow");
            });

        }



    }


});