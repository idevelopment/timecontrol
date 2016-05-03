var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

// Config vars
var node = '../../../node_modules';

elixir(function(mix) {

    // Add browserSync
    mix.browserSync()
        // Theme css
        .sass('app.scss')
        .sass('bootstrap-editable.scss')
        .sass('select2-bootstrap.scss')
        .sass('jquery-circliful.scss')

        // JQuery
        .scripts(['jquery/jquery.js'], 'public/js/jquery.js')
        .scripts(['jquery/jquery-migrate.js'], 'public/js/jquery-migrate.js')

        // JavaScript plugins.
        .scripts([
            'plugins/moment.js',
            'plugins/bootstrap-datetime.js',
            'plugins/pickList.js',
            'plugins/select2.js',
            'plugins/jquery-circliful.js',
            'plugins/bootstrap-editable.js',
            'plugins/loader.js'
        ], 'public/js/plugins.js')

        .scripts([
            node + '/respond.js/dest/respond.min.js',
            'plugins/html5shiv.js'
        ],      'public/js/ie.js')

        // Bootstrap
        .less(node + '/bootstrap/less/bootstrap.less', 'public/css/bootstrap.css')
        .copy([
            'node_modules/bootstrap/fonts/glyphicons-halflings-regular.eot',
            'node_modules/bootstrap/fonts/glyphicons-halflings-regular.svg',
            'node_modules/bootstrap/fonts/glyphicons-halflings-regular.ttf',
            'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff',
            'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff2'
        ], 'public/fonts')

        // VueJS
        .scripts([
            node + '/vue/dist/vue.js',
            node + '/vue-resource/dist/vue-resource.js'
        ], 'public/js/vue.js')
        
        .scripts('vue/vue.js', 'public/js/interaction.js')

        // Font Awesome
        .sass(node + '/font-awesome/scss/font-awesome.scss')
        .scripts(node + '/bootstrap/dist/js/bootstrap.js', 'public/js/bootstrap.js')
        .copy([
            'node_modules/font-awesome/fonts/FontAwesome.otf',
            'node_modules/font-awesome/fonts/fontawesome-webfont.eot',
            'node_modules/font-awesome/fonts/fontawesome-webfont.svg',
            'node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
            'node_modules/font-awesome/fonts/fontawesome-webfont.woff',
            'node_modules/font-awesome/fonts/fontawesome-webfont.woff2'
        ],  'public/fonts')

        // Bootstrap color-picker
        .scripts(node + '/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js', 'public/js/colorpicker.js')
        .less(node + '/bootstrap-colorpicker/src/less/colorpicker.less', 'public/css/colorpicker.css');
});
