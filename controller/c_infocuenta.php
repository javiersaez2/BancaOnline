<?php 
include_once '../model/clienteModel.php';
session_start();

$response=array();
    
$cuenta=new clienteModel();
$cuenta->setDniCliente($_SESSION["dni"]);
$cuenta->selectClienteById() ;
$response['list']=$cuenta->ObjVars() ;
$response['error']='no error';
    
echo json_encode($response);
    
unset($response);