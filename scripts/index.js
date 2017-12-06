// Script imports
function importScript(url, loadFunction) {
    var script = document.createElement("script");
    script.src = url;
    script.onload = loadFunction;
    document.body.appendChild(script);
}
importScript('scripts/menu.js');
importScript('scripts/preview.js');
importScript('scripts/order.js');

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

// When data are loaded
EventBus.$on('menu:dataloaded', function(msg) {
    console.info('data loaded:', msg);
    // if(data.alacarte) {
    //     orderVue.addItem(data.discovery[0]);
    //     orderVue.addItem(data.discovery[1]);
    //     orderVue.isOpen = true;
    // }
});

// When PreVue is show (or hide)
EventBus.$on('preview:show', function(msg) {
    if(msg)
        document.body.classList.add('preview-mode');
    else
        document.body.classList.remove('preview-mode');
});

// When OrderVue is show (or hide)
EventBus.$on('order:show', function(msg) {
    if(msg)
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
    site_title: 'La Taverna CC'
  }
});
