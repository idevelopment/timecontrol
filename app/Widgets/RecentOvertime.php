<?php

namespace App\Widgets;

use Arrilot\Widgets\AbstractWidget;

class RecentOvertime extends AbstractWidget
{
    public function __construct()
    {
       $this->reloadTimeout = config('timecontrol.refreshInterval');
    }

    /**
     * The configuration array.
     *
     * @var array
     */
    protected $config = [];

    /**
     * The number of seconds before each reload.
     *
     * @var int|float
     */
    public $reloadTimeout;

    /**
     * The number of minutes before cache expires.
     * False means no caching at all.
     *
     * @var int|float|bool
     */
    public $cacheTime = false;
    /**
     * Treat this method as a controller action.
     * Return view() or other content to display.
     */
    public function run()
    {
        //

        return view("widgets.recent_overtime", [
            'config' => $this->config,
        ]);
    }
}