<?php
include_once '../model/clienteModel.php';

$data=json_decode(file_get_contents("php://input"),true);

$user = new clienteModel();
$user->nombre=$data['izena'];
$user->pasahitza=$data['pasahitza'];
$check = $user->setUserData();
$response = array();

if ($check == 0) {
    
    $response["error"] = "WRONG USERNAME";
    
} else {
    if ($check == 1){
        if (!isset($_SESSION)){
            session_start();
        }
        $_SESSION["izena"]=$data["izena"];
        
        $response["error"] = "no error";
        $response["izena"]=$_SESSION['izena'];
    }
    else if ($check == -1){
        $response["error"] = "WRONG KEYWORDS";
    }
}

echo json_encode($response);
	
	
