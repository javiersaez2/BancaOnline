<?php
include_once 'connect_data.php';
include_once 'cuenta_corrienteClass.php';
include_once 'cuenta_movimientoModel.php';


class cuenta_corrienteModel extends cuenta_corrienteClass
{
    private $link;
    private $objCuenta;

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

    public function setListCuenta()
    {
        $dniCliente=$this->dniCliente;
        $this->OpenConnect();
        $sql = "select * from cuenta_corriente where dniCliente='$dniCliente' ";

        $list=array();

        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $newCuenta = new cuenta_corrienteModel();
            $newCuenta->iban = $row['iban'];
            $newCuenta->dniCliente = $row['dniCliente'];
            $newCuenta->titular = $row['titular'];
            $newCuenta->saldo = $row['saldo'];
            array_push($list, get_object_vars($newCuenta));

        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;

    }
    public function selectIban(){
        $this->OpenConnect();

        $sql = "SELECT * FROM cuenta_corriente ORDER BY iban DESC";
        $result = $this->link->query($sql);

        if ($this->link->affected_rows > 0){
            if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                $this->setIban($row['iban']);
                
                $sub = intval(substr($this->getIban(), -10));
                
                $sub = $sub + 1;

                $sub = strval($sub);

                $bus = substr($this->getIban(), 0, -9);

                $bus = $bus.$sub;
                
                $this->setIban($bus);
            }
        } else {
            $this->setIban("ES1220900000450350000001"); 
        }

        mysqli_free_result($result);
        $this->CloseConnect();
    }

    public function insert(){
    
        $this->OpenConnect();  
        
        $iban= $this->iban;
        $dniCliente= $this->dniCliente;
        $titular= $this->titular;
        $saldo= $this->saldo;

        
        $sql = "INSERT INTO `cuenta_corriente`(`iban`, `dniCliente`,`titular`,  `saldo`) VALUES ('$iban','$dniCliente','$titular',0)";
        
        $this->link->query($sql);
        
        if ($this->link->affected_rows == 1)
        {
            $msg= "La cuenta se ha insertado con exito. Num de inserts: ".$this->link->affected_rows;
        } else {
            $msg=$sql." Fallo al insertar una cuenta nuevo: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
        return $msg;
    }

    public function deleteCuentaByIdCliente()
    {
        $this->OpenConnect();
        $dniCliente = $this->dniCliente;
        $sql = "delete from cuenta_corriente where dniCliente='" . $dniCliente . "'";
        $this->link->query($sql);
        
            if ($this->link->affected_rows == 1) {
                return "La cuenta_corriente se borró: ";
            } else {
                return "Fallo al borrar cuenta_corriente: (" . $this->link->errno . ") " . $this->link->error;
            }
       
        $this->CloseConnect();
    }

    public function deleteCuenta()
    {
        $this->OpenConnect();
        $iban = $this->iban;
        $sql = "delete from cuenta_corriente where iban='$iban'";
        $this->link->query($sql);
        
        if ($this->link->affected_rows == 1) {
            return "Cuenta corriente borrada con exito";
        } else {
            return "Fallo al borrar cuenta_corriente: (" . $this->link->errno . ") " . $this->link->error;
        }
       
        $this->CloseConnect();
    }

    public function deletemovimientos()
    {
        $dniCliente=$this->dniCliente;
        $this->OpenConnect();
        $sql = "select * from cuenta_corriente where dniCliente='$dniCliente' ";

        $list=array();

        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
     
            $newMovimiento=new cuenta_movimientoModel();
            $newMovimiento->setIban($row['iban']);    
            $newMovimiento->objCuenta=$newMovimiento->deleteMovimimientosByIban();

            array_push($list, get_object_vars($newMovimiento));
        }
        return $list;

    }



    public function setListCuentaNoPersonal()
    {
        $this->OpenConnect();
        $sql = "select * from cuenta_corriente GROUP BY dniCliente ";

        $list=array();

        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $newCuenta = new cuenta_corrienteModel();
            $newCuenta->iban = $row['iban'];
            $newCuenta->dniCliente = $row['dniCliente'];
            $newCuenta->titular = $row['titular'];
            $newCuenta->saldo = $row['saldo'];
            array_push($list, get_object_vars($newCuenta));

        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;

    }


    public function cuentasTransferibles()
    {
        $dniCliente=$this->dniCliente;
        $iban=$this->iban;

        $this->OpenConnect();
        $sql = "select * from cuenta_corriente where dniCliente='$dniCliente' AND iban!='$iban'";

        //var_dump($sql);
        $list=array();

        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $newCuenta = new cuenta_corrienteModel();
            $newCuenta->iban = $row['iban'];
            $newCuenta->dniCliente = $row['dniCliente'];
            $newCuenta->titular = $row['titular'];
            $newCuenta->saldo = $row['saldo'];
            array_push($list, get_object_vars($newCuenta));

        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;

    }

    public function ingresar(){
        
        $this->OpenConnect();
        $iban=$this->iban;
        $cantidad=$this->saldo;
        $sql = "UPDATE cuenta_corriente SET saldo = (saldo + $cantidad) WHERE iban = '$iban';";
        
        $this->link->query($sql);
        if ($this->link->affected_rows==1) {
            return "el saldo ha ingresado = ".$cantidad;
        } 
        $this->CloseConnect();
    }

    public function retirar(){
        
        $this->OpenConnect();
        $iban=$this->iban;
        $cantidad=$this->saldo;
        $sql = "select * from cuenta_corriente where iban='$iban'";

        $result = $this->link->query($sql);
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            if($row['saldo'] >= $cantidad){
                $sql = "UPDATE cuenta_corriente SET saldo = (saldo - $cantidad) WHERE iban = '$iban';";
                $this->link->query($sql);
                if ($this->link->affected_rows==1) {
                    $valor = 1;
                } 
            }
            else {
                $valor = 0;
            }
        }

        return $valor;
        $this->CloseConnect();

       
    }    
}
