<?php
return array(
     'router'=>array(
        'routes'=>array(
            'gastos'=>array(
                'type'    => 'Segment',
                'options' => array(
                    'route'    => '/gastos',
                    'defaults' => array(
                        'controller' => 'Gastos\Controller\Gastos',
                        'action'     => 'index'
                    ),
                ),
            ),
        ),
    ),
    'service_manager' => array(
        'abstract_factories' => array(
            'Zend\Cache\Service\StorageCacheAbstractServiceFactory',
            'Zend\Log\LoggerAbstractServiceFactory',
        ),
        'aliases' => array(
            'translator' => 'MvcTranslator',
        ),
    ),
    'translator' => array(
        'locale' => 'es_ES',
        'translation_file_patterns' => array(
            array(
                'type'     => 'gettext',
                'base_dir' => __DIR__ . '/../language',
                'pattern'  => '%s.mo',
            ),
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Gastos\Controller\Gastos' => 'Gastos\Controller\GastosController'
        ),
    ),
    'view_manager' => array(
        'template_path_stack' => array(
            'gastos' =>  __DIR__ . '/../view',
        ),
        'strategies' => array(
            'ViewJsonStrategy'
        ),
    ),
);