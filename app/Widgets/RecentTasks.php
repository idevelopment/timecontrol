<?php

namespace App\Widgets;

use Arrilot\Widgets\AbstractWidget;

class RecentTasks extends AbstractWidget
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
    protected $config = [
    'count' => 10,
    ];

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


    public function placeholder()
    {
    return "Loading...";
    }

    /**
     * Treat this method as a controller action.
     * Return view() or other content to display.
     */
    public function run()
    {
        return view("widgets.recent_tasks", [
            'config' => $this->config,
        ]);
    }


}