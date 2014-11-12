var APP = APP || {};

(function( app ) {

    "use strict";

    app.global = this;
    app.pageID = "#page",

    app.init = function () {
        app.router = new APP.routers();
        Backbone.history.start();
    };

    /** 
     * @desc: crea la estructura necesaria para alojar nuestro módulo en la ruta
     *        especificada.
     * @param string {String}: la ruta donde vayamos a alojar el módulo.
     * @return {Object}: el objeto vacío donde podremos meter el módulo.
     */
    app.namespace = function ( string ) {
        var parts = string.split("."),
            parent = app,
            i;

        if (parts[0] === "APP") {
            parts = parts.slice(1);
        }

        for (i = 0; i < parts.length; i += 1) {
            if (typeof parent[parts[i]] === "undefined") {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }

        return parent;

    };

}.call( this, APP ));