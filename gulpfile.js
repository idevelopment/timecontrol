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
    mix.browserSync();

    // Theme css
    mix.sass('app.scss');
    mix.sass('bootstrap-editable.scss');
    mix.sass('select2-bootstrap.scss');
    mix.sass('jquery-circliful.scss');

    // JQuery
    mix.scripts(['jquery/jquery.js'], 'public/js/jquery.js');
    mix.scripts(['jquery/jquery-migrate.js'], 'public/js/jquery-migrate.js');

    // JavaScript plugins.
    mix.scripts([
        'plugins/moment.js',
        'plugins/bootstrap-datetime.js',
        'plugins/pickList.js',
        'plugins/select2.js',
        'plugins/jquery-circliful.js',
        'plugins/bootstrap-editable.js',
        'plugins/loader.js'
    ], 'public/js/plugins.js');

    mix.scripts([
        node + '/respond.js/dest/respond.min.js',
        'plugins/html5shiv.js'
    ], 'public/js/ie.js');

    // Bootstrap
    mix.less(node + '/bootstrap/less/bootstrap.less', 'public/css/bootstrap.css');
    mix.copy([
        'node_modules/bootstrap/fonts/glyphicons-halflings-regular.eot',
        'node_modules/bootstrap/fonts/glyphicons-halflings-regular.svg',
        'node_modules/bootstrap/fonts/glyphicons-halflings-regular.ttf',
        'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff',
        'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff2'
    ], 'public/fonts');

    // Font Awesome
    mix.sass(node + '/font-awesome/scss/font-awesome.scss');
    mix.scripts(node + '/bootstrap/dist/js/bootstrap.js', 'public/js/bootstrap.js');
    mix.copy([
        'node_modules/font-awesome/fonts/FontAwesome.otf',
        'node_modules/font-awesome/fonts/fontawesome-webfont.eot',
        'node_modules/font-awesome/fonts/fontawesome-webfont.svg',
        'node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
        'node_modules/font-awesome/fonts/fontawesome-webfont.woff',
        'node_modules/font-awesome/fonts/fontawesome-webfont.woff2'
    ],  'public/fonts');

    // Bootstrap color-picker
    mix.scripts(node + '/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js', 'public/js/colorpicker.js');
    mix.less(node + '/bootstrap-colorpicker/src/less/colorpicker.less', 'public/css/colorpicker.css');
});
