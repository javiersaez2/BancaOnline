<?php
require_once  'connect_data.php';
require_once  'clienteClass.php';
require_once  'cuenta_corrienteModel.php';
class clienteModel extends clienteclass
{

    private $link;
    private $objCuenta;

    ////////////////////////////////////////////////
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

    public function setUserData()
    {
        $this->OpenConnect();

        $dni = $this->dni;
        $pasahitza = $this->pass;
        $codSecreto = $this->codSecreto;
        $konta = $this->cont;

        $sql = "SELECT * FROM cliente WHERE dniCliente='$dni' ";
        $result = $this->link->query($sql);

        $check = 0;
        $tipo = -1;
        $izena = "";
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            if ($this->link->affected_rows == 1) {
                if ($konta < 3) {
                    if ($pasahitza == $row["pasahitza"]) {
                        $check = 1;
                        $tipo = $row["tipo"];
                        $izena = $row["nombre"];
                    } else {
                        $check = -1;
                    }
                } else {
                    if ($codSecreto == $row["secreto"]) {
                        $check = 1;
                        $tipo = $row["tipo"];
                        $izena = $row["nombre"];
                    } else {
                        $check = -2;
                    }
                }
            }
        }

        mysqli_free_result($result);
        $this->CloseConnect();
        return array("check" => $check, "tipo" => $tipo, "izena"=>$izena);
    }


    ///////////////////////////
    // Mostrar lista usuario //
    ///////////////////////////
    public function setList()
    {
        $this->OpenConnect();
        $sql = "select * from cliente";

        $list = array();

        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $newCliente = new ClienteModel();
            $newCliente->dniCliente = $row['dniCliente'];
            $newCliente->nombre = $row['nombre'];
            $newCliente->pasahitza = $row['pasahitza'];
            $newCliente->secreto = $row['secreto'];
            $newCliente->tipo = $row['tipo'];

            $newCuenta=new cuenta_corrienteModel();
            $newCuenta->setdniCliente($row['dniCliente']);    
            $newCliente->objCuenta=$newCuenta->setListCuenta();;

            array_push($list, get_object_vars($newCliente));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }

    /////////////////////
    // Insert Cliente //
    ////////////////////
    public function insert()
    {
        $this->OpenConnect();
        $dni = $this->getDniCliente();
        $nombre = $this->getNombre();
        $pasahitza = $this->getPasahitza();
        $secreto = mt_rand(1000, 9999);
        $tipo = $this->getTipo();

        $sql = "INSERT INTO cliente (dniCliente, nombre, pasahitza, secreto, tipo) VALUES ('$dni', '$nombre', '$pasahitza', $secreto, $tipo)";
        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            return "Usuario añadido con exito";
        } else {
            return "Fallo al crear usuario: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
    }


    /////////////////////
    // Delete Cliente //
    ////////////////////
    public function deleteCliente()
    {
        $this->OpenConnect();
        $dniCliente = $this->dniCliente;
            $sql = "delete from cliente where dniCliente='" . $dniCliente . "'";
            $this->link->query($sql);
            if ($this->link->affected_rows == 1) {
                return "Usuario eliminado con exito";
            } else {
                return "Fallo al borrar usuario: (" . $this->link->errno . ") " . $this->link->error;
            }
       
        $this->CloseConnect();
    }

    //////////////////
    // Show Update //
    /////////////////
    public function showUpdate()
    {
        $this->OpenConnect();

        $dniCliente = $this->dniCliente;

        $sql = "select * from cliente where dniCliente=$dniCliente";

        $result = $this->link->query($sql);

        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            $this->dniCliente = $row['dniCliente'];
            $this->nombre = $row['nombre'];
            $this->pasahitza = $row['pasahitza'];


            return true;
        } else {
            return false;
        }
        mysqli_free_result($result);
        $this->CloseConnect();
    }

    //metodo para update
    public function update()
    {
        $this->OpenConnect();

        $dniCliente = $this->dniCliente;
        $nombre = $this->nombre;
        $pasahitza = $this->pasahitza;


        $sql = "update cliente
        set dniCliente='$dniCliente',
        nombre='$nombre',
        pasahitza='$pasahitza'
        where dniCliente='$dniCliente'";

        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            return "El usuario se ha modificado con exito.";
        } else {
            return $sql . "Fallo al modification un usuario : (" . $this->link->errno . ")" . $this->link->error;
        }
        $this->CloseConnect();
    }

    public function selectClienteById(){
        $this->OpenConnect();

        $dniCli = $this->dniCli;
        $nombreCliente = "";

        $sql = "SELECT * FROM cliente WHERE dniCliente='$dniCli' ";
        $result = $this->link->query($sql);

        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $nombreCliente = $row["nombre"];
        }

        return $nombreCliente;
        mysqli_free_result($result);
        $this->CloseConnect();
    }
}
