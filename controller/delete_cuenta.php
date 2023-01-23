<?php
require_once '../model/cuenta_corrienteModel.php';
require_once '../model/cuenta_movimientoModel.php';

$data = json_decode(file_get_contents("php://input"),true);

$response = array();
$movimiento = new cuenta_movimientoModel();
$movimiento->setIban($data["iban"]);
$response["error"] = $movimiento->deleteMovimimientosByIban();;

$cuenta = new cuenta_corrienteModel();
$cuenta->setIban($data["iban"]);
$response["error"] = $cuenta->deleteCuenta();;



echo json_encode($response);
unset($cuenta);
?>



 