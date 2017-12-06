/*
 * Collection component for Vue
 */
Vue.component('collection', {

    // ------------------------
    // Properties
    // ------------------------

    props: ['items','selecteditem', 'index'],

    // ------------------------
    // Template
    // ------------------------

    template: '#menu-template',

    // ------------------------
    // Methods
    // ------------------------

	methods: {
	  add: function(item) {
	  },
      remove: function(item) {
      },
	}
});
