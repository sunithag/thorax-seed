
Application['tvfinder'] = (function() {
  var module = {exports: {}};
  var exports = module.exports;
  Application['tvfinder'] = exports;

  /* router : tvfinder */
module.name = "tvfinder";
module.routes = {"":"index"};
new (Backbone.Router.extend({

    routes: module.routes,
    index: function() {
        var tvf = Application.Model.extend();
        var TVFCollection = Application.Collection.extend({
            model: tvf,
            url: 'http://localhost:8000/tvs.json',
            //localStorage : new Backbone.LocalStorage("TVFinder"),
            refreshFromServer : function() {
                return Backbone.ajaxSync.apply(this, arguments);
            }

         /*   parse : function(data){
             //   data.splice(20);
                console.
                return data;
            }
           typefilter: function(){
                return this.filter(function(type){
                    return tvf.get('name').contains(type);
                })
               // return _this.filter(function(data){

                //});
            }*/
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





;;
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


;;
Thorax.templates['tvfinder/itemlist'] = Handlebars.compile('        {{#items tag=\"ul\" class=\"nav nav-pills\"}}\n\t\t    <li>\n\t\t\t    <a href=\"http://www.walmart.com/ip/Sceptre-32-X322BV-HD/15739136\">\n\t\t\t       <img src=\"{{image}}\" alt=\"\">\n\t\t\t       <span class=\"title\">{{name}}</span>\n\t\t\t    </a>\n\t\t    </li>\n         {{/items}}\n');Application.View.extend({
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
;;
Thorax.templates['tvfinder/index'] = Handlebars.compile('<div class=\"container\">\n\n<!-- header starts -->\n    <header class=\"tvfhead clearfix\">\n        <ul class=\"nav nav-pills pull-right\">\n            <li>\n                <a>\n                    <i class=\"sprite-create\"></i>\n                    <span >\n                        Create</span>\n               </a>\n               <div>a new wishlist</div>\n\n             </li>\n\n            <li>\n                <a>\n                    <i class=\"sprite-person\"></i>\n                    <span>Sign In</span>\n               </a>\n               <div>to your account </div>\n            </li>\n\n            <li class=\"last\">\n                <a>\n                    <i class=\"sprite-cart\"></i>\n                    <span>0 Items</span>\n               </a>\n               <div>in your cart  </div>\n            </li>\n\n        </ul>\n        <ul class=\"nav nav-pills pull-left\">\n            <li>\n                <img alt=\"Walmart. Save Money. Live Better.\"  src=\"img/walmart_logo.gif\">\n            </li>\n            <li>\n                <form style=\"margin-top:10px;padding:0;\">\n                    <input type=\"search\" class=\"search-query\" placeholder=\"Search\">\n                 </form\n            </li>\n        </ul>\n    </header>\n<!-- header ends -->\n<!-- breadcrumb starts -->\n        \t<div style=\"background: #fff; display: block; padding: 0px 24px; margin: 10px 0 0; line-height: 1em;\">\n        \t\t\t\t<a href=\"http://www.walmart.com/\"><img src=\"img/home.jpg\"/></a>\n\n        \t\t\t\t<a href=\"http://www.walmart.com/cp/All-Departments/121828\">Departments</a>\n        \t\t\t\t<span style=\"margin-left:15px;color:#EEE\"> > </span>\n        \t\t\t\t<a href=\"http://www.walmart.com/cp/Electronics/3944\">Electronics</a>\n        \t\t\t\t<span style=\"margin-left:15px;color:#EEE\"> > </span>\n        \t\t\t\t<a class=\"last\" href=\"http://www.walmart.com/cp/1060825\">TV\'S</a>\n        \t</div>\n\n\n\n<!-- breadcrumb ends -->\n\n\n\n\n<!-- POV starts -->\n    <article class=\"pov\" style=\"font-family:Arial;text-align:center;vertical-align:middle;margin-bottom:40px;\">\n       <h2 style=\"font-weight:normal;font-size:35px;\">Get More, For Less</h2>\n       <p style=\"color:#acacac;font-size:19px;font-weight:normal;\">Find the perfect Television with our new <span style=\"color:#0e79be;\">TVFinder<sup>TM</sup></span></p>\n        <div style=\"display:block;position:relative;clear:both;height:226px;margin-top:18px;\">\n            <img alt=\"TV 18\\\".\" style=\"float:left;position:absolute;bottom:5px;left:70px;\"  src=\"img/tv18withprice.jpg\">\n            <img alt=\"TV 24\\\".\" style=\"float:left;position:absolute;bottom:0;left:298px;\" src=\"img/tv24withprice.jpg\"\">\n            <img alt=\"TV 46\\\".\" style=\"float:left;position:absolute;bottom:0;left:569px;\" src=\"img/tv46withprice.jpg\">\n           <!-- <i class=\"sprite-tv18withprice\" style=\"float:left;position:absolute;bottom:0;left:70px;\"></i>\n            <i class=\"sprite-tv24withprice\" style=\"float:left;position:absolute;bottom:0;left:298px;\"></i>\n            <i class=\"sprite-tv46withprice\" style=\"float:left;position:absolute;bottom:0;left:569px;\"></i> -->\n        </div>\n    </article>\n\n<!-- POV ends -->\n\n<!-- Action Form starts -->\n   <form id=\"tvf_form\" name=\"tvf_form\" action=\"\" method=\"get\">\n\n\n    <article class=\"tvfAction clearfix\" style=\"border-bottom:1px solid #EEE;margin-bottom:20px;\">\n        <ul class=\"nav nav-pills pull-right\">\n            <li style=\"padding-right:20px;text-align:left;font-family:Arial;font-size:16px;color:#666\">\n\n                             <label>Type</label>\n                             <select id = \"typeList\">\n                               <option value = \"All\">All</option>\n                               <option value = \"LCD\">LCD</option>\n                               <option value = \"LED-LCD\">LED-LCD</option>\n                               <option value = \"Plasma\">Plasma</option>\n                             </select>\n            </li>\n            <li style=\"padding-right:20px;text-align:left;font-family:Arial;font-size:16px;color:#666\">\n                             <label>Brand</label>\n                             <select id = \"brandList\">\n                               <option value = \"All\">All</option>\n                               <option value = \"2\">Samsung</option>\n                               <option value = \"3\">VIZIO </option>\n                               <option value = \"4\">RCA</option>\n                               <option value = \"5\">Sceptre</option>\n                               <option value = \"6\">Element</option>\n                               <option value = \"7\">HANNspree</option>\n                                <option value = \"8\">Proscan</option>\n                                <option value = \"9\">Sony </option>\n                                <option value = \"10\">Emerson</option>\n                             </select>\n\n\n            </li>\n            <li style=\"padding-right:20px;text-align:left;font-family:Arial;font-size:16px;color:#666\">\n                               <label>Sort</label>\n                               <select id = \"sortList\">\n                                 <option value = \"1\">Default</option>\n                                 <option value = \"2\">Price highest</option>\n                                 <option value = \"3\">Size</option>\n                                 <option value = \"4\">Brand</option>\n                               </select>\n            </li>\n        </ul>\n        <ul class=\"nav nav-pills pull-left\">\n            <li style=\"margin-top:10px\">\n                <i class=\"sprite-logoicon\"></i>\n                <div style=\"color:#0e79be;\">TVFinder<sup>TM</sup></div>\n            </li>\n            <li style=\"margin-left:20px\">\n\n\n\n<!--\n\n        <span class=\"range-wrapper\">\n            <input type=\"range\" data-thumbwidth=\"14\" />\n        </span>\n        -->\n\n\n                    <div class=\"slider\">\n                    \t<div>Size</div>\n                    \t<div class=\"slide\" id=\"slider\">\n                    \t\t<div class=\"range\">\n                    \t\t\t<div class=\"bar\" style=\"margin-left: 5px; margin-right: 0px; \"></div>\n                    \t\t    <div class=\"hdl\" style=\"left: -4px;\" draggable=\"true\"></div>\n                    \t\t    <div class=\"hdl\" style=\"left: 178px;\" draggable=\"true\"></div>\n                    \t\t</div>\n                    \t</div>\n                    \t<div class=\"legend\">\n                    \t\t<div class=\"left\">0</div>\n                    \t\t<div class=\"right\">100</div>\n                    \t</div>\n                    </div>\n\n            </li>\n        </ul>\n        </article>\n        <article>\n                <div class=\"clearfix\" >\n                    <span style=\"float:right;margin-right:20px;\">\n                        <input type=\"button\" id=\"clear_filters\" value=\"Clear Filters\" style=\"border-radius:5px;background-color:white;\" >\n                    </span>\n                    <span style=\"float:left;margin-left:20px;\">\n                    <span style=\"font-weight:bold\" id=\"count\"> 20 MATCHES </span>FOR TELEVISIONS FITTING THAT CRITERIA\n                    </span>\n                </div>\n\n    </article>\n</form>\n  <!-- Action form ends -->\n\n<!-- items starts -->\n\n    <article class=\"tvfitems\" id=\"tvfitems\">\n\n        {{#collection tag=\"ul\" class=\"nav nav-pills\"}}\n\t\t    <li>\n\t\t\t    <a href=\"http://www.walmart.com/ip/Sceptre-32-X322BV-HD/15739136\">\n\t\t\t       <img src=\"{{image}}\" alt=\"\">\n\t\t\t       <span class=\"title\">{{name}}</span>\n\t\t\t       <span class=\"price\">${{listPrice}}</span>\n\t\t\t    </a>\n\t\t    </li>\n         {{/collection}}\n    </article>\n\n    <!--  items ends -->\n    <hr>\n<!-- footer starts -->\n    <footer style=\"background:#1A75CF;color:white;margin-bottom:20px;\" class=\"tvffooter clearfix\">\n       <div style=\"margin:30px 30px 30px 185px\" class=\"clearfix\" >\n           <i class=\"sprite-walmartfooterlogo\" style=\"float:left\"></i>\n            <form style=\"margin-top:10px;padding:0;float:left\">\n                <input type=\"search\" class=\"search-query\" placeholder=\"Search\">\n             </form>\n           <button style=\"float:left; margin: 20px 0px 0px 10px;\">Sign Up</button>\n        </div>\n       <article style=\"float:left;padding:0 15px 0 20px;\">\n          <ul class=\"nav\">\n             <li><a href=\"http://corporate.walmart.com/?povid=P1576-C1207.1157-L4\" title=\"Corporate\">Corporate</a></li>\n             <li><a href=\"http://corporate.walmart.com/our-story/?povid=P1576-C1207.1157-L5\" title=\"Our Story\">Our Story</a></li>\n             <li><a href=\"http://news.walmart.com/?povid=P1576-C1207.1157-L6\" title=\"News &amp; Views\">News &amp; Views</a></li>\n             <li><a href=\"http://foundation.walmart.com/?povid=P1576-C1207.1157-L7\" title=\"Giving Back\">Giving Back</a></li>\n             <li><a href=\"http://corporate.walmart.com/global-responsibility/?povid=P1576-C1207.1157-L8\" title=\"Global Responsibility\">Global Responsibility</a></li>\n             <li><a href=\"http://stock.walmart.com/?povid=P1576-C1207.1157-L9\" title=\"Investors\">Investors</a></li>\n             <li><a href=\"https://corporate.walmart.com/suppliers/?povid=P1576-C1207.1157-L10\" title=\"Suppliers\">Suppliers</a></li>\n             <li><a href=\"http://walmartstores.com/careers?povid=P1576-C1207.1157-L11\" title=\"Careers\">Careers</a></li>\n          </ul>\n       </article>\n       <article style=\"float:left;padding:0 15px;\">\n          <ul class=\"nav\">\n             <li><a href=\"http://www.walmart.com/catalog/catalog.gsp?cat=542412&amp;povid=P1576-C1207.1157-L12\" title=\"About Walmart.com\">About Walmart.com</a></li>\n             <li><a href=\"http://www.walmart.com/catalog/catalog.gsp?cat=538449&amp;povid=P1576-C1207.1157-L13\" title=\"Terms of Use\">Terms of Use</a></li>\n             <li><a href=\"http://affiliates.walmart.com/aff_home.jsp?povid=P1576-C1207.1157-L14\" title=\"Affiliate Program\">Affiliate Program</a></li>\n             <li><a href=\"http://public.conxport.com/walmart/sponsorship/home.aspx?povid=P1576-C1207.1157-L15\" title=\"Sponsorship Submission\">Sponsorship Submission</a></li>\n             <li><a href=\"http://www.walmart.com/catalog/catalog.gsp?cat=538456&amp;povid=P1576-C1207.1157-L16\" title=\"International Customers\">International Customers</a></li>\n             <li><a href=\"http://www.walmart.com/cservice/contextual_help_popup.gsp?modId=971879&amp;povid=P1576-C1207.1157-L17\" title=\"About Our Ads\">About Our Ads</a></li>\n             <li><a href=\"http://www.walmart.com/popular_searches/index.htm?povid=P1576-C1207.1157-L18\" title=\"Popular Searches\">Popular Searches</a></li>\n             <li><a href=\"http://www.walmart.com/cservice/ca_storefinder.gsp?povid=P1576-C1207.1157-L19\" title=\"Store Finder\">Store Finder</a></li>\n             <li><a href=\"http://coupons.walmart.com/?povid=P1576-C1207.1157-L20\" title=\"Printable Coupons\">Printable Coupons</a></li>\n          </ul>\n       </article>\n       <article style=\"float:left;padding:0 15px;\">\n          <ul class=\"nav\">\n             <li><a href=\"http://www.walmart.com/wf.gsp/a_d_registration_flow/landing?povid=P1576-C1207.1157-L21\" title=\"Associate Discounts\">Associate Discounts</a></li>\n             <li><a href=\"https://corporate.walmart.com/privacy-security?povid=P1576-C1207.1157-L22\" title=\"Privacy &amp; Security\">Privacy &amp; Security</a></li>\n             <li><a href=\"https://corporate.walmart.com/privacy-security/walmart-privacy-policy##?povid=P1576-C1207.1157-L23#CalifRights\" title=\"California Privacy Rights\">California Privacy Rights</a></li>\n             <li><a href=\"http://www.walmartlabs.com/?povid=P1576-C1207.1157-L24\" title=\"@Walmart Labs\">@WalmartLabs</a></li>\n             <li><a href=\"http://www.walmart.com/catalog/catalog.gsp?cat=121828&amp;povid=P1576-C1207.1157-L25\" title=\"See All Department\">See All Department</a></li>\n          </ul>\n       </article>\n       <article style=\"float:left;padding:0 15px;\">\n           <ul class=\"nav \">\n             <li><a href=\"http://www.walmart.com/catalog/catalog.gsp?cat=5436&amp;povid=P1576-C1207.1157-L26\" title=\"Help Center\">Help Center</a></li>\n             <li><a href=\"http://www.walmart.com/cservice/li_trackorder.gsp?NavMode=2&amp;povid=P1576-C1207.1157-L27\" title=\"Track Your Order\">Track Your Order</a></li>\n             <li><a href=\"http://www.walmart.com/catalog/catalog.gsp?cat=538459&amp;povid=P1576-C1207.1157-L28\" title=\"Returns Policy\">Returns Policy</a></li>\n             <li><a href=\"http://www.walmart.com/returns/returns_type.gsp?povid=P1576-C1207.1157-L29\" title=\"Return an Item\">Return an Item</a></li>\n             <li><a href=\"https://corporate.walmart.com/recalls?povid=P1576-C1207.1157-L30\" title=\"Product Recalls\">Product Recalls</a></li>\n             <li><a href=\"http://www.walmart.com/cservice/cu_comments_online.gsp?cu_heading=8&amp;povid=P1576-C1207.1157-L31\" title=\"Contact Us\">Contact Us</a></li>\n             <li><a href=\"https://secure.opinionlab.com/ccc01/comment_card.asp?custom_var=249524036097612114&amp;height=768&amp;povid=P1576-C1207.1157-L32&amp;referer=http%3A%2F%2Fwww.walmart.com%2F&amp;time1=1348429537447&amp;time2=1348429729088&amp;width=1024\" title=\"Feedback\">Feedback</a></li>\n             </ul>\n       </article>\n       <article style=\"float:left;padding:0 15px;\">\n           <ul class=\"nav \">\n              <li>Walmart Money Center</li>\n              <li><i class=\"sprite-footerimg\"></i></li>\n           </ul>\n       </article>\n\n    </footer>\n\n\n\n    <!-- footer ends -->');

  if (Application['tvfinder'] !== module.exports) {
    console.warn("Application['tvfinder'] internally differs from global");
  }
  return module.exports;
}).call(this);
