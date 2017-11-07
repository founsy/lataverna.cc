// Script imports
function importScript(url, loadFunction) {
    var script = document.createElement("script");
    script.src = url;
    script.onload = loadFunction;
    document.body.appendChild(script);
}
importScript('cells/scripts/menu.js');
importScript('cells/scripts/preview.js');
importScript('cells/scripts/order.js');

// ------------------------
// Events
// ------------------------

// The Event bus
var EventBus = new Vue({
    data: {
        menu: {
            url: 'assets/data/menu.json',
            loaded: false
        }
    },
    methods: {
        loadMenuData: function() {
            // Load menu data
            fetch(this.menu.url)
              .then(function(response) { return response.json() })
              .then(function(data) {
                  this.menu.loaded = true;
                  this.menu.cache = data;
                  EventBus.$emit('menu:dataloaded', data); // listened by menu
              });
        }
    }
});

// When PreVue is show (or hide)
EventBus.$on('preview:show', function(data) {
    if(data)
        document.body.classList.add('preview-mode');
    else
        document.body.classList.remove('preview-mode');
});

// When OrderVue is show (or hide)
EventBus.$on('order:show', function(data) {
    if(data)
        document.body.classList.add('order-mode');
    else
        document.body.classList.remove('order-mode');
});

// ------------------------
// Vues
// ------------------------

// Header of the app
var headerVue = new Vue({
  el: 'header',
  data: {
    site_title: 'La Taverne'
  }
});
