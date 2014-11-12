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
