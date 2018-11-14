<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RoomTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    private function getAuth(){
        $response = $this->json('POST', '/oauth/token',
         [
           'grant_type' => 'password',
           'client_id' => '2',
           'client_secret' => 'tNEfs16Zhwcj1NlPVGyw8g7g0khnqxoDlUSOVWEW',
           'username' => 'rossanorb@gmail.com',
           'password' => 102030
         ]
       );
       return json_decode($response->getContent());
    }

    public function testCreateRoom(){
        $auth = $this->getAuth();
        $data = factory(\App\Room::class)->make();
        $send = $data->toArray();        
        $response = $this->withHeaders(['Authorization'=>"{$auth->token_type} {$auth->access_token}"])->json('POST', 'api/room', $send);
        $response->assertStatus(200)->assertJson($data->toArray());
        \App\Room::latest()->first()->delete();
    }

    public function testListRoom(){
        $auth = $this->getAuth();
        $data = \App\Room::offset(0)->limit(20)->get();
        $response = $this->withHeaders(['Authorization'=>"{$auth->token_type} {$auth->access_token}"])->get('/api/room');
        $response->assertStatus(200)->assertJson(['data'=> $data->toArray()]);
    }

    public function testUpdateRoom(){
        $auth = $this->getAuth();
        $room = factory(\App\Room::class)->create(['name' => 'Sala Um', 'number' => '1' ]);
        $toUpdate = ['name' => 'Sala Dois', 'number' => 2];

        $response = $this->withHeaders(['Authorization'=>"{$auth->token_type} {$auth->access_token}"])
            ->json('PUT', '/api/room/'.$room->id, $toUpdate);

        $response->assertStatus(200)->assertJson($toUpdate);
        $room->delete();
    }

    public function testDeleteRoom(){
        $auth = $this->getAuth();
        $room = factory(\App\Room::class)->create(['name' => 'Sala Um', 'number' => '1' ]);
        $response = $this->withHeaders(['Authorization'=>"{$auth->token_type} {$auth->access_token}"])
            ->json('DELETE', '/api/room/'.$room->id);
        $response->assertStatus(200)->assertJson($room->toArray());
    }

    /*
        nao permite dois registros com mesmo numero de sala. Validacao deve retornar http status 422
    */
    public function testInserValidation(){
        $auth = $this->getAuth();
        $room = factory(\App\Room::class)->create(['name' => 'Sala Um', 'number' => '1' ]);
        $post = factory(\App\Room::class)->make(['name' => 'Sala Um', 'number' => '1' ]);
        $response = $this->withHeaders(['Authorization'=>"{$auth->token_type} {$auth->access_token}"])->json('POST', 'api/room', $post->toArray());
        $response->assertStatus(422);
        $room->delete();
    }

    public function testUpdateValidation(){
        $auth = $this->getAuth();
        $room = factory(\App\Room::class)->create(['name' => 'Sala Um', 'number' => 1 ]);        
        $response = $this->withHeaders(['Authorization'=>"{$auth->token_type} {$auth->access_token}"])
            ->json('PUT', '/api/room/'.$room->id, ['number' => 1]);
        $response->assertStatus(422);
        $room->delete();
    }

}
