$(function(){

    APP.namespace( "APP.views.Gastos.Item" );
    APP.views.Gastos.Item = Backbone.View.extend({
        
        model: null,
        tagName: 'tr',
        className: 'gasto',
        
        template: _.template(
            '<td class="cantidad"><%= cantidad %></td>'+
            '<td class="descripcion"><%= descripcion %></td>'
        ),
        
        initialize: function(){
            if ( !this.model ) {
                throw new Error( "Es necesario un modelo" );
            }
            this.model.view = this;
        },

        render: function(){
            this.$el.html( this.template( this.model.attributes ) );
            return this;
        }
    });

    APP.namespace( "APP.views.Gastos.Listado" );
    APP.views.Gastos.Listado = Backbone.View.extend({
        

        model: null,
        collection: null

    });

    APP.namespace( "APP.views.Gastos.Formulario" );
    APP.views.Gastos.Formulario = Backbone.View.extend({

    });

});