<?php
include_once '../model/movimientoModel.php';
include_once '../model/cuenta_movimientoModel.php';
include_once '../model/cuenta_corrienteModel.php';

$data = json_decode(file_get_contents("php://input"),true);

$response = array();

$cuenta = new cuenta_corrienteModel();
$cuenta -> setSaldo($data["cantidad"]);
$cuenta -> setIban($data["iban"]);
$probar = $cuenta->retirar();

if ($probar == 0){
    $response["retirar"] = 0;
}else{

    $response["retirar"] = "El saldo ha retirado = ".$data["cantidad"];

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

}



echo json_encode($response);
?>