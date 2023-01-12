<?php
include_once '../model/cuenta_corrienteModel.php';

$data = json_decode(file_get_contents("php://input"),true);

$response = array();
$dniCliente=$data["dniCliente"];

if (isset($dniCliente)){

    $cuenta = new cuenta_corrienteModel();

    $cuenta->setDniCliente($dniCliente);

    $response["list"] = $cuenta->cuentasTransferibles();
    $response["error"] = "no error";
    
} else{
    $response["error"] = "Cuentas no encontrada";

}

echo json_encode($response);
unset($cuenta);
?>