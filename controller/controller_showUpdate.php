<?php
include_once '../model/clienteModel.php';

$cliente  = new clienteModel();

$response = array();


$idCliente = filter_input(INPUT_GET, "idCliente");


if ($idCliente !=null) {
    $cliente ->setIdCliente($idCliente) ;
    
    if($cliente ->showUpdate()){
        $response['cliente'] = $cliente;
        $response['error'] = "no error";
    }
    else{
        $response['error'] = "error";
    }
    
}
else{
    $response['error']="error";
}

echo json_encode($response);
unset($response);



?>