
Application['todos'] = (function() {
  var module = {exports: {}};
  var exports = module.exports;
  Application['todos'] = exports;

  /* router : todos */
module.name = "todos";
module.routes = {"":"index"};
new (Backbone.Router.extend({
  routes: module.routes,
  index: function() {
    var collection = new Application.Collection([{
      title: 'First Todo',
      done: true
    }]);
    var view = new Application.Views["todos/index"]({
      collection: collection
    });
    Application.setView(view);
  },
  tvfinder: function(){

  }
}));
;;
Application.View.extend({
  name: "todos/index",
  events: {
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
  }
});
;;
Thorax.templates['todos/index'] = Handlebars.compile('{{#collection tag=\"ul\"}}\n  <li {{#done}}class=\"done\"{{/done}}>\n    <input type=\"checkbox\" {{#done}}checked{{/done}}>\n    {{title}}\n  </li>\n{{/collection}}\n<form>\n  <input name=\"title\">\n  <input type=\"submit\" value=\"Add\">\n</form>');

  if (Application['todos'] !== module.exports) {
    console.warn("Application['todos'] internally differs from global");
  }
  return module.exports;
}).call(this);
