<?php
require_once  'connect_data.php';
require_once  'clienteClass.php';

class clienteModel extends clienteclass{
    
    private $link;       
    

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
            
            array_push($list, get_object_vars($newCliente));    
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }
    
   

    public function delete()
    {
         $this->OpenConnect();
        //  $idCliente= $this-> idCliente;
         $sql="delete from cliente where cliente.idCliente=2";
          
         $this->link->query($sql);
         echo $sql;
         if ($this->link->affected_rows == 1)
         {
             return "El usuario se borró: ";
         } else {
             return "Fallo al borrar usuario: (" . $this->link->errno . ") " . $this->link->error;
         }
         $this->CloseConnect();
    } 
   
}