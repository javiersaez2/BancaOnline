<?php
include_once '../model/clienteModel.php';
$data = json_decode(file_get_contents("php://input"),true);

$cliente  = new clienteModel();
$response=array();

$cliente -> setDniCliente($data["dniCliente"]);
    
$response['list']= $cliente->setListByDni();
$response['error']='no error';
    
echo json_encode($response);
    
unset($response);