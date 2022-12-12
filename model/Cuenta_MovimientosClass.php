<?php

class Cuenta_CorrienteModel
{
    protected $iban;
    protected $idMovimiento;
    protected $fecha;
    protected $cantidad;

    /**
     * Get the value of cantidad
     */ 
    public function getCantidad()
    {
        return $this->cantidad;
    }

    /**
     * Set the value of cantidad
     *
     * @return  self
     */ 
    public function setCantidad($cantidad)
    {
        $this->cantidad = $cantidad;

        return $this;
    }

    /**
     * Get the value of fecha
     */ 
    public function getFecha()
    {
        return $this->fecha;
    }

    /**
     * Set the value of fecha
     *
     * @return  self
     */ 
    public function setFecha($fecha)
    {
        $this->fecha = $fecha;

        return $this;
    }

    /**
     * Get the value of idMovimiento
     */ 
    public function getIdMovimiento()
    {
        return $this->idMovimiento;
    }

    /**
     * Set the value of idMovimiento
     *
     * @return  self
     */ 
    public function setIdMovimiento($idMovimiento)
    {
        $this->idMovimiento = $idMovimiento;

        return $this;
    }

    /**
     * Get the value of iban
     */ 
    public function getIban()
    {
        return $this->iban;
    }

    /**
     * Set the value of iban
     *
     * @return  self
     */ 
    public function setIban($iban)
    {
        $this->iban = $iban;

        return $this;
    }
}