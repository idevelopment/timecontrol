<?php

namespace App\Http\TransformersApi\Relations;

use App\Departments;
use League\Fractal;

/**
 * Class DepartmentTransformer
 */
class DepartmentManager extends Fractal\TransformerAbstract
{

    /**
     * Generic array
     *
     * @param  Departments $manager
     * @return array
     */
    public function transform(Departments $manager)
    {
        return [
            'id'   => (int)    $manager->id,
        ];
    }
}