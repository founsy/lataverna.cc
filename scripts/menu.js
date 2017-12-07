// ------------------------
// Events
// ------------------------
// When iten is selected in the menu
EventBus.$on('order:itemadded', function(data) {
    console.debug('Menu - added item: ', data);
    // if(data.list !== null && data.list !== '')
    //     menuList.disable(data.list, data);
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
          //this.item.section = this.section;
          EventBus.$emit('menu:select', this.item);
	  }
	}
});

// ------------------------
// Vues
// ------------------------
var menuVue = new Vue({
  el: '#menu',
  prefix: 'menu:',
  data: {
      name: "La Taverna CC",
      sectionToday: null,
      sectionDiscovery: null,
      sectionCard: null
  },
  created: function() {
      EventBus.localize().then(this.dataCallback.bind(this));
  },
  methods: {
      dataCallback: function(data) {
          console.debug('Menu - data loaded: ', data);
          if(data.mainContentOfPage)
              this.digest(data.mainContentOfPage.menu);
      },
      digest: function(data) {
          console.debug('Menu - digest data: ', data);
          this.name = data.name;
          for(var section of data.hasMenuSection) {
              switch (section.identifier) {
                  case "today-section":
                  this.sectionToday = section;
                      break;
                  case "discovery-section":
                  this.sectionDiscovery = section;
                      break;
                  case "card-section":
                  this.sectionCard = section;
                      break;
              }
          }
      }
  }
});
