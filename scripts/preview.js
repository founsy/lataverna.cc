// ------------------------
// Events
// ------------------------

// When Menu item is selected...
EventBus.$on('menu:select', function(data) {
    console.debug('(Preview) selected item: '+ data.id);
    preVue.preview(data);
});

// ------------------------
// Vue
// ------------------------

var preVue = new Vue({
    el: '#preview',
    prefix: 'preview:',
    data: {
        isOpen: false,
        duration: 0,
        animDuration: 0,
        item: null,
    },
    methods: {
        // Preview an item before push in order
        preview: function(data) {
            this.item = data;
            this.show();
        },
        // Add the preview item into the order
        orderItem: function() {
            if(this.item.id) {
                EventBus.$emit('order:add', this.item);
            }
            this.hide();
        },
        // Open the Vue
        show: function() {
            this.isOpen = true;
            EventBus.$emit('preview:show', this.isOpen);
        },
        // Close the Vue
        hide: function() {
            //this.item = null;
            this.$el.scrollTop = 0; // hack: scroll to top to reset the order.
            this.isOpen = false;
            // say it to the System
            EventBus.$emit('preview:show', this.isOpen);
        },
        // Open or close the Vue
        toggle: function() {
            if(this.isOpen)
                this.hide();
            else
                this.show();
        }
    }
});
