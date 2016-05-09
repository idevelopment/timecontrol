<?php

namespace App\Http\TransformersApi;

use App\Departments;
use App\Http\TransformersApi\Relations\DepartmentManager;
use League\Fractal;

/**
 * Class DepartmentTransformer
 */
class DepartmentOutput extends Fractal\TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $defaultIncludes = ['managers'];
    
    /**
     * Generic array
     *
     * @param  Departments $department
     * @return array
     */
    public function transform(Departments $department)
    {
        return [
            'id'           => (int)    $department->id,
            'name'         => (string) $department->department_name,
            'managers'     => (string) $department->department_manager,
            'description'  => (string) $department->department_description
        ];
    }

    /**
     * Include Managers
     *
     * @param  Departments $department
     * @return Fractal\Resource\Item
     */
    public function includeManagers(Departments $department)
    {
        $data = $department->managers;
        return $this->collection($data, new DepartmentManager);
    }
}