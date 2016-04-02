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

    // Bootstrap css
    mix.less('bootstrap.less', 'public/css');
    mix.copy('resources/assets/fonts', 'public/fonts');

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

    // JavaScript plugins.
    mix.scripts([
        'plugins/pickList.js'
    ], 'public/js/plugins.js');
});
