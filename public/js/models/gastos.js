$(function(){
    APP.namespace( "APP.models.Gastos" );
    APP.models.Gastos = Backbone.Model.extend({
        url: "gastos",
        defaults: {
            "id":          null,
            "cantidad":    null,
            "descripcion": null
        }
    });

    APP.namespace( "APP.collections.Gastos" );
    APP.collections.Gastos = Backbone.Collection.extend({
        model: APP.models.Gastos,
        url: "gastos"
    });
});