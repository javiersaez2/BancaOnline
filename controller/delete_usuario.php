
<?php
require_once '../model/clienteModel.php';

$idCliente = $_GET['value'];
echo $idCliente;
$cliente = new clienteModel();
$cliente->setIdCliente($idCliente);
$cliente->delete();
unset($cliente);

?>



 