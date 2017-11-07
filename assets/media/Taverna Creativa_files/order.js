// ------------------------
// Events
// ------------------------

// Add item to order
EventBus.$on('order:add', function(data) {
    console.debug('(Order) item to add: '+ data);
    orderVue.addItem(data);
});

// Remove item from order
EventBus.$on('order:remove', function(data) {
    console.debug('(Order) item to delete: '+ data);
    orderVue.removeItem(data);
});

// ------------------------
// Vue
// ------------------------

// The Order View List
var orderVue = new Vue({
    el: '#order',
    prefix: 'order:',
    data: {
        isOpen: false,
        duration: 0,
        animDuration: 0,
        items: [],
        email: "",
        emailPattern: /\@(?!(me|mac|icloud|gmail|googlemail|hotmail|live|msn|outlook|yahoo|ymail|aol)\.)/,
        emailOk: false
    },
    methods: {
        // Add an item in the order
        addItem: function(data) {
            console.debug('adding item: ', data);
            this.show();
            this.items.push(data);
            this.duration += data.duration;
            EventBus.$emit('order:itemadded', data);
            //this.$el.addEventListener("transitionend", this.onToggleEnd.bind(this, data), false);
        },
        // Remove an item of the order
        removeItem: function(data) {
            var index = this.items.indexOf(data);
            var removed = this.items.splice(index, 1);
            if(removed.length > 0)
                this.duration -= data.duration;
        },
        // Verify email
        emailVerify: function(event) {
            console.debug('Email value: ', this.email);
            console.debug('Email validity: ', event.target.validity);
            var isValid = event.target.validity.valid;
            if(!isValid) {
                this.emailOk = false;
            }
            // compare with the list of excluded email.
            // if exclusion:
            // if included:

        },
        // Open or close the Order panel
        show: function(section) {
            this.isOpen = true;
            EventBus.$emit('order:show', this.isOpen);
        },
        hide: function() {
            this.$el.scrollTop = 0; // hack: scroll to top to reset the order.
            this.isOpen = false;
            EventBus.$emit('order:show', this.isOpen);
        },
        toggle: function() {
            if(this.isOpen)
                this.hide();
            else
                this.show();
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
