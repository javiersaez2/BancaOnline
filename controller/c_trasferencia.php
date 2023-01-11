<?php

include_once '../model/cuenta_corrienteModel.php';
include_once '../model/cuenta_movimientoModel.php';

$data = json_decode(file_get_contents("php://input"),true);

$response = array();

$ibanEmisor = $data["ibanEmisor"]
$ibanReceptor = $data["ibanReceptor"]
$saldo = $data["saldo"]

$cuenta = new cuenta_corrienteModel();


if (isset($saldo)) {

    $cuenta->setSaldo($saldo);
    $cuenta->setIban($ibanEmisor);
    
    if ($cuenta->retirar()){

        $cuentaMovimiento = new cuenta_movimientoModel();
        
        $cuentaMovimiento->setIban(ibanEmisor);
        $cuentaMovimiento->setSaldo($saldo);

        $cuentaMovimiento->movimientoRealizado();
        

        $cuenta->setIban($ibanReceptor);
        
        if($cuenta->ingresar()){
            $cuentaMovimiento->setIban($ibanReceptor);
            $response["error"]= $cuentaMovimiento->movimientoRealizado();
        }
    } 
} else{
    $response["error"] = 'Sin saldo';
}

echo json_encode($response);
?>