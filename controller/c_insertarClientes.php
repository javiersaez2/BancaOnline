<?php
include_once '../model/clienteModel.php';
include_once '../model/cuenta_corrienteModel.php';

$data=json_decode($_GET['value']);

$nombre = $data->nombre;
$pasahitza = $data->contrasena;
$dniCliente = $data->dni;
$tipo = $data->tipo;

//var_dump($nombre+' '+$pasahitza);

$cliente = new clienteModel();
$response = array();


if (!isset($nombre) && !isset($pasahitza) && !isset($dniCliente)){

    $response["error"] = 'Informacion vacia';

} else {    
    
    $cliente->setDniCliente($dniCliente);
    $cliente->setNombre($nombre);
    $cliente->setPasahitza($pasahitza);
    $cliente->setTipo($tipo);
    
    $response["error"]=$cliente->insert();

    $cuenta = new cuenta_corrienteModel();
    $cuenta->selectIban();
    $cuenta->setdniCliente($cliente->getdniCliente());
    $cuenta->setTitular($cliente->getNombre());
    $cuenta->insert();

    $cuenta2 = new cuenta_corrienteModel();
    $cuenta2->selectIban();
    $cuenta2->setdniCliente($cliente->getdniCliente());
    $cuenta2->setTitular($cliente->getNombre());
    $cuenta2->insert();
    
}

echo json_encode($response);
unset($cliente);
unset($cuenta);
unset($cuenta2);
