describe("APP existe en global scope", function() {
    it('Namespace definido', function() {
        expect(APP).toBeDefined();
    });

    describe("y tiene un método para crear organizar nuestra aplicación", function() {
        it('APP.namespace está definido', function() {
            expect(APP.namespace).toBeDefined();
        });
    });
});
