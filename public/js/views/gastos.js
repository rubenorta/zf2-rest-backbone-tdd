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

        initialize: function( options ){
            this.model = options && options.model || new APP.models.Gastos();
            this.listenTo(this.model, 'change', this.render);
            this.model.view = this;
        },

        render: function(){
            this.$el.html( this.template( this.model.attributes ) );
            return this;
        }
    });

    APP.namespace( "APP.views.Gastos.Listado" );
    APP.views.Gastos.Listado = Backbone.View.extend({

        el: APP.pageID,
        model: null,
        collection: null,

        template: _.template(
            '<div id="listado">'+
                '<h3>Listado de gastos:</h3>'+
                '<table class="table gastos">'+
                '<thead>'+
                '<tr>'+
                    '<th class="cantidad">Cantidad</th>'+
                    '<th class="descripcion">Descripción</th>'+
                '</tr>'+
                '</thead>'+
                '<tbody id="gastos"></tbody>'+
                '</table>'+
                '<p><a class="btn btn-default addgasto" href="#gastos/add">Añadir gasto</a></p>'+
            '</div>'
        ),

        initialize: function( options ){
            this.collection = options && options.collection || new APP.collections.Gastos();
            this.listenTo( this.collection, 'sync', this.render );
        },

        getAll: function(){
            this.collection.fetch();
        },

        render: function() {
            
            var container = document.createDocumentFragment();

            this.collection.each( function( item ) {
                var gasto = new APP.views.Gastos.Item({ model: item });
                container.appendChild( gasto.render().el );
            }, this );

            //this.destroy();
            this.$el
                .append( this.template() )
                .find("#gastos")
                .append( container );
            
            return this;
        },

        destroy: function(){
            this.stopListening();
            this.undelegateEvents();
            this.$el
                .find("#listado")
                .remove();

            return this;
        }

    });

    APP.namespace( "APP.views.Gastos.Formulario" );
    APP.views.Gastos.Formulario = Backbone.View.extend({
        
        el: APP.pageID,
        model: null,
        collection: null,

        events: {
            "click #addgasto": "addGasto",
        },

        template: _.template(
            '<div id="formulario">'+
                '<h3>Añadir gasto:</h3>'+
                '<div class="form-group clearfix">'+
                    '<label for="cantidad">Cantidad</label>'+
                    '<input type="number" name="cantidad" id="cantidad" class="form-control" placeholder="Cantidad" step="0.01" value="" />'+
                '</div>'+
                '<div class="form-group clearfix">'+
                    '<label for="descripcion">Descripción</label>'+
                    '<textarea name="descripcion" id="descripcion" class="form-control" placeholder="Descripción"></textarea>'+
                '</div>'+
                '<input type="submit" name="submit" id="addgasto" class="btn btn-default" value="Enviar datos" />'+
            '</div>'
        ),

        initialize: function( options ){
            this.collection = options && options.collection || new APP.collections.Gastos();
            this.model = options && options.model || new APP.models.Gastos();
        },

        addGasto: function() {
            var numRegExp = new RegExp('^[0-9]+$'),
                cantidadValue = this.$el.find("#cantidad").val(),
                descripcionValue = this.$el.find("#descripcion").val();


            if (descripcionValue === ""){
                toastr.error('Debe rellenar la descripción', 'Error');
                return;
            }
            if( isNaN( parseFloat( cantidadValue ) ) ){
                toastr.error('La cantidad debe ser un número', 'Error');
                return;
            }

            this.model.set({
                "cantidad":cantidadValue,
                "descripcion":descripcionValue
            });

            this.collection.create( this.model, {
                silent: true, 
                wait: true, 
                success: this.successCreate,
                error: this.errorCreate
            });

        },

        successCreate: function( model, response ) {
            model.collection.fetch({
                reset:true,
                success: function(){
                    toastr.success('Se ha añadido correctamente el gasto en la base de datos', 'Gasto añadido');
                    APP.router.navigate("gastos", { trigger:true } );
                }
            });
        },

        errorCreate: function(){
            toastr.error('No se ha podido añadir el gasto', 'Error');
        },

        render: function() {
            this.$el.append( this.template() )
            return this;
        },

        destroy: function(){
            this.stopListening();
            this.undelegateEvents();
            this.$el
                .find("#formulario")
                .remove();

            return this;
        }

    });

});