<?php

include_once '../model/ClienteModel.php';

$response=array();
    
$cliente=new ClienteModel();
    
$response['list']= $cliente->setList();
$response['error']='no error';
    
echo json_encode($response);
    
unset($response);