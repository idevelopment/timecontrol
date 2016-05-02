new Vue({
    el: '#wrapper',

    data: {
        // Model data for the new user form.
        newUser: {
            firstName       : '',
            lastName        : '',
            email           : '',
            password        : '',
            passwordConfirm : '',
            address         : '',
            country         : '',
            city            : '',
            postal          : '',
            phone           : '',
            mobilePhone     : ''
        }
    },

    // Compouted error models:
    computed: {
        // Create a new user.
        errorsNewuser: function() {
            for (var key in this.newUser) {
                if ( ! this.newUser[key]) return true;
            }

            return false;
        }
    },

    // Here will all methods be defined.
    // This will be used when we bring in the API.
    methods: {}
});
//# sourceMappingURL=interaction.js.map
