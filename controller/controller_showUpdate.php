<?php
include_once '../model/clienteModel.php';

$cliente  = new clienteModel();

$response = array();


$dniCliente = filter_input(INPUT_GET, "dniCliente");


if ($dniCliente !=null) {
    $cliente ->setdniCliente($dniCliente) ;
    
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