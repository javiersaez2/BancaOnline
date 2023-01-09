<?php
include_once 'connect_data.php';
include_once 'movimientoClass.php';
 

class movimientoModel extends movimientoClass
{
    private $link;
    //  public $objFamilia;

    public function OpenConnect()
    {
        $konDat = new connect_data();
        try {
            $this->link = new mysqli($konDat->host, $konDat->userbbdd, $konDat->passbbdd, $konDat->ddbbname);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8"); // honek behartu egiten du aplikazio eta
        //                  //databasearen artean UTF -8 erabiltzera datuak trukatzeko
    }

    public function CloseConnect()
    {
        mysqli_close($this->link);
    }
    public function insert(){
    
        $this->OpenConnect();  
        
        $tipo= $this->tipoMovimiento;
        $concepto= $this->concepto;

        
        $sql = "INSERT INTO `movimiento`(`tipoMovimiento`,`concepto`) VALUES ('$tipo','$concepto')";
        
        $this->link->query($sql);
        
        if ($this->link->affected_rows == 1)
        {
            $id = $this->link->insert_id;
            return $id;
            // $msg= "el movimiento se ha insertado con exito. Num de inserts: ".$this->link->affected_rows;
        } else {
            return" Fallo al insertar un movimiento nuevo: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
       
   }
}
