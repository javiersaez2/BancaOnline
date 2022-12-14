
<?php
require_once '../model/clienteModel.php';

$dniCliente = $_GET['value'];
//echo $dniCliente;
$cliente = new clienteModel();
$cliente->setdniCliente($dniCliente);
$cliente->delete();
unset($cliente);

?>



 