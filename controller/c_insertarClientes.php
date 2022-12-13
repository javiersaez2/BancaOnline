<?php
include_once '../model/clienteModel.php';

$data=json_decode($_GET['value']);

$nombre = $data->nombre;
$pasahitza = $data->contrasena;
$dniCliente = $data->dni;

//var_dump($nombre+' '+$pasahitza);

$cliente = new clienteModel();
$response = array();


if (!isset($nombre) && !isset($pasahitza) && !isset($dniCliente)){

    $response["error"] = 'Informacion vacia';

} else {    
    
    $cliente->setDniCliente($dniCliente);
    $cliente->setNombre($nombre);
    $cliente->setPasahitza($pasahitza);

    $response["list"]=$cliente->insert();
    $response["error"] = 'no error';
    
}

echo json_encode($response);
unset($cliente);
