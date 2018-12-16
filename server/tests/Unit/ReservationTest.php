<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ReservationTest extends TestCase
{

    private function getAuth()
    {
        $response = $this->json(
            'POST',
            '/oauth/token',
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

    public function testCreateReservation()
    {
        $auth = $this->getAuth();
        $post = factory(\App\Reservation::class)->make();
        $response = $this->withHeaders(['Authorization' => "{$auth->token_type} {$auth->access_token}"])
            ->json('POST', 'api/reservations', $post->toArray());
        $response->assertStatus(201);
        \App\Reservation::latest()->first()->delete();
    }


    public function testValidationFormatDate()
    {
        $auth = $this->getAuth();
        $post = factory(\App\Reservation::class)->make(['date_in' => '2018-00-04 18:00:00']);
        $response = $this->withHeaders(['Authorization' => "{$auth->token_type} {$auth->access_token}"])
            ->json('POST', 'api/reservations', $post->toArray());
        $response->assertStatus(422)->assertJson([
            "status" => false,
            "code" => 10,
            "description" => [
                "A data indicada para o campo horário de entrada não respeita o formato Y-m-d H:i:s."
            ] 
        ]);
        
    }

    public function testValidationRoomId()
    {
        $auth = $this->getAuth();
        $post = factory(\App\Reservation::class)->make(['rooms_id' => '']);
        $response = $this->withHeaders(['Authorization' => "{$auth->token_type} {$auth->access_token}"])
            ->json('POST', 'api/reservations', $post->toArray());
        $response->assertStatus(422);
        
    }

    public function testValidationAlreadyReservationed()
    {
        $auth = $this->getAuth();
        $reservation = factory(\App\Reservation::class)->create([
            'users_id' => 1
        ]);
        $post = factory(\App\Reservation::class)->make();
        $response = $this->withHeaders(['Authorization' => "{$auth->token_type} {$auth->access_token}"])
            ->json('POST', 'api/reservations', $post->toArray());
        
        $response->assertStatus(422)->assertJson([
            "status" => false,
            "code" => 21,
            "description" => "horário já reservado"
        ]);

        $reservation->delete();
        
    }

    public function testDeleteReservation()
    {
        $auth = $this->getAuth();
        $reservation = factory(\App\Reservation::class)->create([
            'users_id' => 1
        ]);

        $response = $this->withHeaders(['Authorization' => "{$auth->token_type} {$auth->access_token}"])
            ->json('DELETE', '/api/reservations/' . $reservation->id);

        $response->assertStatus(200)->assertJson($reservation->toArray());
    }

    public function testValidationDeleteReservation()
    {
        $auth = $this->getAuth();
        $reservation = factory(\App\Reservation::class)->create([
            'users_id' => 2
        ]);

        $response = $this->withHeaders(['Authorization' => "{$auth->token_type} {$auth->access_token}"])
            ->json('DELETE', '/api/reservations/' . $reservation->id);

        $response->assertStatus(403);

        $reservation->delete();
    }

}
