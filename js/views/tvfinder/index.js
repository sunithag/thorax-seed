Application.View.extend({
    name: "tvfinder/index",


    events:{
        'rendered': function(event){


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
           // $("input[type='search']:visible:enabled:first").focus();
        },

        'change #typeList': function(event){
            console.log("type list changed");
        },

        'change #brandList':function(event){
            var tvfitems, data, str = "brand list changed";

            console.log("brand list changed");
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

            }

        },

        'change #sortList':function(event){
            console.log("sort list changed");
        }




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