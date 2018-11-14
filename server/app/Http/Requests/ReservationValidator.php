<?php

namespace App\Http\Requests;

use App\Http\Requests\ApiValidator;

class ReservationValidator extends ApiValidator
{
    public function getErrors() {
        return parent::getErrors();
    }

    public function room($request){
        $attibutes = ['rooms_id' => 'id da sala'];
        $dados = ['rooms_id' =>  "required|numeric"];
        return ($this->valid($request, $dados, $attibutes));
    }

    public function dates($request){
        $attibutes = [
            'date_in' => 'horário de entrada',
            'date_out' => 'horário de saída'
        ];

        $dados = [
            'date_in' =>  'date_format:"Y-m-d H:i:s"|required|before:date_out',
            'date_out' => 'date_format:"Y-m-d H:i:s"|required|after:date_in'
        ];

        return ($this->valid($request, $dados, $attibutes));
    }

}
