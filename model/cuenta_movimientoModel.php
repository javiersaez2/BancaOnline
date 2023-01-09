<?php
include_once 'connect_data.php';
include_once 'cuenta_movimientoClass.php';


class cuenta_movimientosModel extends cuenta_movimientosClass
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
        
        $iban= $this->iban;
        $idMovimiento= $this->idMovimiento;
        $fecha= $this->fecha;
        $cantidad= $this->cantidad;

        
        $sql = "INSERT INTO `cuenta_movimiento`(`iban`,`idMovimiento`,`fecha`,`cantidad`) VALUES ('$iban','$idMovimiento','$fecha',$cantidad)";
        
        $this->link->query($sql);
        
        if ($this->link->affected_rows == 1)
        {
            return" el cuenta_movimiento se ha insertado con exito. Num de inserts: ".$this->link->affected_rows;
        } else {
            return" Fallo al insertar un cuenta_movimiento nuevo: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
       
   }

}
