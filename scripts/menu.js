// ------------------------
// Events
// ------------------------

// When menu data are loaded
EventBus.$on('menu:dataloaded', function(data) {
    menuVue.today = data.today;
    menuVue.discovery = data.discovery;
    menuVue.alacarte = data.alacarte;
});

// When iten is selected in the menu
EventBus.$on('order:itemadded', function(data) {
    console.debug('Menu - added item: ', data);
    // if(data.list !== null && data.list !== '')
    //     menuList.disable(data.list, data);
});

// ------------------------
// Vues
// ------------------------

var menuVue = new Vue({
  el: '#menu',
  prefix: 'menu:',
  data: {
      today: [],
      discovery: [],
      alacarte: []
  },
  methods: {
      // TODO: try to enable the item
      enable: function(list, item) {
          var targetList = this[list];
          if(targetList) return;
          var newItem = targetList.slice(index, 1);
          newItem.disabled = false;
        //   targetList
      },
      // TODO: try to disable the item
      disable: function(list, item) {
          var targetList = this[list];
          var index = targetList.indexOf(item);
          console.debug('Menu - Index to disable: ', index);
          if( index >= 0) {
              targetList[index].set(disabled, true);
          }
      }
  },
  created: function() {
      // If menu data loaded
      if(EventBus.menu.loaded) {
          var menuData = EventBus.menu.cache;
          EventBus.$emit('menu:dataloaded', menuData);
      }
      else {
        EventBus.loadMenuData();
      }
  }
});

// ------------------------
// Components
// ------------------------

// The menu-item component
Vue.component('menu-item', {
    props: ['item', 'index', 'list'],
    template: '#menu-template',
	methods: {
	  itemselect: function() {
          this.item.list = this.list;
          EventBus.$emit('menu:select', this.item);
	  }
	}
});
