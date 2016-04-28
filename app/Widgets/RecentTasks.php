<?php

namespace App\Widgets;

use Arrilot\Widgets\AbstractWidget;

class RecentTasks extends AbstractWidget
{
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
    public $reloadTimeout = 30;

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