<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationValidator;
use App\Reservation;
use Auth;

class ReservationController extends Controller
{
    protected $model;
    protected $relationships = ['room'];
    protected $validator;

    public function __construct(Reservation $model, ReservationValidator $validator ){
        $this->model = $model;
        parent::setValidator($validator);
    }

    private function getReservations($date){
        $date = \DateTime::createFromFormat('d-m-Y', $date)->format('Y-m-d');
        $fromDate =  $date.' 00:00:00'; // $fromDate =  $date.date('Y-m-d' . ' 00:00:00', time());
        $toDate = $date.' 24:00:00'; // $toDate   =  $date.date('Y-m-d' . ' 24:00:00', time());

        return Reservation::
            whereBetween('date_in',[$fromDate, $toDate])
            ->orWhere(function($query) use ($fromDate, $toDate) {
                $query->whereBetween('date_out',[$fromDate, $toDate]);
            })
            ->with($this->relationships())
            ->get();
    }

    public function mades($date){
        $reservations = $this->getReservations($date);
        return response()->json($reservations);
    }

    public function make(Request $request){
        $inputs = $request->all();
        
        if(!$this->validator->room($inputs)){
            return $this->response(false, 422);
        }
        
        if(!$this->validator->dates($inputs)){
            return $this->response(false, 422);
        }
        

        if(strlen( $inputs['date_in'] ) === 19){
            $fromDate = substr( $inputs['date_in'] ,0 ,18) . '1';
        }
        if(strlen( $inputs['date_out'] ) === 19){
            $toDate = substr( $inputs['date_out'] ,0 ,18) . '1';
        }

        \Log::debug($fromDate);
        \Log::debug($toDate);

        $sql = "
        SELECT
        reservations.*,
        rooms.name as room,
        rooms.number as number
        from reservations
        join rooms on (rooms.id = reservations.rooms_id)
        where 
        '$fromDate' BETWEEN date_in AND date_out  OR '$toDate' BETWEEN date_in AND date_out
    
        UNION
    
        SELECT
            reservations.*,
            rooms.name as room,
            rooms.number as number
            from reservations
            join rooms on (rooms.id = reservations.rooms_id)
            where 
        date_in BETWEEN  '$fromDate' AND '$toDate' OR date_out BETWEEN '$fromDate' AND '$toDate'        
        ";

        \Log::info($sql);


        $reservations = \DB::select($sql);


        if( count($reservations) == 0 ){

            $reservation = Reservation::create([
                'users_id' => Auth::user()->id,
                'date_in' => $inputs['date_in'],
                'date_out' => $inputs['date_out'],
                'rooms_id' => $inputs['rooms_id']
            ]);

            $this->message = $reservation;
            return $this->response(true, 201);
       

            return response()->json($reservations, 200, [JSON_HEX_QUOT, JSON_HEX_TAG])->header('Content-Type', 'application/json; charset=UTF8');

        } else {
            $this->setError( $this->getErro(21));
            return $this->response(false, 422);
        }

        
    }


}
