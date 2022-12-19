<?php
include_once '../model/clienteModel.php';
include_once '../model/cuenta_corrienteModel.php';

$data=json_decode($_GET['value']);

$response = array();
$cliente = new clienteModel();
$cuenta = new cuenta_corrienteModel();

$cliente->dniCli=$data->dniCliente;

$cuenta->selectIban();
$cuenta->setdniCliente($data->dniCliente);
$cuenta->setTitular($cliente->selectClienteById());
$cuenta->setSaldo(0);
$response["error"] = $cuenta->insert();

echo json_encode($response);
unset($cliente);
unset($cuenta);
