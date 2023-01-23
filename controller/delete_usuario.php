
<?php
require_once '../model/clienteModel.php';
require_once '../model/cuenta_corrienteModel.php';

$data = json_decode(file_get_contents("php://input"),true);

$response = array();
session_start();


if ($_SESSION["dni"]==$data["dniCliente"]){
    $response["error"]="No puedes borrar tu usuario";
}
else{
    $movimiento = new cuenta_corrienteModel();
    $movimiento->setdniCliente($data["dniCliente"]);
    $response["error"]=$movimiento->deletemovimientos();

$cuenta = new cuenta_corrienteModel();
$cuenta->setdniCliente($data["dniCliente"]);
$cuenta->deleteCuentaByIdCliente();



$cliente = new clienteModel();
$cliente->setdniCliente($data["dniCliente"]);
$response["error"] = $cliente->deleteCliente();

    echo json_encode($response);
    unset($cuenta);
    unset($cliente);
}
?>



 