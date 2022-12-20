<?php

include_once '../model/clienteModel.php';
$data=json_decode($_GET['value']);

$cliente  = new clienteModel();

$response = array();

$dniCliente = $data->dniCliente;
$nombre = $data->nombre;
$pasahitza = $data->pasahitza;


if (isset($dniCliente)) {
    $cliente ->setdniCliente($dniCliente) ;
   if($nombre != null){
       $cliente->setNombre($nombre);
   }
   if($pasahitza != null){
       $cliente->setPasahitza($pasahitza);
   }
  
  
   
   $response['error'] = $cliente->update();//call to the model
   
}
else{
    $response['error']="Ez de id pasatu/No se ha pasado id";
}

echo json_encode($response);


?>