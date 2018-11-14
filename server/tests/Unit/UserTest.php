<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
//use Illuminate\Foundation\Testing\DatabaseMigrations;

class UserTest extends TestCase
{
     //use DatabaseMigrations;

     public function testUserAuthentication(){

       $user = factory(\App\User::class)->create([
         'name' => 'teste',
         'email' => 'teste@teste.com.br',
         'password' => bcrypt(102030)
       ]);

        $response = $this->json('POST', '/oauth/token',
         [
           'grant_type' => 'password',
           'client_id' => '2',
           'client_secret' => 'tNEfs16Zhwcj1NlPVGyw8g7g0khnqxoDlUSOVWEW',
           'username' => $user->email,
           'password' => 102030
         ]
       );
       $response->assertStatus(200);
       \App\User::latest()->first()->delete();
     }

     private function getAuth($email = null){
        $username = 'rossanorb@gmail.com' ?? $email;

         $response = $this->json('POST', '/oauth/token',
          [
            'grant_type' => 'password',
            'client_id' => '2',
            'client_secret' => 'tNEfs16Zhwcj1NlPVGyw8g7g0khnqxoDlUSOVWEW',
            'username' => $username,
            'password' => 102030
          ]
        );
        return json_decode($response->getContent());
     }

     public function testCreateUSer()
     {
         $auth = $this->getAuth();
         $data = factory(\App\User::class)->make();
         $send = $data->toArray();
         $send['password'] = bcrypt(102030);

         $response = $this->withHeaders(['Authorization'=>"{$auth->token_type} {$auth->access_token}"])
                          ->json('POST', 'api/users', $send);

         $response->assertStatus(200)->assertJson($data->toArray());

         \App\User::latest()->first()->delete();
     }

     public function testListUser(){
        $data = \App\User::offset(0)->limit(20)->get();
        $auth = $this->getAuth();
        $response = $this->withHeaders(['Authorization'=>"{$auth->token_type} {$auth->access_token}"])->get('/api/users');

        $response->assertStatus(200)
                  ->assertJson(['data'=> $data->toArray()]);
     }

     public function testUpdateUser(){
         $user = factory(\App\User::class)->create(['name'=>'Roberta','email'=>'roberta@dominio.com','password'=>bcrypt(102030)]);         
         $auth = $this->getAuth($user->toArray()['email']);
         $toUpdate = ['email' => 'email_updated@dominio.com.br'];
         $response = $this->withHeaders(['Authorization'=>"{$auth->token_type} {$auth->access_token}"])
                          ->json('PUT', '/api/users/'.$user->id, $toUpdate);

         $response->assertStatus(200)->assertJson($toUpdate);
         $user->delete();
     }

     public function testDeleteUser(){
         $auth = $this->getAuth();
         $user = factory(\App\User::class)->create();

         $response = $this->withHeaders(['Authorization'=>"{$auth->token_type} {$auth->access_token}"])
                          ->json('DELETE', '/api/users/'.$user->id);

         $response->assertStatus(200)->assertJson($user->toArray());
     }

     public function testUniqueEmailValidationUser(){        
        $data = factory(\App\User::class)->make();
        $send = $data->toArray();
        $auth = $this->getAuth($send['email']);
        $send['password'] = bcrypt(102030);
        $response = $this->withHeaders(['Authorization'=>"{$auth->token_type} {$auth->access_token}"])->json('POST', 'api/users', $send);
        $response = $this->withHeaders(['Authorization'=>"{$auth->token_type} {$auth->access_token}"])->json('POST', 'api/users', $send);

        $st = $response->assertStatus(422)->assertJson([
                'status' => false,
                'code'=> 10,
                'description' => ["O valor indicado para o campo email já se encontra utilizado."]
            ]);


        \App\User::latest()->first()->delete();

     }


}
