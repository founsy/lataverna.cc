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
        emailPattern: "/\@(?!(me|mac|icloud|gmail|googlemail|hotmail|live|msn|outlook|yahoo|ymail|aol)\.)/",
        emailOk: false,
        submitting: false
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
        // Validate form
        validateEmail: function(event) {
            var form = this.$el.querySelector('#email-form');
            console.debug('Form: ', form);
            var input = this.$el.querySelector('#email-input');;
            console.debug('Input: ', input.validity);
            var isValid = input.checkValidity();
            if(!isValid) {
                this.emailOk = false;
                if(input.validity.typeMismatch) {
                    input.setCustomValidity("Mais... ça ne ressemble pas à un email ça ?");
                    form.reportValidity();
                }
                else if(input.validity.patternMismatch) {
                    input.setCustomValidity("Mais... celà n'a pas l'air d'un email pro ceci ?");
                    form.reportValidity();
                }
                else {
                    form.reportValidity();
                }
            }
            else {
                this.emailOk = true;
            }
            // compare with the list of excluded email.
            // if exclusion:
            // if included:
            return false;
        },
        ordering: function(event) {
            console.debug('Ordering: ', event.target);
            event.target.checkValidity();
            event.preventDefault();
            event.stopPropagation();
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
