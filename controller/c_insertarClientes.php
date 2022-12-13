<?php
include_once '../model/clienteModel.php';

$data=json_decode(file_get_contents("php://input"),true);

$nombre = $data["nombre"];
$pasahitza = $data["contrasena"];
//var_dump($nombre+' '+$pasahitza);

$cliente = clienteModel();
$response = array();


if (isset($nombre) && isset($pasahitza)){

    $response["error"] = 'Informacion vacia';

} else {    
    
    $cliente->setNombre($nombre);
    $cliente->setPasahitza($pasahitza);

    $response["list"]=$cliente->insert();
    $response["error"] = 'no error';
    
}

echo json_encode($response);
unset($cliente);
