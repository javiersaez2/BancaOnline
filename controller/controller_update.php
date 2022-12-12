<?php

include_once '../model/clienteModel.php';

$cliente  = new clienteModel();

$response = array();

$idCliente = filter_input(INPUT_GET, "idCliente");
$nombre = filter_input(INPUT_GET, "nombre");
$pasahitza = filter_input(INPUT_GET, "pasahitza");



if (isset($idCliente)) {
    $cliente ->setIdCliente($idCliente) ;
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