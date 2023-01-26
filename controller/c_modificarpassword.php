// Controlador para modificar contraseña //
<?php
include_once '../model/clienteModel.php';
$data = json_decode(file_get_contents("php://input"),true);
session_start();

$cuenta = new clienteModel();

$cuenta->setDniCliente($_SESSION["dni"]);
$cuenta->setPasahitza($data["pasahitza"]);


$list = $cuenta->cambiarpassword();
$response = array();
$response =$list["check"];
echo json_encode($response);

