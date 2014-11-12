describe("APP existe en global scope", function() {
    it( "Namespace definido", function() {
        expect( APP ).toBeDefined();
    });

    describe( "y tiene un método para organizar nuestra aplicación", function() {
        it( "APP.namespace está definido", function() {
            expect( APP.namespace ).toBeDefined();
        });
        it( "y crea objetos vacíos donde almacenar los módulos", function() {
            APP.namespace( "APP.router" );
            expect( APP.router ).toBeDefined();
            expect( APP.router ).toEqual({});
        });
    });
});

describe("Model Gastos", function() {
    it( "Está definido", function() {
        expect( APP.models.Gastos ).toBeDefined();
    });
    it( "Sirve para crear instancias de Backbone Model", function() {
        var gastosModel = new APP.models.Gastos();
        expect( gastosModel instanceof Backbone.Model ).toEqual( true );
    });
    it( "Sirve para crear instancias de Backbone Model", function() {
        var gastosModel = new APP.models.Gastos();
        expect( gastosModel instanceof Backbone.Model ).toEqual( true );
    });
    it( "Tiene los atributos cantidad, descripción e id", function() {
        var gastosModel = new APP.models.Gastos();
        expect( gastosModel.get( "cantidad" ) ).toEqual( null );
        expect( gastosModel.get( "descripcion" ) ).toEqual( null );
        expect( gastosModel.get( "id" ) ).toEqual( null );
        expect( gastosModel.get( "pepe" ) ).toBeUndefined();
    });

    describe( "Podemos guardar en servidor", function() {
        beforeEach(function() {
            this.server = sinon.fakeServer.create();

            var request, params,
                gastosModel = new APP.models.Gastos();
            
            gastosModel.save({
                cantidad: "1.23",
                descripcion:"hola mundo"
            });

            this.request = this.server.requests[0];
            this.params = JSON.parse(this.request.requestBody);

        });
        afterEach(function() {
            this.server.restore();
        });
        it( "#save", function() {
            expect(this.params.cantidad).toEqual("1.23");
            expect(this.params.descripcion).toEqual("hola mundo");
            expect(this.params.complete).toBeFalsy();
        });
        it( "El método es POST", function() {
            expect(this.request.method).toEqual( "POST");
            expect(this.request.method).not.toEqual( "PUT");
            expect(this.request.method).not.toEqual( "DELETE");
            expect(this.request.method).not.toEqual( "GET");
        });
        it( "La url apunta a 'gastos'", function() {
            expect(this.request.url).toEqual( "gastos");
            expect(this.request.url).not.toEqual( "/gastos");
            expect(this.request.url).not.toEqual( "gastos/");
            expect(this.request.url).not.toEqual( "gestos");
        });
        it( "Y es asíncrono", function() {
            expect(this.request.async).toBeTruthy();
        });
    });
});

describe('Collection Gastos', function() {
    it( "Está definida", function() {
        expect( APP.collections.Gastos ).toBeDefined();
    });
    it( "Sirve para crear instancias de Backbone Collection", function() {
        var gastosCollection = new APP.models.Gastos();
        expect( gastosCollection instanceof Backbone.Collection ).toEqual( true );
    });
    it( "Sirve para crear instancias de Backbone Collection", function() {
        var gastosCollection = new APP.models.Gastos();
        expect( gastosCollection instanceof Backbone.Collection ).toEqual( true );
    });
});