describe("APP existe en global scope", function() {
    it('Namespace definido', function() {
        expect(APP).toBeDefined();
    });

    describe("y tiene un método para organizar nuestra aplicación", function() {
        it('APP.namespace está definido', function() {
            expect(APP.namespace).toBeDefined();
        });
        it('y crea objetos vacíos donde almacenar los módulos', function() {
            APP.namespace( "APP.router" );
            expect(APP.router).toBeDefined();
            expect(APP.router).toEqual({});
        });
    });
});

describe("Modelo Gastos", function() {
    it('Está definido', function() {
        expect(APP.models.Gastos).toBeDefined();
    });
    it('Sirve para crear instancias de Backbone Model', function() {
        var gastosModel = new APP.models.Gastos();
        expect( gastosModel instanceof Backbone.Model ).toEqual( true );
    });
    it('Sirve para crear instancias de Backbone Model', function() {
        var gastosModel = new APP.models.Gastos();
        expect( gastosModel instanceof Backbone.Model ).toEqual( true );
    });
    it('Tiene los atributos cantidad, descripción e id', function() {
        var gastosModel = new APP.models.Gastos();
        expect( gastosModel.get( 'cantidad' ) ).toEqual( null );
        expect( gastosModel.get( 'descripcion' ) ).toEqual( null );
        expect( gastosModel.get( 'id' ) ).toEqual( null );
        expect( gastosModel.get( 'pepe' ) ).toBeUndefined();
    });
});