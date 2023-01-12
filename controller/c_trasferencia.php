<?php
include_once '../model/movimientoModel.php';
include_once '../model/cuenta_movimientoModel.php';
include_once '../model/cuenta_corrienteModel.php';

$data = json_decode(file_get_contents("php://input"),true);
$response = array();

$ibanEmisor = $data["ibanEmisor"];
$ibanReceptor = $data["ibanReceptor"];
$saldo = $data["saldo"];
$concepto = $data["concepto"];


$cuenta = new cuenta_corrienteModel();

if (isset($saldo)) {
    $cuenta->setSaldo($saldo);
    $cuenta->setIban($ibanEmisor);


    ///MOVIMIENTO DE RETIRAR
    if ($cuenta->retirar()==1){

        $movimiento = new movimientoModel();
        $movimiento->setTipoMovimiento("Transferencia");
        $movimiento->setConcepto($concepto);
        $response["movimiento"] = $movimiento->insert();

        $id = $movimiento->selectIid();


        $cuentaMovimiento = new cuenta_movimientosModel();
        $cuentaMovimiento->setIban($ibanEmisor);
        $cuentaMovimiento->setIdMovimiento($id);
        //$saldoNegativo = abs($saldo);
        //$saldoNegativo = gmp_neg("$saldo");
        //var_dump($saldoNegativo);
        $saldoNegativo = -$saldo;
        $cuentaMovimiento->setCantidad($saldoNegativo);
        $response["cuentaMov"] = $cuentaMovimiento->insert();


        ///MOVIMIENTO DE INGRESAR
        $cuenta->setIban($ibanReceptor);
        if ($cuenta->ingresar()){
            $cuentaMovimiento->setIban($ibanReceptor);
            $cuentaMovimiento->setIdMovimiento($id);
            $cuentaMovimiento->setCantidad($saldo);
            $response["cuentaMov"] = $cuentaMovimiento->insert();
            $response["error"] = "Completado";

        }

    } else {
        $response["error"] = 'Insuficiente';
    }
} else {
    $response["error"] = 'Por favor; introduce Saldo';
}

echo json_encode($response);
?>