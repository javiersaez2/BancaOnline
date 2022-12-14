<?php
include_once '../model/clienteModel.php';

session_start();

$response=array();

if ((isset($_SESSION['izena']))){
    
    $response['izena']= $_SESSION['izena'];
    $response['tipo']= $_SESSION['tipo'];
    $response['error']="logged";
    
} else{
    $response['error']="You are not logged";
}
echo json_encode($response);
