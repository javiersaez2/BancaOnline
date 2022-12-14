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

    public function setUserData() { 
        $this->OpenConnect();
        
        $nombre=$this->izena;
        $pasahitza=$this->pass;
        $codSecreto=$this->codSecreto;
        
        $sql="SELECT * FROM cliente WHERE nombre='$nombre' ";
        $result= $this->link->query($sql);
        
        $check=0;
        $tipo = -1;
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            if ($this->link->affected_rows == 1){
                if ($codSecreto != " " || $pasahitza != ""){
                    if ($pasahitza == $row["pasahitza"]){
                        $check = 1;
                        $tipo = $row["tipo"];
                    } else {
                        $check= -1;
                    }
                } else {
                    if ($codSecreto == $row["secreto"]){
                        $check = 1;
                        $tipo = $row["tipo"];
                    } else {
                        $check= -2;
                    }
                }
            }
        }

        mysqli_free_result($result);
        $this->CloseConnect();
        return array("check"=>$check, "tipo"=>$tipo);  
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
            $newCliente->dniCliente=$row['dniCliente'];
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
    
   public function insert()
   {
        $this->OpenConnect();
        $dni= $this->getDniCliente();
        $nombre= $this->getNombre();
        $pasahitza= $this->getPasahitza();
        $secreto = mt_rand(0000, 9999);
        $tipo = 0;

        $sql="INSERT INTO cliente (dniCliente, nombre, pasahitza, secreto, tipo) VALUES ('$dni', '$nombre', '$pasahitza', $secreto, $tipo)";
        echo $sql;
        $this->link->query($sql);

        if ($this->link->affected_rows == 1)
        {
            return "El usuario se creo: ";
        } else {
            return "Fallo al crear usuario: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
   }

    public function delete()
    {
         $this->OpenConnect();
         $dniCliente= $this-> dniCliente;
         $sql="delete from cliente where dniCliente='".$dniCliente."'";
          
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
    
    //metodo para show update
    public function showUpdate() {
        $this->OpenConnect();
        
        $dniCliente = $this->dniCliente;
        
        $sql = "select * from cliente where dniCliente=$dniCliente";
        
        $result = $this->link->query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            
            $this->dniCliente=$row['dniCliente'];
            $this->nombre=$row['nombre'];
            $this->pasahitza=$row['pasahitza'];

            
            return true;
        }
        else {
            return false;
            
        }
        mysqli_free_result($result);
        $this->CloseConnect();
    } 
    
    //metodo para update
   public function update() {
        $this->OpenConnect();
        
        $dniCliente = $this->dniCliente;
        $nombre = $this->nombre;
        $pasahitza=$this->pasahitza;
        
        
        $sql = "update cliente
        set dniCliente='$dniCliente',
        nombre='$nombre',
        pasahitza='$pasahitza'
        where dniCliente='$dniCliente'";
        
        $this->link->query($sql);
        
        if ($this->link->affected_rows==1) {
            return "el usuario se ha modificado con exito. Num de modification : ".$this->link->affected_rows;
        }
        else {
            return $sql."Fallo al modification un usuario : (".$this->link->errno.")".$this->link->error;
            
        }
        $this->CloseConnect();
    }
<<<<<<< HEAD
    
   
=======
>>>>>>> 777f0da64659d0b2dd88f43d2429fdff30505aa9
}