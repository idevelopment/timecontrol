<?php

namespace app\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Input;

class languageMiddleware
{
    /**
     * @var array
     */
    protected static $supportedLanguages = ['nl', 'en', 'fr',
    ];
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure                 $next
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $language = (Input::get('lang')) ?: Session::get('lang');
        $this->setSupportedLanguage($language);

        return $next($request);
    }
    /**
     * @param string $lang
     *
     * @return bool
     */
    private function isLanguageSupported($lang)
    {
        return in_array($lang, self::$supportedLanguages);
    }
    /**
     * @param string $lang
     */
    private function setSupportedLanguage($lang)
    {
        if ($this->isLanguageSupported($lang)) {
            App::setLocale($lang);
            Session::put('lang', $lang);
        }
    }
}
