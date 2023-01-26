<?php
include_once '../model/cuenta_movimientoModel.php';
$data = json_decode(file_get_contents("php://input"),true);

$response = array();
$cuenta = new cuenta_movimientoModel();

$cuenta->setIdMovimiento($data["idMovimiento"]);

$response["movTransferencia"] = $cuenta->transferenciaByIdMovimiento();

echo json_encode($response);
unset($response);
