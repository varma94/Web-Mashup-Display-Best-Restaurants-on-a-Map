<?php

  // Set your YELP keys here
  $consumer_key = "68DyyPzNtbo51VZwCXwLnQ";
  $consumer_secret = "myvs8mV9wILSoZUrcA1NpmTRVeQ";
  $token = "XQDh9H5r4pDDeIPodyq_v3BRkn0q3W8d";
  $token_secret = "mpqUjrCsE0v_cceu-YzQww3O608";

  require_once ('OAuth.php');
  header("Content-type: application/json\n\n");
  $params = $_SERVER['QUERY_STRING'];
  $unsigned_url = "http://api.yelp.com/v2/search?$params";
  $token = new OAuthToken($token, $token_secret);
  $consumer = new OAuthConsumer($consumer_key, $consumer_secret);
  $signature_method = new OAuthSignatureMethod_HMAC_SHA1();
  $oauthrequest = OAuthRequest::from_consumer_and_token($consumer, $token, 'GET', $unsigned_url);
  $oauthrequest->sign_request($signature_method, $consumer, $token);
  $signed_url = $oauthrequest->to_url();
  $ch = curl_init($signed_url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  $data = curl_exec($ch);
  curl_close($ch);
  print_r($data);

?>
