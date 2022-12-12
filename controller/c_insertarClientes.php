<?php
include_once '../model/clienteModel';

$data=json_decode(file_get_contents("php://input"),true);

$nombre = $data["nombre"];
$pasahitza = $data["contrasena"];
$pasahitza2 = $data["contrasena2"];

$cliente = clienteModel();
$response = array();

if (isset($nombre) && isset($pasahitza) && isset($pasahitza2)){

    $response["error"] = 'Informacion vacia';

} else{    
    
    if ($pasahitza != $pasahitza2){
        $response["error"] = 'Claves no identicas';

    } else {
        $cliente->setNombre($nombre);
        $cliente->setPasahitza($pasahitza);

        $response["data"]=$cliente->insert();
        $response["error"] = 'no error'

    }
}

echo json_encode($response);
unset($cliente);
