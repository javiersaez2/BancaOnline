<?php

class cuenta_corrienteClass

{
    protected $iban;
    protected $dniCliente;
    protected $titular;
    protected $saldo;

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
     * Get the value of titular
     */ 
    public function getTitular()
    {
        return $this->titular;
    }

    /**
     * Set the value of titular
     *
     * @return  self
     */ 
    public function setTitular($titular)
    {
        $this->titular = $titular;

        return $this;
    }

    /**
     * Get the value of saldo
     */ 
    public function getSaldo()
    {
        return $this->saldo;
    }

    /**
     * Set the value of saldo
     *
     * @return  self
     */ 
    public function setSaldo($saldo)
    {
        $this->saldo = $saldo;

        return $this;
    }
}
