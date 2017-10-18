"use strict";

// Index Script Document

var app = new Vue({
  el: '#app',
  data: {
    message: 'La Taverna Creativa'
  }
});

Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
});

var app7 = new Vue({
  el: '#order',
  data: {
    order: [
      { id: 1, text: 'Le menu du jour' }
    ]
  }
});


