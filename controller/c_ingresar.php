<?php
include_once '../model/movimientoModel.php';
include_once '../model/cuenta_movimientoModel.php';

$data = json_decode(file_get_contents("php://input"),true);

$response = array();
$movimiento = new movimientoModel();

$movimiento->setTipoMovimiento($data["tipo"]);
$movimiento->setConcepto($data["concepto"]);
$response["error"] = $movimiento->insert();


$cuentaMovimiento = new cuenta_movimientosModel();
$cuentaMovimiento->setIban($data["iban"]);
$cuentaMovimiento->setIdMovimiento($movimiento->insert());
$cuentaMovimiento->setFecha(getdate());
$cuentaMovimiento->setCantidad($data["cantidad"]);
$response["error"] = $cuentaMovimiento->insert();



echo json_encode($response);
unset($cuenta);

?>