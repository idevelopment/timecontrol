<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class accountManagementValidator extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'fname'        => 'required',
            'name'         => 'required',
            'email'        => 'required|email',
            'address'      => 'required',
            'city'         => 'required',
            'country'      => 'required',
            'office_phone' => 'required',
            'home_phone'   => 'required',
            'mobile_phone' => 'required',
        ];
    }
}
