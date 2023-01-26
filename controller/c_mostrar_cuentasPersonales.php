// Mostra las cuentas del usuario y los movimientos (transferir, retirar y ingresar) //
<?php
include_once '../model/cuenta_corrienteModel.php';
session_start();

$response=array();
    
$cuenta=new cuenta_corrienteModel();
$cuenta->setDniCliente($_SESSION["dni"]);
    
$response['list']= $cuenta->setListCuenta();
$response['error']='no error';
    
echo json_encode($response);
    
unset($response);