<?php
include_once '../model/cuenta_corrienteModel.php';

$data=json_decode($_GET['value']);

$response = array();
$cuenta = new cuenta_corrienteModel();

$cuenta->selectIban();
$cuenta->setdniCliente($data->dniCliente);
$cuenta->setTitular($data->nombre);
$cuenta->setSaldo(0);
$response["error"] = $cuenta->insert();

echo json_encode($response);
unset($cuenta);
