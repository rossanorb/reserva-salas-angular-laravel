<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    protected $validator;
    protected $result;
    protected $http_status;
    protected $message;
    protected $error_code;

    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function setValidator($validator)
    {
        $this->validator = $validator;
    }

    protected function getErro($code)
    {
        $this->errors = config('config.errors');
        $this->error_code = $code;
        return $this->errors[$code];
    }

    public function setError($message){
        $this->message = $message;        
    }

    protected function index(Request $request)
    {
        $limit = $request->all()['limit'] ?? 20;
        $order = $request->all()['order'] ?? null;

        if($order !== null){
            $order = explode(',',$order);
        }

        $order[0] = $order[0]  ?? 'id';
        $order[1] = $order[1] ?? 'asc';

        $where = $request->all()['where'] ?? [];

        $like = $request->all()['like'] ?? null;
        if($like){
            $like = explode(',',$like);
            $like[1] = '%'.$like[1].'%';
        }

        $result = $this->model->orderBy($order[0],$order[1])
            ->where(function($query) use ($like){
                if($like){
                    return $query->where($like[0], 'like', $like[1]);
                }
                return $query;
            })
            ->where($where)
            ->with($this->relationships())
            ->paginate($limit);

        return response()->json($result);
    }

    protected function relationships(){
        if(isset($this->relationships)){
            return $this->relationships;
        }
        return [];
    }

    protected function store(Request $request)
    {
        $result = $this->model->create($request->all());
        return response()->json($result);
    }


    protected function show($id)
    {
        $result = $this->model->find($id);
        if(!$result){
            $this->setError($this->getErro(20));
            return $this->response(false,404);
        }

        $result = $this->model->with($this->relationships())->findOrFail($id);
        return response()->json($result);
    }

    protected function update(Request $request, $id)
    {
        $result = $this->model->find($id);
        if(!$result){
            $this->setError($this->getErro(20));
            return $this->response(false,404);
        }
        
        $inputs = $request->all();
        if(!$this->validator->inputs($inputs, $id)){
            return $this->response(false, 422);
        }        

        $result->update($request->all());
        return response()->json($result);
    }

    protected function destroy($id)
    {
        $result = $this->model->findOrFail($id);
        $result->delete();
        return response()->json($result);
    }

    protected function response($status, $http_status = 200 ){
        //$result = isset($this->result) ? $this->result : NULL;
        $http_status = isset($this->http_status) ? $this->http_status : $http_status;

        /*validacao de dados de entrada */
        if ($this->validator && !is_null($this->validator->getErrors())) {
                $description = $this->validator->getErrors();
                $code = $this->validator->getErrorCode();

        }elseif($this->message){
                $code = $this->error_code;
                $description = $this->message;
        }

        $retorno = [
            'status' => $status,
            'code' => $code,
            'description' => $description
        ];

        return response()->json($retorno, $http_status, [JSON_HEX_QUOT, JSON_HEX_TAG])->header('Content-Type', 'application/json; charset=UTF8');
    }
}
