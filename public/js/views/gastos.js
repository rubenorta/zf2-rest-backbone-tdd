$(function(){

    APP.namespace( "APP.views.Gastos.Item" );
    APP.views.Gastos.Item = Backbone.View.extend({
        model: null,
        initialize: function(){
            if ( !this.model ) {
                throw new Error( "Es necesario un modelo" );
            }
            this.model.view = this;
        },
    });

    APP.namespace( "APP.views.Gastos.Listado" );
    APP.views.Gastos.Listado = Backbone.View.extend({

    });

    APP.namespace( "APP.views.Gastos.Formulario" );
    APP.views.Gastos.Formulario = Backbone.View.extend({

    });

});