new Vue({
    el: '#authencation',

    data: {
        // Model data for the new user form.
        credentials: {
            email           : '',
            password        : ''
        },

    },

    // Compouted error models:
    computed: {
        // Create a new user.
        errors: function() {
            for (var key in this.credentials) {
                if ( ! this.credentials[key]) return true;
            }

            return false;
        }
    }
});
//# sourceMappingURL=authencation.js.map
