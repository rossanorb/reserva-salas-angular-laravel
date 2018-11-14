<?php


       $json = json_encode([
                'grant_type' => 'password',
                'client_id' => '2',
                'client_secret' => '2AnZdxrcgFiM10hcRRtVD6dniM9MXNF7FL1tIRWn',
                'username' => 'rossanorb@gmail.com',
                'password' => '102030'
              ]);

       $ch = curl_init('http://api.agendamento-salas.com/oauth/token');
       curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
       curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
       curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
       curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
       curl_setopt($ch, CURLOPT_HTTPHEADER, [
           'Content-Type: application/json',
           'Content-Length: ' . strlen($json)
         ]
       );
       $result = curl_exec($ch);

	     $result = json_decode($result);

	     var_dump($result->access_token);
