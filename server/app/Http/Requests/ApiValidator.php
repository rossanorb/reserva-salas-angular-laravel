<?php
namespace App\Http\Requests;
use Illuminate\Support\Facades\Validator;

class ApiValidator{
    protected $errors;
    protected $error_code;


    private function setErrorCode(){
        $errors = config('config.errors');
        $this->error_code = array_search('FORM_VALIDATION', $errors,true);
    }

    public function getErrorCode(){
        if (!filter_var($this->error_code, FILTER_VALIDATE_INT) === true) {
            return 0;
        }
        return $this->error_code;
    }

    private function setErrors($errors){
        $this->setErrorCode();
        $this->errors = $errors;
    }

    protected function getErrors(){
        $this->setErrorCode();
        return $this->errors;
    }

    private function attachMessageError()
    {
        $this->validator->after(function ($validator) {
            if ($validator->errors()->all()) {
                if (isset($this->field) && isset($this->message)) {
                    $validator->errors()->add($this->field, $this->message);
                }
            }
        });
    }    

    protected function valid($request, $dados, $attibutes = [], $messages = []){
    	$this->validator = Validator::make($request, $dados, $messages);
            $this->validator->setAttributeNames($attibutes);
            $this->attachMessageError();
            if ($this->validator->passes()) {
                return true;
            } else {
                $this->setErrors($this->validator->errors()->all());
                return false;
            }

            return false;
    }
}
