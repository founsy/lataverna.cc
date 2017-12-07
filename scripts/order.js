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
        name: "",
        label: {},
        isOpen: false,
        duration: 0,
        animDuration: 0,
        items: [],
        email: "",
        isNotEmail: false,
        isNotProEmail: false,
        emailValidity: null,
        submitReady: false,
        submitting: false,
        drag: false
    },
    created: function() {
        EventBus.localize().then(this.dataCallback.bind(this));
    },
    methods: {
        dataCallback: function(data) {
            console.debug('Order - data loaded: ', data);
            if(data.mainContentOfPage)
                orderVue.digest(data.mainContentOfPage.order);
        },
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
        ordering: function(event) {
            console.debug('Ordering...');
            var emailIn = this.$el.querySelector('#email-input');
            emailIn.checkValidity();
            console.debug('Email validity: ', emailIn.validity);
            if(!emailIn.validity.valid) {
                this.isNotEmail = true;
            }
            else {
                this.isNotEmail = false;
                var allowed = this.isAllowedEmail(emailIn.value);
                if(!allowed) {
                    emailIn.validity.valid = false;
                    emailIn.validity.customError = true;
                    this.isNotProEmail = true;
                }
                else {
                    emailIn.validity.valid = true;
                    emailIn.validity.customError = false;
                    emailIn.setCustomValidity("");
                    console.debug(`Let's go for ${emailIn.value}:`, emailIn.validity);
                    this.isNotEmail = false;
                    this.isNotProEmail = false;
                    this.submitReady = true;
                }
            }
        },
        toggle: function() {
            if(this.isOpen)
                this.hide();
            else
                this.show();
        },
        isAllowedEmail(email) {
            var domain = email.replace(/.*@/, "");
            var key = domain.split('.')[0];
            console.info(`Domain is ${domain}, Key is ${key} `);
            var forbiddenDomains = [
                'hotmail', 'gmail', 'ymail', 'googlemail', 'live', 'gmx','yahoo', 'outlook', 'msn',
                'icloud', 'me', 'mac', 'aol', 'zoho', 'mail', 'yandex', 'hushmail', 'lycox',
                'lycosmail', 'inbox', 'myway', 'aim', 'fastmail', 'goowy', 'juno', 'shortmail',
                'atmail', 'protonmail'
            ];
            var forbidden = forbiddenDomains.indexOf(key.toLowerCase());
            console.info(`Is ${email} forbidden : `, forbidden);
            if(forbidden >= 0)
                return false;
            else
                return true;
        },
        digest: function(data) {
            console.debug('Order - digest data: ', data);
            this.name = data.name;
            this.label = data.label;
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
