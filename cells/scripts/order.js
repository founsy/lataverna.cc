// ------------------------
// Events
// ------------------------

// When order data are loaded...
EventBus.$on('order:dataloaded', function(data) {});

// When order open...
EventBus.$on('order:open', function(data) {});

// When Menu item is selected...
EventBus.$on('menu:itemselect', function(data) {
    console.debug('Order - selected item: '+ data.id);
    orderView.preview(data);
});

// When order open
EventBus.$on('order:itemdelete', function(data) {
    console.debug('Order - item to delete: '+ data);
    orderView.removeItem(data);
});

// ------------------------
// Vue
// ------------------------

// The Order View List
var orderView = new Vue({
    el: '#order',
    data: {
        isOpen: false,
        duration: 0,
        animDuration: 0,
        section: 'list',
        previewItem: {},
        orderList: []
    },
    methods: {
        // Open or close the Order panel
        show: function(section) {
            this.isOpen = true;
            EventBus.$emit('order:show', this.isOpen);
            this.section = section ? section : 'list';
        },
        hide: function() {
            this.previewItem = {};
            this.$el.scrollTop = 0; // hack: scroll to top to reset the order.
            this.isOpen = false;
            EventBus.$emit('order:show', this.isOpen);
        },
        toggle: function() {
            if(this.isOpen)
                this.hide();
            else
                this.show();
        },
        // Preview an item before push in order
        preview: function(data) {
            this.previewItem = data;
            this.show('preview');
        },
        // Add the preview item into the order
        orderPreviewItem: function() {
            this.addItem(this.previewItem);
        },
        // Add an item in the order
        addItem: function(data) {
            console.debug('adding item: ', data);
            this.show('list');
            this.orderList.push(data);
            this.duration += data.duration;
            EventBus.$emit('order:itemadded', data);
            //this.$el.addEventListener("transitionend", this.onToggleEnd.bind(this, data), false);
        },
        // Remove an item of the order
        removeItem: function(data) {
            var index = this.orderList.indexOf(data);
            var removed = this.orderList.splice(index, 1);
            if(removed.length > 0)
                this.duration -= data.duration;
        }
    },
    watch: {
        // Watch for duration for animate number
        duration: function(newValue, oldValue) {
            var vm = this;
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ tweeningNumber: oldValue })
            .easing(TWEEN.Easing.Quadratic.Out)
            .to({ tweeningNumber: newValue }, 1000)
            .onUpdate( function() {
                vm.animDuration = this.tweeningNumber.toFixed(0);
            }).start();
          animate();
        }
    }
});
