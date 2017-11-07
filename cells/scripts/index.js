// Script imports
function importScript(url, loadFunction) {
    var script = document.createElement("script");
    script.src = url;
    script.onload = loadFunction;
    document.body.appendChild(script);

}
importScript('cells/scripts/menu.js');
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

// When Menu item is clicked...
EventBus.$on('menu:itemselect', function(data) {
    console.debug('Index - select item: '+ data.id);
});

// When Order is clicked
EventBus.$on('order:show', function(data) {
    console.debug('Order - show. ', data);
    if(data)
        document.body.classList.add('order-show');
    else
        document.body.classList.remove('order-show');
});

// ------------------------
// Vues
// ------------------------

// Header of the app
var header = new Vue({
  el: 'header',
  data: {
    site_title: 'La Taverne'
  }
});
