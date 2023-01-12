<?php
include_once '../model/movimientoModel.php';
include_once '../model/cuenta_movimientoModel.php';
include_once '../model/cuenta_corrienteModel.php';

$data = json_decode(file_get_contents("php://input"),true);
$response = array();

$ibanEmisor = $data["ibanEmisor"];
$ibanReceptor = $data["ibanReceptor"];
$saldo = $data["saldo"];

$cuenta = new cuenta_corrienteModel();

if (isset($saldo)) {
    $cuenta->setSaldo($saldo);
    $cuenta->setIban($ibanEmisor);


    ///MOVIMIENTO DE RETIRAR
    if ($cuenta->retirar()){

        $movimiento = new movimientoModel();
        $movimiento->setTipoMovimiento("Transferencia");
        $movimiento->setConcepto("Algo");
        $response["movimiento"] = $movimiento->insert();

        $id = $movimiento->selectIid();


        $cuentaMovimiento = new cuenta_movimientosModel();
        $cuentaMovimiento->setIban($ibanEmisor);
        $cuentaMovimiento->setIdMovimiento($id);
        $saldoNegativo = abs($saldo)
        $cuentaMovimiento->setCantidad($saldoNegativo);
        $response["cuentaMov"] = $cuentaMovimiento->insert();


        ///MOVIMIENTO DE INGRESAR
        $cuenta->setIban($ibanReceptor);
        if ($cuenta->ingresar()){
            //$movimiento->setTipoMovimiento("Transferencia");
            //$movimiento->setConcepto("Algo");
            //$response["movimiento"] = $movimiento->insert();


            $cuentaMovimiento->setIban($ibanReceptor);
            $cuentaMovimiento->setIdMovimiento($id);
            $cuentaMovimiento->setCantidad($saldo);
            $response["cuentaMov"] = $cuentaMovimiento->insert();
        }

    } 
} else{
    $response["error"] = 'Sin saldo';
}

echo json_encode($response);
?>