<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserValidator;

class UsersController extends Controller
{
  protected $model;


  public function __construct(\App\User $model, UserValidator $validator ){
      $this->model = $model;
      parent::setValidator($validator);
  }

  public function store(Request $request){
      $inputs = $request->all();

      if(!$this->validator->inputs($inputs)){
          return $this->response(false, 422);
      }

      $request['password'] = bcrypt($request['password']);
      return parent::store($request);
  }

  public function update(Request $request,$id){
        if( array_key_exists('password', $request->all() ) ){            
            $request['password'] = bcrypt($request['password']);
        }else{
            unset( $request['password'] );
        }

        return parent::update($request,$id);
  }

}
