"use strict";

import { EmptyValueException, valueIncludedException, valueNotIncludedException, InvalidRegexException, nullException, InvalidValueException, InvalidTypeObjectException } from "./storeHouseModel.js";;
import { Accesorios } from "./storeHouseModel.js";
import { Category } from "./storeHouseModel.js";
import { Consolas } from "./storeHouseModel.js";
import { Coords } from "./storeHouseModel.js";
import { Product } from "./storeHouseModel.js";
import { Store } from "./storeHouseModel.js";
import { Videojuegos } from "./storeHouseModel.js";

class storeHouseController {
    #storeHouseModel;
    #storeHouseView;

    //Creo un método privado para crear objetos del SHSingleton
    #loadSHSingletonObjects() {

        //Creo 3 categorias.
        let categoria1 = new Category("Juegos", "El alimento de las consolas", "Juegos");
        let categoria2 = new Category("Consolas", "Lo esencial para jugar", "Consolas");
        let categoria3 = new Category("Accesorios", "Complementos para tu consola", "Accesorios");

        //Añado Categorias
        this.#storeHouseModel.addCategory(categoria1);
        this.#storeHouseModel.addCategory(categoria2);
        this.#storeHouseModel.addCategory(categoria3);

        //Creo 3 tiendas
        let coordenadas1 = new Coords("213123", "243123");
        let tienda1 = new Store(123123, "Game", "calle falsa", 1231723, coordenadas1, "game.jpg", "tienda1");
        let coordenadas2 = new Coords("852963", "741456");
        let tienda2 = new Store(963741, "TodoConsolas", "calle verdadera", 7539510, coordenadas2, "todoconsolas.jpg", "tienda2");
        let coordenadas3 = new Coords("712936", "471465");
        let tienda3 = new Store(845159, "Xtralife", "calle dudosa", 8396374, coordenadas3, "xtralife.jpg", "tienda3");

        //Añado Tiendas
        this.#storeHouseModel.addShop(tienda1);
        this.#storeHouseModel.addShop(tienda2);
        this.#storeHouseModel.addShop(tienda3);

        //Creo 3 productos por categoria
        let juego1 = new Videojuegos("CDE12", "FIFA 22", "EA", "Es un juego de Fútbol", 70, 21, "fifa22.png", "Deportivo", 1);
        let juego2 = new Videojuegos("WER74", "NBA 2k22", "2K", "Es un juego de Baloncesto", 70, 21, "nba2k22.png", "Deportivo", 3);
        let juego3 = new Videojuegos("REW47", "MADDEN NFL 22", "EA", "Es un juego de Fútbol Americano", 70, 21, "madden22.png", "Deportivo", 0);
        let consola1 = new Consolas("UTY21", "Xbox Series X", "Microsoft", "La mejor consola", 500, 21, "xbox.png", "sobremesa", "disco");
        let consola2 = new Consolas("IOP32", "PlayStation5", "Sony", "La consola de sony", 500, 21, "ps5.png", "sobremesa", "disco");
        let consola3 = new Consolas("SWY76", "Nintendo Switch", "Nintendo", "La híbrida de Nintendo", 300, 21, "switch.png", "portatil", "cartucho");
        let accesorio1 = new Accesorios("CDT12", "Mando", "Ardistel", "Un mando para profesionales", 20, 21, "mandopro.png", "Negro", "pc");
        let accesorio2 = new Accesorios("REW34", "Mando 2", "Logitech", "Un mando muy bonito", 50, 21, "mando.png", "Azul", "xbox");
        let accesorio3 = new Accesorios("RTY21", "Maleta", "Rainbow", "Un maleta para tu Nintendo Switch", 35, 21, "maleta.png", "Gris", "nintendo");

        //Añado Productos en Categoria
        this.#storeHouseModel.addProduct(juego1, categoria1);
        this.#storeHouseModel.addProduct(juego2, categoria1);
        this.#storeHouseModel.addProduct(juego3, categoria1);
        this.#storeHouseModel.addProduct(consola1, categoria2);
        this.#storeHouseModel.addProduct(consola2, categoria2);
        this.#storeHouseModel.addProduct(consola3, categoria2);

