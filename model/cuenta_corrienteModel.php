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

}
