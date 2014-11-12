<?php
namespace Gastos;

use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;

use Gastos\Model\Gastos;
use Gastos\Model\GastosTable;

class Module {
 
    public function getAutoloaderConfig() {
        return array(
            'Zend\Loader\ClassMapAutoloader' => array(
                __DIR__ . '/autoload_classmap.php',
            ),
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }

    public function getConfig() {
        return include __DIR__ . "/config/module.config.php";
    }

    public function getServiceConfig() {
        return array(
            'factories' => array(
                'Gastos\Model\GastosTable' =>  function($sm) {
                    $tableGateway = $sm->get( 'GastosTableGateway' );
                    $table = new GastosTable( $tableGateway );
                    return $table;
                },
                'GastosTableGateway' => function ($sm) {
                    $dbAdapter = $sm->get( 'Zend\Db\Adapter\Adapter' );
                    $resultSetPrototype = new ResultSet();
                    $resultSetPrototype->setArrayObjectPrototype( new Gastos() );
                    return new TableGateway( 'gastos', $dbAdapter, null, $resultSetPrototype );
                },
            ),
        );
    }

    public function onDispatchError(MvcEvent $e){
    
        return $this->getJsonModelError($e);
    }

    public function onRenderError(MvcEvent $e){
    
        return $this->getJsonModelError($e);
    }

    public function getJsonModelError(MvcEvent $e){
    
        $error = $e->getError();
        
        if (!$error) {
            return;
        }

        $response = $e->getResponse();
        $exception = $e->getParam('exception');
        $exceptionJson = array();
        if ($exception) {
            $exceptionJson = array(
                'class' => get_class($exception),
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
                'message' => $exception->getMessage(),
                'stacktrace' => $exception->getTraceAsString()
            );
        }

        $errorJson = array(
            'message'   => 'An error occurred during execution; please try again later.',
            'error'     => $error,
            'exception' => $exceptionJson,
        );
        if ($error == 'error-router-no-match') {
            $errorJson['message'] = 'Resource not found.';
        }

        $model = new JsonModel(array('errors' => array($errorJson)));

        $e->setResult($model);

        return $model;
    }
}