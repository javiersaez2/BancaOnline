<?php
include_once '../model/clienteModel.php';

$data=json_decode($_GET["data"]);

$user = new clienteModel();
$user->izena=$data->izena;
$user->pass=$data->pasahitza;
$user->codSecreto=$data->codSecreto;

$list = $user->setUserData();
$response = array();

if ($list["check"] == 0) {
    
    $response["error"] = "WRONG USERNAME";
    
} else {
    if ($list["check"] == 1){
        if (!isset($_SESSION)){
            session_start();
        }
        $_SESSION["izena"]=$data->izena;
        $_SESSION["tipo"]=$list["tipo"];
        
        $response["error"] = "no error";
        $response["izena"]=$_SESSION['izena'];
        $response["tipo"]=$_SESSION["tipo"];
    }
    else if ($list["check"] == -1){
        $response["error"] = "WRONG PASSWORD";
    } else if ($list["check"] == -2){
        $response["error"] = "WRONG SECRET CODE";
    }
}

echo json_encode($response);
	
	
