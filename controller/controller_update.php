<?php

include_once '../model/clienteModel.php';

$cliente  = new clienteModel();

$response = array();

$dniCliente = filter_input(INPUT_GET, "dniCliente");
$nombre = filter_input(INPUT_GET, "nombre");
$pasahitza = filter_input(INPUT_GET, "pasahitza");



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