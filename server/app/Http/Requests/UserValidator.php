<?php

namespace App\Http\Requests;

use App\Helper;
use App\Http\Requests\ApiValidator;
use Request;
use Auth;


class UserValidator extends ApiValidator
{
    public function getErrors() {
        return parent::getErrors();
    }

    /* validacao de entrada */
    public function inputs($request, $id = null){

        $attibutes = [
            'name' => 'nome',
            'email' => "email",
            'password' => 'senha'
        ];

        switch( strtolower(Request::method()) ){
            case 'post':                
                $dados = [
                    'name' => 'required',
                    'email' => "required|unique:users,email,max:100",
                    'password' =>  'required',
                ];
                break;
            case 'put':
                $dados = [
                    'email' => "unique:users,email,{$id}|max:100",
                ];
            break;
            default;
                exit();
            break;
        }

        if( !array_key_exists('password', $request ) ){
            unset( $dados['password'] );
        }

        return ($this->valid($request, $dados, $attibutes));
    }

}
