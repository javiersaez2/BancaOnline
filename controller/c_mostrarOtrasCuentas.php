<?php
include_once '../model/cuenta_corrienteModel.php';

$data = json_decode(file_get_contents("php://input"),true);

$response = array();
$cuenta = new cuenta_corrienteModel();

$cuenta->setDniCliente($data["dniCliente"]);

$response["list"] = $cuenta->cuentasTransferibles();
$response["error"] = "no error";


echo json_encode($response);
unset($response);
?>