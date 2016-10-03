var elixir = require('laravel-elixir');

elixir.config.sourcemaps = false;

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
    mix
    	.sass([
            'bootstrap.scss', 
    		'ionicons/ionicons.scss', 
            'photoswipe/main.scss',
            'photoswipe/default-skin/default-skin.scss'
    	], 'public/css/lib.css')
    	.sass([
            'presentation.scss',
            'presentation-medium.scss',
            'presentation-small.scss'
    	], 'public/css/app.css')

    	.scripts([
    		'jquery.min.js', 
    		'bootstrap.min.js', 
            'photoswipe.min.js',
            'photoswipe-ui-default.min.js',
            'velocity.min.js',
            'velocity.ui.js'
    	], 'public/js/lib.js')
    	.scripts([
            'projects.js',
    		'presentation.js',
    	], 'public/js/app.js')

    	.version([
    		'css/app.css',
    		'js/app.js'
    	]);
});
