<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = ['users_id','rooms_id','date_in','date_out'];

    public function room(){
        return $this->belongsTo(Room::class, 'rooms_id'); 
    }


    public function reservation($id){
        return $this->where('rooms_id','=', $id);
    }
}
