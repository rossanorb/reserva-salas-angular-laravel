<?php

namespace App\Http\Requests;

use App\Http\Requests\ApiValidator;
use Request;
use Auth;

class RoomValidator extends ApiValidator
{
    public function getErrors() {
        return parent::getErrors();
    }

    public function inputs($request, $id = null)
    {

        $attibutes = [
            'name' => 'nome',
            'number' => 'número',
        ];

        switch( strtolower(Request::method()) ){
            case 'post':
                $dados = [
                    'name' => 'required|unique:rooms,name',
                    'number' =>  'required|numeric|unique:rooms,number',
                ];
                break;
            case 'put':                
                $dados = [
                    'number' =>  "numeric|unique:rooms,number,{$id}",
                ];
            break;
            default;
                exit();
            break;
        }
        
        return ($this->valid($request, $dados, $attibutes));
    }

}
