<?php



class movimientoClass
{
    protected $idMovimiento;
    protected $tipoMovimiento;
    protected $concepto;

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
     * Get the value of tipoMovimiento
     */ 
    public function getTipoMovimiento()
    {
        return $this->tipoMovimiento;
    }

    /**
     * Set the value of tipoMovimiento
     *
     * @return  self
     */ 
    public function setTipoMovimiento($tipoMovimiento)
    {
        $this->tipoMovimiento = $tipoMovimiento;

        return $this;
    }

    /**
     * Get the value of concepto
     */ 
    public function getConcepto()
    {
        return $this->concepto;
    }

    /**
     * Set the value of concepto
     *
     * @return  self
     */ 
    public function setConcepto($concepto)
    {
        $this->concepto = $concepto;

        return $this;
    }
}