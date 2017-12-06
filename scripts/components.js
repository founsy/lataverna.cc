// ------------------------
// Components
// ------------------------

Vue.component('collection', { props: ['items','selecteditem', 'index'],
    template: '#menu-template',
	methods: {
	  add: function(item) {
	  },
      remove: function(item) {
      },
	}
});

// The menu-item component
// Vue.component('menu-item', { props: ['item', 'index'], template: '#menu-template',
// 	methods: {
// 	  itemClick: function(event) {
//           EventBus.$emit('menu:itemclick', this.item);
// 	  }
// 	}
// });

// <order-item v-for="item in orderList" :item="item" :index="index" :key="item.id"></order-item>
// <script type="text/x-template" id="order-template">
//     <li class="order-item">
//         <div class="timed-item">
//             <label>{{item.label}}</label>
//             <span class="separator dotted"></span>
//             <span class="duration">{{item.duration}}'</span>
//             <button @click="itemDelete">
//                 <svg class="icon"><use class="dark" xlink:href="assets/images/icons.svg#delete"/></svg>
//             </button>
//         </div>
//     </li>
// </script>
