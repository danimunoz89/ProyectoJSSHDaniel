import { StoreHouseApp } from "./storeHouseApp.js";

const historyActions = {
    init: () => {
        StoreHouseApp.handleCargaTiendas();
    },

    cargarCategorias: (event) => {
        StoreHouseApp.handleProductsCategoryList(event.state.idCategoria);
    },

    cargarTiendas: (event) => {
        StoreHouseApp.handleProductsStoreList(event.state.idTienda);
    },

    cargarTiendasMenu: (event) => {
        StoreHouseApp.handleProductsStoreList(event.state.idTienda);
    },

    cargarDetalles: (event) => {
        StoreHouseApp.handleshowDetailsProducts(event.state.nombreProducto);
    },

    formularioOtro: (event) => {
        StoreHouseApp.handlerFormularioOtro();
    },

    formularioConsola: (event) => {
        StoreHouseApp.handlerFormularioConsola();
    },

    formularioVideojuego: (event) => {
        StoreHouseApp.handlerFormularioVideojuego();
    },

    formularioAccesorio: (event) => {
        StoreHouseApp.handlerFormularioAccesorio();
    },

    formularioCategoria: (event) => {
        StoreHouseApp.handlerFormularioCategoria();
    },

    formularioTienda: (event) => {
        StoreHouseApp.handlerFormularioTienda();
    },

    formularioEliminarTienda: (event) => {
        StoreHouseApp.handlerEliminarTienda();
    },

    formularioEliminarCategoria: (event) => {
        StoreHouseApp.handlerEliminarCategoria();
    },

    formularioEliminarProducto: (event) => {
        StoreHouseApp.handlerEliminarProducto();
    },

    formularioDefectoProducto: (event) => {
        StoreHouseApp.handlerDefectoProducto();
    },

    formularioStockProducto: (event) => {
        StoreHouseApp.handlerStockProducto();
    },

    mostrarFavoritos: (event) => {
        StoreHouseApp.handlerMostrarFavoritos();
    },

    mostrarTiendas: (event) => {
        StoreHouseApp.handlerMapaTiendas();
    }
}
window.addEventListener('popstate', function (event) {
    if (event.state) {
        historyActions[event.state.action](event);
    }
})

history.replaceState({ action: 'init' }, null);