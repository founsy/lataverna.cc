// Script imports
function importScript(url, loadFunction) {
    var script = document.createElement("script");
    script.src = url;
    script.onload = loadFunction;
    document.body.appendChild(script);
}
importScript('scripts/menu.js');
importScript('scripts/preview.js');
importScript('scripts/order.js');

// The Event bus
var EventBus = new Vue({
    el: '#bus',
    prefix: 'bus:',
    data: {
        isWorking: false,
        lang: 'io',
        path: 'assets/data/',
        loaded: false,
        cache: null
    },
    created: function() {
        this.localize().then(this.dataCallback.bind(this));
    },
    methods: {
        dataCallback: function(data) {
            console.debug('Bus - response data: ', data);
            this.loaded = true;
            this.cache = data;
            this.isWorking = false;
        },
        localize: function() {
            var promise = null;
            var cachedData = this.cache;
            if(this.loaded && cachedData !== null) {
                promise = new Promise(function(resolve, reject) {
                    resolve(cachedData);
                });
                console.debug('Bus - cached data: ', promise);
            }
            else {
                this.isWorking = true;
                this.lang = this.findLang();
                var uri = `${this.path}menu-${this.lang}.json`;
                promise = this.asyncRequest(uri).then(this.requestCallback.bind(this));
                console.debug('Bus - request at uri: ', promise);
            }
            return promise;
        },
        requestCallback: function(data) {
            console.debug('Bus - response data: ', data);
            this.loaded = true;
            this.cache = data;
            this.isWorking = false;
            return data;
        },
        asyncRequest: function(url) {
            var promise = null;
            if(this.fetch) {
                promise = fetch(uri).then(function(response) {
                    return response.json();
                });
            }
            else {
                promise = new Promise( function(resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function(event) {
                        var data = JSON.parse(xhr.responseText);
                        resolve(data);
                    };
                    xhr.onerror = function(error) {
                        reject(xhr.statusText);
                    };
                    xhr.open("GET", url, true);
                    xhr.send();
                });
            }
            return promise;
        },
        findLang: function() {
            var lang;
            // look for URL Params
            let index = window.location.search.indexOf('lang=');
            if(index >= 0) {
              let start = index+5;
              let stop = start+2;
              lang = window.location.search.slice(start, stop);
            }
            // look document lang attribute
            else if(document.documentElement.hasAttribute('lang')) {
                lang = document.documentElement.getAttribute('lang');
            }
            // default lang - io
            else {
                lang = this.lang;
            }
            document.documentElement.setAttribute('lang', lang);
            console.log('Document lang : ', lang);
            return lang;
        }
    }
});

// ------------------------
// Events
// ------------------------
// When PreVue is show (or hide)
EventBus.$on('preview:show', function(msg) {
    if(msg)
        document.body.classList.add('preview-mode');
    else
        document.body.classList.remove('preview-mode');
});
// When OrderVue is show (or hide)
EventBus.$on('order:show', function(msg) {
    if(msg)
        document.body.classList.add('order-mode');
    else
        document.body.classList.remove('order-mode');
});
