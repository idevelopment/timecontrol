<?php

namespace App\Http\Controllers;

use App\Departments;
use App\Http\Requests;
use League\Fractal\Manager;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use League\Fractal\Pagination\Cursor;
use App\Http\TransformersApi\DepartmentOutput;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

/**
 * Class ApiDepartmentsController
 * @package App\Http\Controllers
 */
class ApiDepartmentsController extends Controller
{
    private $transformer;
    private $fractal;

    /**
     * ApiDepartmentsController constructor.
     */
    public function __construct()
    {
        $this->transformer = new DepartmentOutput();
        $this->fractal     = new Manager();
    }

    /**
     * Display a listing of the resource.
     *
     * @TODO   Needs test
     * @TODO   Needs documentation
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $currentCursor  = $request->get('cursor', null);
        $previousCursor = $request->get('previous', null);
        $limit          = $request->get('limit', 10);

        if ($currentCursor) {
            $departments = Departments::with('managers')->where('id', '>', $currentCursor)->take($limit)->get();
        } else {
            $departments = Departments::with('managers')->take($limit)->get();
        }

        $newCursor = $departments->last()->id;
        $cursor    = new Cursor($currentCursor, $previousCursor, $newCursor, $departments->count());
        $resource  = new Collection($departments, $this->transformer);

        $resource->setCursor($cursor);
        $outputBody = $this->fractal->createData($resource)->toJson();

        return response($outputBody, 200)
            ->header('Content-Type', 'application/json');
    }

    /**
     * Display the specified resource.
     *
     * @TODO   needs tests
     * @TODO   needs documentation
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $departments = Departments::find($id);

        if (count($departments) > 0) {
            $resource = new Item($departments, $this->transformer);
            $outputBody = $this->fractal->createData($resource)->toJson();
        } else {
            $outputBody = [];
            $outputBody['message'] = 'Could not found a department with that ID.';
        }

        return response($outputBody, 200)
            ->header('Content-Type', 'application/json');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @TODO   needs test
     * @TODO   Needs documentation
     * @param  Requests\DepartmentsValidator $input the input bag from the request.
     * @return \Illuminate\Http\Response
     */
    public function store(Requests\DepartmentsValidator $input)
    {
        Departments::create($input->all());

        $output = [];
        $output['message'] = 'Department created';
        $output['data']    = $input->all();

        return response($output, 201)
            ->header('Content-Type', 'application/json');
    }

    /**
     * Update the specified resource in storage.
     *
     * @TODO   Needs documentation
     * @TODO   Needs tests
     * @param  Requests\DepartmentsValidator $input the input bag from the request.
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Requests\DepartmentsValidator $input, Request $request, $id)
    {
        Departments::find($id)->update($input->all());

        $output = [];
        $output['message']  = 'Department updated';
        $output['new_data'] = $input->all();

        return response($output, 200)
            ->header('Content-Type', 'application/json');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @TODO   need tests
     * #TODO   needs documentation
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (! empty($id)) {
            Departments::destroy($id);

            $data = [];
            $data['message'] = 'Department deleted';
        } else {
            $data = [];
            $data['message'] = 'Could not delete the department';
        }

        return response($data, 200)
            ->header('Content-Type', 'application/json');
    }
}
