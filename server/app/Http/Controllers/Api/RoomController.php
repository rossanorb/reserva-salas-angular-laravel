<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\RoomValidator;

class RoomController extends Controller
{
    protected $model;

    public function __construct(\App\Room $model, RoomValidator $validator ){
        $this->model = $model;
        parent::setValidator($validator);
    }

    public function store(Request $request){
        $inputs = $request->all();
        if(!$this->validator->inputs($inputs)){
            return $this->response(false, 422);
        }
        return parent::store($request);
    }

    public function update(Request $request, $id){
        return parent::update($request, $id);
    }
}
