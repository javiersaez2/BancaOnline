<?php
include_once 'connect_data.php';
include_once 'cuenta_movimientoClass.php';
include_once 'movimientoModel.php';


class cuenta_movimientoModel extends cuenta_movimientoClass
{
    private $objMovimiento;
    private $link;

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
        $cantidad= $this->cantidad;

        $sql = "INSERT INTO cuenta_movimiento(iban,idMovimiento,fecha,cantidad) VALUES ('$iban',$idMovimiento,now(),$cantidad)";
        
        $this->link->query($sql);
        
        if ($this->link->affected_rows == 1)
        {
            $msg= "el cuenta_movimiento se ha insertado con exito. Num de inserts: ".$this->link->affected_rows;
        } else {
            $msg= "Fallo al insertar un cuenta_movimiento nuevo: (" . $this->link->errno . ") " . $this->link->error;
        }
        return $msg;
        $this->CloseConnect();      
   }


    public function movimientosCuenta(){   
        $this->OpenConnect();

        $iban=$this->iban;
        $sql = "SELECT c.iban, c.fecha, c.cantidad, m.* FROM cuenta_movimiento c, movimiento m WHERE iban='$iban' && c.idMovimiento=m.idMovimiento ";

        $list = array();

        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            if($this->link->affected_rows > 0){
                $newCuenta= new cuenta_movimientoModel();
                $newCuenta->iban = $row['iban'];
                $newCuenta->fecha = $row['fecha'];
                $newCuenta->cantidad = $row['cantidad'];

                $newMovimiento=new movimientoModel();
                $newMovimiento->setIdMovimiento($row['idMovimiento']);  
                $newMovimiento->setTipoMovimiento($row["tipoMovimiento"]);
                $newMovimiento->setConcepto($row["concepto"]);
                $newCuenta->objMovimiento=$newMovimiento->ObjVars();

                array_push($list, get_object_vars($newCuenta));
            }
        }
        return $list;
        $this->CloseConnect();  
    }

    public function  ObjVars() {
        return get_object_vars($this);
    }

}
