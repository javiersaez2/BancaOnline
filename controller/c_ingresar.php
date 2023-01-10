<?php
include_once '../model/movimientoModel.php';
include_once '../model/cuenta_movimientoModel.php';
include_once '../model/cuenta_corrienteModel.php';

$data = json_decode(file_get_contents("php://input"),true);
$response = array();

$movimiento = new movimientoModel();
$movimiento->setTipoMovimiento($data["tipo"]);
$movimiento->setConcepto($data["concepto"]);
$response["movimiento"] = $movimiento->insert();

$id = $movimiento->selectIid();

$cuentaMovimiento = new cuenta_movimientosModel();
$cuentaMovimiento->setIban($data["iban"]);
$cuentaMovimiento->setIdMovimiento($id);
$cuentaMovimiento->setCantidad($data["cantidad"]);
$response["cuentaMov"] = $cuentaMovimiento->insert();

$cuenta = new cuenta_corrienteModel();
$cuenta -> setSaldo($data["cantidad"]);
$cuenta -> setIban($data["iban"]);


echo json_encode($response);

?>