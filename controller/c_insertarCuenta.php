<?php
include_once '../model/clienteModel.php';
include_once '../model/cuenta_corrienteModel.php';

$data=json_decode($_GET['value']);

$cliente = new clienteModel();
$cuenta = new cuenta_corrienteModel();

$cliente->dniCliente=$data->dniCliente;

$response = array();

echo json_encode($response);
unset($cliente);
