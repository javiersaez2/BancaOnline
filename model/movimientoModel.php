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
            $msg= "el movimiento se ha insertado con exito. Num de inserts: ".$this->link->affected_rows;
        } else {
            $msg=" Fallo al insertar un movimiento nuevo: (" . $this->link->errno . ") " . $this->link->error;
        }
        return $msg;
        $this->CloseConnect();
       
   }

   public function selectIid(){
        $this->OpenConnect();
        $sql = "SELECT max(idMovimiento) as 'idMovimiento' FROM movimiento";
        $result = $this->link->query($sql);

        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            
            $valor=$row['idMovimiento'];
        } 
        return $valor;
        mysqli_free_result($result);
        $this->CloseConnect();
    }


    public function setListMovimiento(){
        $this->OpenConnect();
        $idMovimiento=$this->idMovimiento;
        $sql = "SELECT * FROM movimiento WHERE idMovimiento=$idMovimiento ";
        $result = $this->link->query($sql);

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            if ($this->link->affected_rows > 0){
                $this->idMovimiento=$row['idMovimiento'];
                $this->tipoMovimiento=$row['tipoMovimiento'];
                $this->concepto=$row['concepto'];
            }
        } 

        mysqli_free_result($result);
        $this->CloseConnect();
    }

    public function  ObjVars() {
        return get_object_vars($this);
    }
}
