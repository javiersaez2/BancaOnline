<?php
include_once '../model/cuenta_movimientoModel.php';
$data = json_decode(file_get_contents("php://input"),true);

$response = array();
$cuenta = new cuenta_movimientoModel();

$cuenta->setIban($data["iban"]);

$response["list"] = $cuenta->movimientosCuenta();

echo json_encode($response);
unset($response);

