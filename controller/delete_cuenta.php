<?php
require_once '../model/cuenta_corrienteModel.php';

$data = json_decode($_GET['value']);

$response = array();
$cuenta = new cuenta_corrienteModel();
$cuenta->setIban($data->iban);
$response["error"] = $cuenta->deleteCuenta();;

echo json_encode($response);
unset($cuenta);
?>



 