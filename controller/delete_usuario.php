
<?php
require_once '../model/clienteModel.php';

$dniCliente = $_GET['value'];

$cuenta = new cuenta_corrienteModel();
$cuenta->setdniCliente($dniCliente);
$cuenta->deleteCuenta();


$cliente = new clienteModel();
$cliente->setdniCliente($dniCliente);
$cliente->deleteCliente();
unset($cuenta);
unset($cliente);

?>



 