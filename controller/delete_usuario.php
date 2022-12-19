
<?php
require_once '../model/clienteModel.php';
require_once '../model/cuenta_corrienteModel.php';

$dniCliente = $_GET['value'];

$response = array();
$cuenta = new cuenta_corrienteModel();
$cuenta->setdniCliente($dniCliente);
$cuenta->deleteCuentaByIdCliente();


$cliente = new clienteModel();
$cliente->setdniCliente($dniCliente);
$response["error"] = $cliente->deleteCliente();

echo json_encode($response);
unset($cuenta);
unset($cliente);
?>



 