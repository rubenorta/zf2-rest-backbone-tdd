<?php

namespace Gastos\Model;

use Zend\Db\TableGateway\TableGateway;

class GastosTable {

    protected $tableGateway;

    public function __construct(TableGateway $tableGateway) {
        $this->tableGateway = $tableGateway;
    }

    public function fetchAll() {
        $resultSet = $this->tableGateway->select();
        return $resultSet;
    }

    public function getGasto( $id ){
        $id  = (int) $id;
        $rowset = $this->tableGateway->select(array( 'id' => $id ));
        return $rowset->current();
    }

    public function saveGasto( Gastos $gasto ) {

        $data = array(
            'cantidad'     => $gasto->cantidad,
            'descripcion'  => $gasto->descripcion
        );

        $id = (int) $gasto->id;
        if ($id == 0) {
            $this->tableGateway->insert($data);
        } else {
            if ($this->getGasto($id)) {
                $this->tableGateway->update($data, array('id' => $id));
            } else {
                throw new \Exception('No existe gasto con dicho ID');
            }
        }

        $data["id"] = $this->tableGateway->lastInsertValue;

        return $data;
    }

    public function deleteGasto($id){
        $this->tableGateway->delete( array('id' => (int) $id ) );
    }
}