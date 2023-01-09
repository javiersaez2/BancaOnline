<?php
include_once '../model/cuenta_corrienteModel.php';

$response=array();
    
$cuenta=new cuenta_corrienteModel();
$cuenta->setDniCliente($_SESSION["dni"]);
    
$response['list']= $cuenta->setListCuenta();
$response['error']='no error';
    
echo json_encode($response);
    
unset($response);