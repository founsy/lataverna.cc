// Index Script Document

var header = new Vue({
  el: 'header',
  data: {
    site_title: 'La Taverne'
  }
});

Vue.component('menu-item', {
  props: ['menu'],
  template: '#menu-template',
	methods: {
	  showMenuItem: function(event) {
		  console.log('Select item: '+ this.menu.id);
	  }
	}
});

var menuList = new Vue({
  el: '#menu',	
  data: {
	todayList: [
      { 
		  id: 'news', 
		  label: 'Les nouveautés, toute fraîches, pêchées ce matin.', 
		  duration: '60\'' 
	  }
    ], 
    discoveryList: [
      	{
			id: 'platform',
			label: 'La plateforme Creative Cloud',
			duration: '30\''
		},
		{
			id: 'mobile',
			label: 'Les applications mobiles',
			duration: '20\''
		},
		{
			id: 'desktop',
			label: 'Les applications desktop',
			duration: '20\''
		},
		{
			id: 'collaborative',
			label: 'Les services collaboratifs',
			duration: '30\''
		},
		{
			id: 'resources',
			label: 'Les services de ressources',
			duration: '30\''
		},
		{
			id: 'community',
			label: 'Les services communautaires',
			duration: '10\''
		}
    ],
	alacarteList: [
      	{
			id: 'illustration',
			label: 'L\'illustration',
			duration: '30\''
		},
		{
			id: 'photo',
			label: 'La photographie',
			duration: '30\''
		},
		{
			id: 'painting',
			label: 'La peinture numérique',
			duration: '30\''
		},
		{
			id: 'artdirection',
			label: 'La direction artistique',
			duration: '30\''
		},
		{
			id: 'layout',
			label: 'La mise en page',
			duration: '30\''
		},
		{
			id: 'ux',
			label: 'Le design d\'expérience',
			duration: '30\''
		},
		{
			id: 'animation',
			label: 'L\'animation vectorielle',
			duration: '30\''
		},
		{
			id: 'web',
			label: 'Le design web',
			duration: '30\''
		},
		{
			id: 'video',
			label: 'Le montage video',
			duration: '30\''
		},
		{
			id: 'fx',
			label: 'Les effets spéciaux',
			duration: '30\''
		},
		{
			id: 'characters',
			label: 'L\'animation de personnages',
			duration: '30\''
		},
		{
			id: '3d',
			label: 'La 3 dimentions',
			duration: '30\''
		}
    ]
  }
});

Vue.component('order-item', {
  props: ['order'],
  template: '<li>{{ order.label }}</li>'
});

var orderView = new Vue({
  el: '#order',
  data: {
    orderList: [
      { id: 1, label: 'Le menu du jour' }
    ]
  }
});


