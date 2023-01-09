<?php
include_once '../model/cuenta_corrienteModel.php';

$response=array();
    
$cuenta=new cuenta_corrienteModel();
$cuenta->dni=$_SESSION["dni"];
    
$response['list']= $cuenta->setListCuentasPersonales();
$response['error']='no error';
    
echo json_encode($response);
    
unset($response);