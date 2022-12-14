<?php
require_once '../model/userModel.php';

session_start();

$response=array();

if ((isset($_SESSION['userName']))){
    
    $response['userName']= $_SESSION['userName'];
    $response['error']="logged";
    
} else{
    $response['error']="You are not logged";
}
echo json_encode($response);