        this.#storeHouseModel.addProduct(accesorio1, categoria3);
        this.#storeHouseModel.addProduct(accesorio2, categoria3);
        this.#storeHouseModel.addProduct(accesorio3, categoria3);

        //Añado Productos en Tienda
        this.#storeHouseModel.addProductInShop(juego1, tienda1, 40);
        this.#storeHouseModel.addProductInShop(consola1, tienda1, 20);
        this.#storeHouseModel.addProductInShop(accesorio1, tienda1, 10);
        this.#storeHouseModel.addProductInShop(juego2, tienda2, 40);
        this.#storeHouseModel.addProductInShop(consola2, tienda2, 20);
        this.#storeHouseModel.addProductInShop(accesorio2, tienda2, 10);
        this.#storeHouseModel.addProductInShop(juego3, tienda3, 40);
        this.#storeHouseModel.addProductInShop(consola3, tienda3, 20);
        this.#storeHouseModel.addProductInShop(accesorio3, tienda3, 10);
    }

    constructor(storeHouseModel, storeHouseView) {
        this.#storeHouseModel = storeHouseModel;
        this.#storeHouseView = storeHouseView;
        this.onLoad();
        this.#storeHouseView.bindInicio(this.handleCargaTiendas);
        this.#storeHouseView.bindCargaTiendas(this.handleCargaTiendas);
        this.#storeHouseView.bindMenuCategorias(this.handleMenuCategories);
        this.#storeHouseView.bindMenuTiendas(this.handleMenuShops);
        this.#storeHouseView.bindProductsCategoryList(this.handleProductsCategoryList);
        this.#storeHouseView.bindProductsStoreList(this.handleProductsStoreList);
        this.#storeHouseView.bindProductsStoreMenuList(this.handleProductsStoreList);
        this.#storeHouseView.bindDetalleProductos(this.handleshowDetailsProducts);
        this.#storeHouseView.bindProductosNuevaVentana(this.handleProductosNuevaVentana);
        this.#storeHouseView.bindCerrarVentanas();
        this.#storeHouseView.bindFormularioConsola(this.handlerFormularioConsola);
        this.#storeHouseView.bindValidacionConsolaNueva(this.handlerValidacionConsolaNueva);
        this.#storeHouseView.bindFormularioVideojuego(this.handlerFormularioVideojuego);
        this.#storeHouseView.bindValidacionVideojuegoNuevo(this.handlerValidacionVideojuegoNuevo);
        this.#storeHouseView.bindFormularioAccesorio(this.handlerFormularioAccesorio);
        this.#storeHouseView.bindValidacionAccesorioNuevo(this.handlerValidacionAccesorioNuevo);
        this.#storeHouseView.bindFormularioCategoria(this.handlerFormularioCategoria);
        this.#storeHouseView.bindValidacionCategoriaNuevo(this.handlerValidacionCategoriaNuevo);
        this.#storeHouseView.bindFormularioTienda(this.handlerFormularioTienda);
        this.#storeHouseView.bindValidacionTiendaNuevo(this.handlerValidacionTiendaNuevo);
        this.#storeHouseView.bindEliminarTienda(this.handlerEliminarTienda);
        this.#storeHouseView.bindValidacionEliminarTienda(this.handlerValidacionEliminarTienda);
        this.#storeHouseView.bindEliminarCategoria(this.handlerEliminarCategoria);
        this.#storeHouseView.bindValidacionEliminarCategoria(this.handlerValidacionEliminarCategoria);
        this.#storeHouseView.bindEliminarProducto(this.handlerEliminarProducto);
        this.#storeHouseView.bindValidacionEliminarProducto(this.handlerValidacionEliminarProducto);
        this.#storeHouseView.bindDefectoProducto(this.handlerDefectoProducto);
        this.#storeHouseView.bindValidacionDefectoProducto(this.handlerValidacionDefectoProducto);
        this.#storeHouseView.bindStockProducto(this.handlerStockProducto);
        this.#storeHouseView.bindValidacionStockProducto(this.handlerValidacionStockProducto);
        this.#storeHouseView.bindLoginValidacion(this.handlerLoginValidacion);
        this.#storeHouseView.bindLogOut(this.handlerLogOut);
        this.#storeHouseView.bindProductosFavoritos(this.handlerProductosFavoritos);
        this.#storeHouseView.bindMostrarProductosFavoritos(this.handlerMostrarFavoritos);
    }

    //Compruebo que existe una cookie con la info admin/admin y en función de ello
    //muestro o no el formulario.
    //Invoco loadSHSingletonObjects mediante el onLoad()
    //despues de que se haya cargado el html.
    onLoad = () => {
        let usuarioCookie = getCookie("userDaniestore");
        let contrasenaCookie = getCookie("passDaniestore");

        let loginForm = document.getElementById("loginForm");
        let logoutBoton = document.getElementById("logout");

        let mostrarFavBoton = document.getElementById("productosFavoritos");
        let favBoton = document.getElementById("favorito");

        if (usuarioCookie === "admin" && contrasenaCookie === "admin") {
            alert(usuarioCookie + " bienvenido de nuevo");
            loginForm.style.display = "none";
            logoutBoton.style.display = "inline-block";
            mostrarFavBoton.style.display = "inline-block";
        }
        else {
            loginForm.style.display = "inline-block";
            logoutBoton.style.display = "none";
            mostrarFavBoton.style.display = "none";
        }
        this.#loadSHSingletonObjects();
    }

    //Recojo en una variable el iterador y se la paso a mostrarVistaElemTiendas
    //que será la función encargada de pintar las tiendas.
    handleCargaTiendas = () => {
        let iteradorElemTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaElemTiendas(iteradorElemTiendas);
    }

    //Recojo en una variable el iterador y se la paso a mostrarVistaMenuCategorias
    //que será la función encargada de pintar la categorias en el nav.
    handleMenuCategories = () => {
        let iteradorCategorias = this.#storeHouseModel.categories;
        this.#storeHouseView.mostrarVistaMenuCategorias(iteradorCategorias);
    }

    //Recojo en una variable el iterador y se la paso a mostrarVistaMenuTiendas
    //que será la función encargada de pintar el listado de tiendas en el nav.
    handleMenuShops = () => {
        let iteradorTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaMenuTiendas(iteradorTiendas);
    }

    //En StoreHouseModel.js he creado una función que me permite
    //conseguir el objeto categoria que quiero en función
    //del title pasado a handle que será a su vez el id del botón
    //al que pulso para ver los productos de la categoria.
    //Ese objeto categoria lo paso a su vez al getCategoryProducts
    //para poder conseguir los productos de dicha categoria.
    //Y ese generador lo paso a listProducts para poder pintar dichos productos
    //en el HTML.
    handleProductsCategoryList = (idCategoria) => {
        let title;
        for (let elem of this.#storeHouseModel.categories) {
            if (elem.category.id === idCategoria) {
                title = elem.category.title;
            }
        }

        let categoria = this.#storeHouseModel.getCategory(title);

        let usuarioCookie = getCookie("userDaniestore");
        let contrasenaCookie = getCookie("passDaniestore");

        let adminMode = false;
        if (usuarioCookie === "admin" && contrasenaCookie === "admin") {
            adminMode = true;
            this.#storeHouseView.listProducts(this.#storeHouseModel.getCategoryProducts(categoria), adminMode);
        }
        else {
            this.#storeHouseView.listProducts(this.#storeHouseModel.getCategoryProducts(categoria), adminMode);
        }
    }

    //En StoreHouseModel.js he creado una función que me permite
    //conseguir el objeto tieda que quiero en función
    //del nombre pasado a handle que será a su vez el id del botón
    //al que pulso para ver los productos de la tienda.
    //Ese objeto tienda lo paso a su vez al getShopProducts
    //para poder conseguir los productos de dicha tienda.
    //Y ese generador lo paso a listProducts para poder pintar dichos productos
    //en el HTML.
    handleProductsStoreList = (nombre) => {
        let tienda = this.#storeHouseModel.getShop(nombre);

        let usuarioCookie = getCookie("userDaniestore");
        let contrasenaCookie = getCookie("passDaniestore");

        let adminMode = false;
        if (usuarioCookie === "admin" && contrasenaCookie === "admin") {
            adminMode = true;
            this.#storeHouseView.listProducts(this.#storeHouseModel.getShopProducts(tienda), adminMode);
        }
        else {
            this.#storeHouseView.listProducts(this.#storeHouseModel.getShopProducts(tienda), adminMode);
        }
    }

    //Recojo de bindDetalleProductos el id del botón que pulsemos y con ello
    //obtengo el objeto producto relacionado con ese nombre que recogemos en el id.
    //Ese objeto, en función del tipo que sea, llamaremos a un mostraDetalles u otro.
    handleshowDetailsProducts = (nombre) => {
        let producto = this.#storeHouseModel.getProduct(nombre);

        let iteradorTiendas = this.#storeHouseModel.shops;

        if (producto instanceof Videojuegos) {
            this.#storeHouseView.mostrarDetallesVideojuegos(producto, iteradorTiendas);
        }
        else if (producto instanceof Consolas) {
            this.#storeHouseView.mostrarDetallesConsolas(producto, iteradorTiendas);
        }
        else if (producto instanceof Accesorios) {
            this.#storeHouseView.mostrarDetallesAccesorios(producto, iteradorTiendas);
        }
    }

    //Recojo de bindProductosNuevaVentana el id del botón que pulsemos y con ello
    //obtengo el objeto producto relacionado con ese nombre que recogemos en el id.
    //Ese objeto, en función del tipo que sea, llamaremos a un mostraDetalles u otro.
    handleProductosNuevaVentana = (nombre) => {
        let producto = this.#storeHouseModel.getProduct(nombre);
        let iteradorTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarDetallesNuevaVentana(producto, iteradorTiendas);

        /*
        Esta opción hacía lo mismo, pero en su lugar chequeaba en el Controller el tipo
        de producto y luego iba llamanado a la función pintar pertinente. De la forma que lo he dejado
        creo que queda mas elegante.

        if (producto instanceof Videojuegos) {
            this.#storeHouseView.mostrarDetallesVideojuegosNuevaVentana(producto);
        }
        else if (producto instanceof Consolas) {
            this.#storeHouseView.mostrarDetallesConsolasNuevaVentana(producto);
        }
        else if (producto instanceof Accesorios) {
            this.#storeHouseView.mostrarDetallesAccesoriosNuevaVentana(producto);
        }
        */
    }

    //El handler llamará a la función mostrarFormularioConsola y pintará el formulario
    //de insercción del producto en el main de la web.
    handlerFormularioConsola = () => {
        this.#storeHouseView.mostrarFormularioConsola();
    }

    //Recoge los campos del formulario asociado. Con ellos crea un objeto producto (Consola) y realiza
    //las acciones pertinentes para introducirlo en el modelo.
    //Al final, se muestra la pantalla inicial de la web pero la misma (si se comprueba su seccion) aparecerá
    //el producto creado.
    handlerValidacionConsolaNueva = (serialNumberForm, nameForm, companiaForm, descipcionForm, precioForm, impuestosForm, picsForm, tipoForm, formatoForm) => {
        impuestosForm = parseInt(impuestosForm);
        let objNuevo = new Consolas(serialNumberForm, nameForm, companiaForm, descipcionForm, precioForm, impuestosForm, picsForm, tipoForm, formatoForm);

        let category = this.#storeHouseModel.getCategory("Consolas");

        this.#storeHouseModel.addProduct(objNuevo, category);

        let iteradorElemTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaElemTiendas(iteradorElemTiendas);
    }

    //El handler llamará a la función mostrarFormularioVideojuego y pintará el formulario
    //de insercción del producto en el main de la web.
    handlerFormularioVideojuego = () => {
        this.#storeHouseView.mostrarFormularioVideojuego();
    }

    //Recoge los campos del formulario asociado. Con ellos crea un objeto producto (Videojuego) y realiza
    //las acciones pertinentes para introducirlo en el modelo.
    //Al final, se muestra la pantalla inicial de la web pero la misma (si se comprueba su seccion) aparecerá
    //el producto creado.
    handlerValidacionVideojuegoNuevo = (serialNumberForm, nameForm, companiaForm, descipcionForm, precioForm, impuestosForm, picsForm, generoForm, dlcForm) => {
        impuestosForm = parseInt(impuestosForm);
        let objNuevo = new Videojuegos(serialNumberForm, nameForm, companiaForm, descipcionForm, precioForm, impuestosForm, picsForm, generoForm, dlcForm);

        let category = this.#storeHouseModel.getCategory("Juegos");

        this.#storeHouseModel.addProduct(objNuevo, category);

        let iteradorElemTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaElemTiendas(iteradorElemTiendas);
    }

    //El handler llamará a la función mostrarFormularioAccesorio y pintará el formulario
    //de insercción del producto en el main de la web.
    handlerFormularioAccesorio = () => {
        this.#storeHouseView.mostrarFormularioAccesorio();
    }

    //Recoge los campos del formulario asociado. Con ellos crea un objeto producto (Accesorio) y realiza
    //las acciones pertinentes para introducirlo en el modelo.
    //Al final, se muestra la pantalla inicial de la web pero la misma (si se comprueba su seccion) aparecerá
    //el producto creado.
    handlerValidacionAccesorioNuevo = (serialNumberForm, nameForm, companiaForm, descipcionForm, precioForm, impuestosForm, picsForm, colorForm, plataformaForm) => {
        impuestosForm = parseInt(impuestosForm);

        let objNuevo = new Accesorios(serialNumberForm, nameForm, companiaForm, descipcionForm, precioForm, impuestosForm, picsForm, colorForm, plataformaForm);

        let category = this.#storeHouseModel.getCategory("Accesorios");

        this.#storeHouseModel.addProduct(objNuevo, category);

        let iteradorElemTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaElemTiendas(iteradorElemTiendas);
    }

    //El handler llamará a la función mostrarFormularioCategoria y pintará el formulario
    //de insercción de categoria en el main de la web.
    handlerFormularioCategoria = () => {
        this.#storeHouseView.mostrarFormularioCategoria();
    }

    //Recoge los campos del formulario asociado. Con ellos crea un objeto Categoria y realiza
    //las acciones pertinentes para introducirlo en el modelo.
    //Al final, se muestra la pantalla inicial de la web pero la misma (si se comprueba su seccion) aparecerá
    //la categoria creada. También aparecerá en el Nav.
    handlerValidacionCategoriaNuevo = (titleForm, descriptionForm, idForm) => {
        let objNuevo = new Category(titleForm, descriptionForm, idForm);

        this.#storeHouseModel.addCategory(objNuevo);

        let iteradorCategorias = this.#storeHouseModel.categories;
        this.#storeHouseView.mostrarVistaMenuCategorias(iteradorCategorias);
        let iteradorElemTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaElemTiendas(iteradorElemTiendas);
    }

    //El handler llamará a la función mostrarFormularioTienda y pintará el formulario
    //de insercción de tienda en el main de la web.
    handlerFormularioTienda = () => {
        this.#storeHouseView.mostrarFormularioTienda();
    }

    //Recoge los campos del formulario asociado. Con ellos crea un objeto Store y realiza
    //las acciones pertinentes para introducirlo en el modelo.
    //Al final, se muestra la pantalla inicial de la web pero la misma (si se comprueba su seccion) aparecerá
    //la tienda creada. También aparecerá en el Nav.
    handlerValidacionTiendaNuevo = (cifForm, nameForm, direccionForm, telefonoForm, latitudForm, longitudForm, picsForm, idForm) => {
        let objCoordNuevo = new Coords(latitudForm, longitudForm);
        let objNuevo = new Store(cifForm, nameForm, direccionForm, telefonoForm, objCoordNuevo, picsForm, idForm);

        this.#storeHouseModel.addShop(objNuevo);

        let iteradorTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaMenuTiendas(iteradorTiendas);
        let iteradorElemTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaElemTiendas(iteradorElemTiendas);
    }

    //El handler llamará a la función mostrarEliminarTienda y pintará el formulario
    //de eliminación de tienda en el main de la web.
    handlerEliminarTienda = () => {
        let tienda = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarEliminarTienda(tienda);
    }

    //Recoge los campos del formulario asociado. Con ello realiza las operaciones pertinentes
    //de borrado de tienda.
    //Al final, se muestra la pantalla inicial de la web pero la misma (si se comprueba su seccion) aparecerá
    //la tienda eliminada. También desaparecerá en el Nav.
    handlerValidacionEliminarTienda = (tiendaForm) => {

        let tienda = this.#storeHouseModel.getShop(tiendaForm);
        this.#storeHouseModel.removeShop(tienda);

        let iteradorTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaMenuTiendas(iteradorTiendas);
        let iteradorElemTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaElemTiendas(iteradorElemTiendas);
    }

    //El handler llamará a la función mostrarEliminarCategoria y pintará el formulario
    //de eliminación de categoria en el main de la web.
    handlerEliminarCategoria = () => {
        let categoria = this.#storeHouseModel.categories;
        this.#storeHouseView.mostrarEliminarCategoria(categoria);
    }

    //Recoge los campos del formulario asociado. Con ello realiza las operaciones pertinentes
    //de borrado de categoria.
    //Al final, se muestra la pantalla inicial de la web pero la misma (si se comprueba su seccion) desaparecerá
    //la categoria eliminada. También desaparecerá en el Nav.
    handlerValidacionEliminarCategoria = (categoriaForm) => {

        let category = this.#storeHouseModel.getCategory(categoriaForm);
        this.#storeHouseModel.removeCategory(category);

        let iteradorCategorias = this.#storeHouseModel.categories;
        this.#storeHouseView.mostrarVistaMenuCategorias(iteradorCategorias);

        let iteradorElemTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaElemTiendas(iteradorElemTiendas);
    }

    //El handler llamará a la función mostrarEliminarProducto y pintará el formulario
    //de eliminación de producto en el main de la web.
    handlerEliminarProducto = () => {
        let producto = this.#storeHouseModel.categories;
        this.#storeHouseView.mostrarEliminarProducto(producto);
    }

    //Recoge los campos del formulario asociado. Con ello realiza las operaciones pertinentes
    //de borrado de producto.
    //Al final, se muestra la pantalla inicial de la web pero la misma (si se comprueba su seccion) desaparecerá
    //el producto eliminado.
    handlerValidacionEliminarProducto = (productoForm) => {
        let producto = this.#storeHouseModel.listProducts(productoForm);
        this.#storeHouseModel.removeProduct(producto);

        let iteradorElemTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaElemTiendas(iteradorElemTiendas);
    }

    //El handler llamará a la función mostrarDefectoProducto y pintará el formulario
    //de vinculación de producto en el main de la web.
    handlerDefectoProducto = () => {
        let producto = this.#storeHouseModel.categories;
        let tienda = this.#storeHouseModel.shops;

        this.#storeHouseView.mostrarDefectoProducto(producto, tienda);
    }

    //Recoge los campos del formulario asociado. Con ello realiza las operaciones pertinentes
    //de vinculado de producto.
    //Al final, se muestra la pantalla inicial de la web pero la misma (si se comprueba su seccion) aparecerá
    //el producto vinculado en la tienda pertinente.
    handlerValidacionDefectoProducto = (productoForm, tiendaForm, stockForm) => {
        let producto = this.#storeHouseModel.listProducts(productoForm);
        let tienda = this.#storeHouseModel.getShop(tiendaForm);
        stockForm = parseInt(stockForm);

        this.#storeHouseModel.addProductInShop(producto, tienda, stockForm);

        let iteradorElemTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaElemTiendas(iteradorElemTiendas);
    }

    //El handler llamará a la función mostrarStockProducto y pintará el formulario
    //de manejar stock de producto en el main de la web.
    handlerStockProducto = () => {
        let producto = this.#storeHouseModel.categories;
        let tienda = this.#storeHouseModel.shops;

        this.#storeHouseView.mostrarStockProducto(producto, tienda);
    }

    //Recoge los campos del formulario asociado. Con ello realiza las operaciones pertinentes
    //de vinculado de producto.
    //Al final, se muestra la pantalla inicial de la web pero la misma (si se comprueba su seccion) aparecerá
    //el producto vinculado en la tienda pertinente.
    handlerValidacionStockProducto = (productoForm, tiendaForm, stockForm) => {
        let producto = this.#storeHouseModel.listProducts(productoForm);

        let tienda = this.#storeHouseModel.getShop(tiendaForm);
        stockForm = parseInt(stockForm);

        this.#storeHouseModel.addQuantityProductInShop(producto, tienda, stockForm);

        let iteradorElemTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaElemTiendas(iteradorElemTiendas);
    }

    //Recoge los campos del formulario de Login. Checkeo que el user y el pass son los que se piden en el enunciado.
    //Si son correctos, se crea la cookie ("nombreCookie", "valor que guarda", "nº de dias que se almacena").
    //Posteriormente, muestro un mensaje de alerta (forma sencilla) para indicar que el logeo se ha relizado de forma correcta.
    //Tras realizar la carga, hago aparecer el boton desconectar y desaparecer el formulario de login.

    handlerLoginValidacion = (usuario, contrasena) => {
        if (usuario !== "admin" || contrasena !== "admin") {
            alert("El usuario o la contraseña no son correctos.");
        }
        else {
            alert("Hola Admin!!! Te has logueado Correctamente :)");
            setCookie("userDaniestore", "admin", 1);
            setCookie("passDaniestore", "admin", 1);

            let loginForm = document.getElementById("loginForm");
            let logoutBoton = document.getElementById("logout");
            let mostrarFavBoton = document.getElementById("productosFavoritos");
            loginForm.style.display = "none";
            logoutBoton.style.display = "inline-block";
            mostrarFavBoton.style.display = "inline-block";
        }
    }

    //Pongo valores a "cero" para la cookie. De este modo, estoy borrando la cookie.
    //Tras realizar el borrado, hago desaparecer el boton desconectar y aparecer el formulario de login.

    handlerLogOut = () => {
        setCookie("userDaniestore", "", 0);
        setCookie("passDaniestore", "", 0);
        alert("Te has desconectado. Hasta pronto!!!");
        let loginForm = document.getElementById("loginForm");
        let logoutBoton = document.getElementById("logout");
        let mostrarFavBoton = document.getElementById("productosFavoritos");
        loginForm.style.display = "inline-block";
        logoutBoton.style.display = "none";
        mostrarFavBoton.style.display = "none";
    }

    handlerProductosFavoritos = (nombreProducto) => {
        let objProducto = this.#storeHouseModel.getProduct(nombreProducto);
        if (localStorage.getItem("arrayFavoritos") != null) {

            let arrayFavoritos = localStorage.getItem("arrayFavoritos").split(",");

            let index = arrayFavoritos.findIndex((elem) => {
                return elem === objProducto.serialNumber;
            });

            console.log(objProducto.serialNumber);
            console.log(index);
            if (index === -1) {
                arrayFavoritos.push(objProducto.serialNumber);
                localStorage.setItem("arrayFavoritos", arrayFavoritos);
            }
        }
        else {
            let arrayFavoritos = [];
            arrayFavoritos.push(objProducto.serialNumber);
            localStorage.setItem("arrayFavoritos", arrayFavoritos);
        }
    }

    handlerMostrarFavoritos = () => {
        if (localStorage.getItem("arrayFavoritos") !== null) {
            let arrayFavoritos = localStorage.getItem("arrayFavoritos").split(",");
            let productosArray = [];
            arrayFavoritos.forEach(element => {
                let producto = this.#storeHouseModel.getProductBySerial(element);
                productosArray.push(producto);
            });

            this.#storeHouseView.listProducts(this.#storeHouseModel.generadorProductos(productosArray));
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let re = new RegExp('(?:(?:^|.*;\\s*)' + cname +
        '\\s*\\=\\s*([^;]*).*$)|^.*$');
    return document.cookie.replace(re, "$1");
}


export { storeHouseController };