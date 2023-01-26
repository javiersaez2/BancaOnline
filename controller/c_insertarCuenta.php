<?php
include_once '../model/cuenta_corrienteModel.php';

$data = json_decode(file_get_contents("php://input"),true);

$response = array();
$cuenta = new cuenta_corrienteModel();

$cuenta->selectIban();
$cuenta->setdniCliente($data["dniCliente"]);
$cuenta->setTitular($data["nombre"]);
$cuenta->setSaldo(0);
$response["error"] = $cuenta->insert();

echo json_encode($response);
unset($cuenta);
?>
