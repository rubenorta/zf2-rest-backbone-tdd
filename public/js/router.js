$(function(){
    APP.namespace( "APP.routers" );
    APP.routers = Backbone.Router.extend({

        routes: {
            "gastos/add(/)" : "add",
            "gastos(/)"     : "listado",
            "*any"          : "redirect"
        },
        
        currentView: null,

        listado: function () {
            var listadoView = new APP.views.Gastos.Listado()
            this.loadView( listadoView , listadoView.getAll );
        },

        add: function () {
            var formularioView = new APP.views.Gastos.Formulario()
            this.loadView( formularioView, formularioView.render );
        },

        redirect: function(){
           this.navigate( "gastos/", true );
        },

        loadView : function( view, callback ) {
            this.currentView && this.currentView.destroy();
            this.currentView = view;
            if( _.isFunction( callback ) ){
                callback.apply( view );
            }
        }

    });

});
