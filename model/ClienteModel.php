<?php
require_once  'connect_data.php';
require_once  'clienteClass.php';

class ClienteModel extends Clienteclass{
    
    public $link;
    public $objCustomer;
    
    
    public function getObjCustomer()
    {
        return $this->objCustomer;
    }


    public function setObjCustomer($objCustomer)
    {
        $this->objCustomer = $objCustomer;
    }


    ////////////////////////////////////////////////
    public function OpenConnect()
    {
        $konDat=new connect_data();
        try
        {
            $this->link=new mysqli($konDat->host,$konDat->userbbdd,$konDat->passbbdd,$konDat->ddbbname);
        }
        catch(Exception $e)
        {
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8"); // honek behartu egiten du aplikazio eta
        //                  //databasearen artean UTF -8 erabiltzera datuak trukatzeko
    }
    
    public function CloseConnect()
    {
        mysqli_close ($this->link);
        
    }

    public function setList()
    {
        $this->OpenConnect();
        $sql="select * from cliente";
        
        $list=array();
        
        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {         
            $newCliente=new ClienteModel();
            $newCliente->idCliente=$row['idCliente'];
            $newCliente->nombre=$row['nombre'];
            $newCliente->pasahitza=$row['pasahitza'];
            $newCliente->secreto=$row['secreto'];
            $newCliente->tipo=$row['tipo'];
            
            array_push($list, $newCliente);    
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }
    
   

    
   
}
