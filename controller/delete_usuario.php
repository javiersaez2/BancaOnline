
<?php
require_once '../model/clienteModel.php';
require_once '../model/cuenta_corrienteModel.php';

$data = json_decode(file_get_contents("php://input"),true);

$response = array();
$cuenta = new cuenta_corrienteModel();
$cuenta->setdniCliente($data["dniCliente"]);
$cuenta->deleteCuentaByIdCliente();


$cliente = new clienteModel();
$cliente->setdniCliente($data["dniCliente"]);
$response["error"] = $cliente->deleteCliente();

echo json_encode($response);
unset($cuenta);
unset($cliente);
?>



 