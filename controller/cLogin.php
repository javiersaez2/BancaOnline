<?php
include_once '../model/clienteModel.php';

$data=json_decode($_GET["data"]);

$user = new clienteModel();
$user->izena=$data->izena;
$user->pass=$data->pasahitza;

$list = $user->setUserData();
$response = array();

if ($list["check"] == 0) {
    
    $response["error"] = "WRONG USERNAME";
    
} else {
    if ($list["check"] == 1){
        if (!isset($_SESSION)){
            session_start();
        }
        $_SESSION["izena"]=$data["izena"];
        
        $response["error"] = "no error";
        $response["izena"]=$_SESSION['izena'];
        $response["tipo"]=$list["tipo"];
    }
    else if ($list["check"] == -1){
        $response["error"] = "WRONG KEYWORDS";
    }
}

echo json_encode($response);
	
	
