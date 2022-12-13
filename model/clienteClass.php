<?php


class clienteclass
{
    protected $dniCliente;
    protected $nombre;
    protected $pasahitza;
    protected $secreto;
    protected $tipo; 

    /**
     * Get the value of dniCliente
     */ 
    public function getdniCliente()
    {
        return $this->dniCliente;
    }

    /**
     * Set the value of dniCliente
     *
     * @return  self
     */ 
    public function setdniCliente($dniCliente)
    {
        $this->dniCliente = $dniCliente;

        return $this;
    }

    /**
     * Get the value of nombre
     */ 
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set the value of nombre
     *
     * @return  self
     */ 
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Get the value of secreto
     */ 
    public function getSecreto()
    {
        return $this->secreto;
    }

    /**
     * Set the value of secreto
     *
     * @return  self
     */ 
    public function setSecreto($secreto)
    {
        $this->secreto = $secreto;

        return $this;
    }

    /**
     * Get the value of pasahitza
     */ 
    public function getPasahitza()
    {
        return $this->pasahitza;
    }

    /**
     * Set the value of pasahitza
     *
     * @return  self
     */ 
    public function setPasahitza($pasahitza)
    {
        $this->pasahitza = $pasahitza;

        return $this;
    }

    /**
     * Get the value of tipo
     */ 
    public function getTipo()
    {
        return $this->tipo;
    }

    /**
     * Set the value of tipo
     *
     * @return  self
     */ 
    public function setTipo($tipo)
    {
        $this->tipo = $tipo;

        return $this;
    }
}