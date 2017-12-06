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
        emailValidity: null,
        submitReady: false,
        submitting: false,
        drag: false
        // emailPattern: "/\@(?!(me|mac|icloud|gmail|googlemail|hotmail|live|msn|outlook|yahoo|ymail|aol)\.)/",
        // dragSource: null
    },
    methods: {
        created: function() {
            //this.emailPattern = this.buildEmailPattern();
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
            this.validInput(emailIn);
            console.debug('Email validity: ', emailIn.validity);
            if(emailIn.validity.valid) {
                var allowed = this.isAllowedEmail(emailIn.value);
                if(!allowed) {
                    emailIn.validity.valid = false;
                    emailIn.validity.customError = true;
                    emailIn.setCustomValidity("Mais... celà n'a pas l'air d'un email pro ceci ?");
                    console.debug('Email validity:', emailIn.validity);
                }
                else {
                    emailIn.validity.valid = true;
                    emailIn.validity.customError = false;
                    emailIn.setCustomValidity("");
                    console.debug(`Let's go for ${emailIn.value}:`, emailIn.validity);
                    this.submitReady = true;
                }
            }
            else {
                console.debug(`The ${emailIn.value} email is invalid:`, emailIn.validity);
            }
        },
        validInput: function(input) {
            input.checkValidity();
            if(!input.validity.valid) {
                if(input.validity.typeMismatch) {
                    input.setCustomValidity("Mais... ça ne ressemble pas à un email ça ?");
                }
                else if(input.validity.customError) {
                    input.setCustomValidity("Heu... cet email a un problème !");
                }
            }
            return input.validity;
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
        }
        // dragstartItem(e) {
        //     console.debug('dragstartItem...', e);
        //     this.dragSource = e.target;
        //     e.dataTransfer.effectAllowed = 'move';
        //     e.dataTransfer.setData('text/html', this.outerHTML);
        //     e.target.classList.add('dragging');
        // },
        // dragenterItem(e) {
        //     console.debug('dragenterItem...', e);
        //     if(e.traget)
        //         this.dropSource = e.traget;
        // },
        // dragoverItem(e) {
        //     console.debug('dragoverItem...', e);
        //     if (e.preventDefault) { e.preventDefault(); }
        //     if(this.dropSource && this.dropSource.classList.contains('order-item')) {
        //         this.dropSource.classList.add('dragover');
        //         e.dataTransfer.dropEffect = 'move';
        //     }
        //     return false;
        // },
        // dragleaveItem(e) {
        //     console.debug('dragleaveItem...', e);
        //     if(this.dropSource)
        //         this.dropSource.classList.remove('dragover');
        // },
        // dropItem(e) {
        //     console.debug('dropItem...', e);
        //     if (e.stopPropagation) {
        //         e.stopPropagation(); // Stops some browsers from redirecting.
        //     }
        //     // Don't do anything if dropping the same column we're dragging.
        //     if(this.dropSource) {
        //         if (this.dragSource != this.dropSource && this.dropSource.classList.contains('order-item')) {
        //             // Set the source column's HTML to the HTML of the column we dropped on.
        //             this.dragSource.innerHTML = this.dropSource.innerHTML;
        //             this.dropSource.innerHTML = e.dataTransfer.getData('text/html');
        //         }
        //         this.dropSource.classList.remove('dragover');
        //     }
        //     return false;
        // },
        // dragendItem(e) {
        //     console.debug('dragendItem...', e);
        //     if(this.dragSource)
        //         this.dragSource.classList.remove('dragging');
        // },
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
