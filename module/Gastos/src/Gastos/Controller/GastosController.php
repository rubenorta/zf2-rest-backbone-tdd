<?php
namespace Gastos\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
use Zend\Json\Json;
use Gastos\Model\Gastos;


class GastosController extends AbstractRestfulController {
    private $dbAdapter;
    protected $gastosTable;

    public function __construct(){}

    public function getGastosTable(){
        if (!$this->gastosTable) {
            $sm = $this->getServiceLocator();
            $this->gastosTable = $sm->get('Gastos\Model\GastosTable');
        }
        return $this->gastosTable;
    }

    public function jsonToArray( $json ){
        $result = array();
        foreach ( Json::decode($json) as $key => $value) {
            $result[$key] =$value;
        }
        return $result;
    }

    public function saveXHRPost( $postData ) {
        $gastos = new Gastos();
        $gastos->exchangeArray( $this->jsonToArray( $postData ) );
        return $this->getGastosTable()->saveGasto( $gastos );
    }

    public function getAllData() {
        $data = array();
        $results = $this->getGastosTable()->fetchAll();
        foreach ($results as $result) {
            $data[] = $result;
        }
        return $data;
    }

    public function indexAction(){
        
        $request = $this->getRequest();
        $gastos = new Gastos();
        $datos = $this->getAllData();

        /**
         * GET (Read)
         */
        if( $request->isXmlHttpRequest() && $request->isGet() ){
            return new JsonModel(array(
                "gastos"  => $datos,
                "success" => true
            ));

        /**
         * POST (Create)
         */
        } elseif( $request->isXmlHttpRequest() && $request->isPost() ){

            // Guardo el gasto en la BBDD.
            $datos = $this->saveXHRPost( $request->getContent() );

            // Devuelvo JSON de respuesta con el gasto recien añadido y su ID
            return new JsonModel(array(
                "gastos"  => $datos, 
                "success" => true
            ));
        
        } 
    }
}