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

elixir(function(mix) {
    // Theme css
    mix.sass('app.scss');
    mix.sass('font-awesome.scss');
    mix.sass('bootstrap-editable.scss');
    mix.sass('select2-bootstrap.scss');
    mix.sass('jquery-circliful.scss');

    // Bootstrap css
    mix.less('bootstrap.less', 'public/css');

    // Fonts copy
    mix.copy('resources/assets/fonts/bootstrap', 'public/fonts');
    mix.copy('resources/assets/fonts/font-awesome', 'public/fonts');

    // Bootstrap JS.
    mix.scripts([
        'bootstrap/affix.js',
        'bootstrap/alert.js',
        'bootstrap/button.js',
        'bootstrap/carousel.js',
        'bootstrap/collapse.js',
        'bootstrap/dropdown.js',
        'bootstrap/modal.js',
        'bootstrap/tooltip.js',
        'bootstrap/popover.js',
        'bootstrap/scrollspy.js',
        'bootstrap/tab.js',
        'bootstrap/transition.js'
    ], 'public/js/bootstrap.js');

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
        'plugins/bootstrap-editable.js'
    ], 'public/js/plugins.js');
});
