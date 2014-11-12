<?php

namespace Gastos\Model;

class Gastos {

    public $id;
    public $cantidad;
    public $descripcion;
    public $created;

    public function exchangeArray($data) {
        $this->id           = (!empty($data['id'])) ? $data['id'] : null;
        $this->cantidad     = (!empty($data['cantidad'])) ? $data['cantidad'] : null;
        $this->descripcion  = (!empty($data['descripcion'])) ? $data['descripcion'] : null;
        $this->created      = (!empty($data['created'])) ? $data['created'] : null;
    }

}