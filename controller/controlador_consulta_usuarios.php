<?php
include_once '../model/clienteModel.php';

$response=array();
    
$cliente=new clienteModel();
    
$response['list']= $cliente->setList();
$response['error']='no error';
    
echo json_encode($response);
    
unset($response);