<?php
include_once 'connect_data.php';
include_once 'cuenta_corrienteClass.php';


class cuenta_corrienteModel extends cuenta_corrienteClass
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

        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            $this->setIban($row['iban']);
            
            $sub = intval(substr($this->getIban(), -10));
            
            $sub = $sub + 1;

            $sub = strval($sub);

            $bus = substr($this->getIban(), 0, -10);

            $bus = $bus.$sub;
            
            $this->setIban($bus);

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
            $msg= $sql." La cuenta se ha insertado con exito. Num de inserts: ".$this->link->affected_rows;
        } else {
            $msg=$sql." Fallo al insertar una cuenta nuevo: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
        return $msg;
    }

}
