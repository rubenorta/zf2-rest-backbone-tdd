$(function(){
    APP.namespace( "APP.models.Gastos" );
    APP.models.Gastos = Backbone.Model.extend({
        defaults: {
            "id":          null,
            "cantidad":    null,
            "descripcion": null
        }
    });
});