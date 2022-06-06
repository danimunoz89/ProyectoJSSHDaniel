import { SHSingleton } from "./storeHouseModel.js";
import { Videojuegos } from "./storeHouseModel.js";
import { Accesorios } from "./storeHouseModel.js";
import { Consolas } from "./storeHouseModel.js";

//Conjunto de variables que inicializo y que usaré para realizar el checkeo y validación
//de los campos de los formularios.
let serialNumberOK;
let nombreOK;
let precioOK;
let impuestosOK;
let picsOK;
let tipoOK;
let formatoOK;
let generoOK;
let dlcOK;
let colorOK;
let plataformaOK;
let titleOK;
let descriptionOK;
let idOK;
let nameOK;
let cifOK;
let direccionOK;
let telefonoOK;
let latitudOK;
let longitudOK;
let tiendaOK;
let categoriaOK;
let productoOK;
let stockOK;
let usuarioOK;
let contrasenaOK;
let fsnumber;
let fname;
let fcompania;
let fprice;
let ftax;
let fimage;
let ftipo;
let fformato;
let fgenero;
let fdlc;
let fcolor;
let fplataforma;
let fid;
let ftitle;
let fdescription;
let fcif;
let fdireccion;
let ftelefono;
let flongitud;
let flatitud;
let ftienda;
let fcategoria;
let fproducto;
let fproductoid;
let fstock;
let fusuario;
let fcontrasena;

class storeHouseView {

    #excecuteHandler(handler, handlerArguments, scrollElement, data, url, event) {
        handler(...handlerArguments);
        $(scrollElement).get(0).scrollIntoView();
        history.pushState(data, null, url);
        event.preventDefault();
    }

    constructor() {
        //Contenedores HTML donde irán pintándose los elementos
        this.categories = $('#categoriasListadoNav');
        this.shops = $('#tiendasListadoNav');
        this.main = $('#cajonElementos');
        this.websAbiertas = [];
    }

    //Cuando haga click en el elemento Inicio del navbar, o en el logo de la web
    //se recargará la página, provocando que vuelvan a salir
    //las tiendas que deben salir al inicio de la misma sin modificarse
    //los datos que pudieramos ir almacenando dinámicamente via formularios.
    bindInicio(handleCargaTiendas) {
        /*
        $("#inicio1").click(function () {
            handleCargaTiendas();
        })

        $("#inicio2").click(function () {
            handleCargaTiendas();
        })
        */

        $('#inicio1').click((event) => {
            this.#excecuteHandler(handleCargaTiendas, [], this.main, { action: 'init' }, '#', event);
        });

        $('#inicio2').click((event) => {
            this.#excecuteHandler(handleCargaTiendas, [], this.main, { action: 'init' }, '#', event);
        });
    }

    //Cuando el documento esté listo se llamará al handleCargaTiendas
    //que permitirá mostrar las tiendas.
    bindCargaTiendas(handleCargaTiendas) {
        $(document).ready(function () {
            handleCargaTiendas();
        })
    }

    //mostrarVistaElemTiendas será el encargado de pintar las tiendas
    mostrarVistaElemTiendas(iteradorCategorias) {
        //main hace referencia a la zona que queremos pintar (ver constructor)
        this.main.empty();
        for (let value of iteradorCategorias) {
            //Evito que salga la tienda por defecto a través del cif
            if (value.shop.cif !== 789456) {
                //Dentro del card de bootstrap introduzco elementos
                //de las tiendas que he ido recorriendo con el iterador.
                this.main.append(
                    `<div class="card" style="width: 18rem;">
                    <img src="img/${value.shop.images}" alt="fotoTienda" title="${value.shop.name}"
                        class="w-50 mt-5 mx-auto d-block">
                    <div class="card-body">
                        <h5 class="card-title text-center">${value.shop.name}</h5>
                        <p class="card-text text-center">${value.shop.address}</p>
                        <button type="button" class="btn btn-primary mx-auto d-block botontienda" data-tienda = "${value.shop.cif}">
                            Ver Productos
                        </button>
                    </div>
                    </div>`
                )
            }
        }
    }

    //Cuando el documento esté listo se llamará al handleMenuCategories
    bindMenuCategorias(handleMenuCategories) {
        $(document).ready(function () {
            handleMenuCategories();
        })
    }

    //Con mostrarVistaMenuCategorias voy a pintar en el navbar 
    //las distintas categorías
    //que hemos insertado en el StoreHouseController.js
    mostrarVistaMenuCategorias(iteradorCategorias) {
        //categories hace referencia a la zona que queremos pintar (ver constructor)
        this.categories.empty();
        for (let value of iteradorCategorias) {
            //Evito que salga la categoría por defecto
            if (value.category.title !== "Cat.Defecto") {
                this.categories.append(
                    `<a href="javascript:void(0)" class="elemCategory" data-categoria = "${value.category.id}">${value.category.title}</a>`
                )
            }
        }
    }

    //Cuando el documento esté listo se llamará al handleMenuShops
    bindMenuTiendas(handleMenuShops) {
        $(document).ready(function () {
            handleMenuShops();
        })
    }

    //Con mostrarVistaMenuTiendas voy a pintar en el navbar 
    //las distintas tiendas
    //que hemos insertado en el StoreHouseController.js
    mostrarVistaMenuTiendas(iteradorTiendas) {
        //shops hace referencia a la zona que queremos pintar (ver constructor)
        this.shops.empty();
        for (let value of iteradorTiendas) {
            //Evito que salga la tienda por defecto a través del cif
            if (value.shop.cif !== 789456) {
                this.shops.append(
                    `<a href="#" class="elemShop" data-tienda = "${value.shop.cif}">${value.shop.name}</a>`
                )
            }
        }
    }

    //Cuando pulsemos en alguna de las opciones del nav categorias
    //recogeremos el id del botón y en función del mismo
    //le paso al handle el tipo de categoría para poder sacar el objeto categoria
    //que permitirá sacar los productos de ese tipo. 
    bindProductsCategoryList(handleProductsCategoryList) {
        $("#categoriasListadoNav").on('click', ".elemCategory", (event) => {
            let idCategoria = $(event.target).closest($(".elemCategory")).get(0).dataset.categoria;
            this.#excecuteHandler(handleProductsCategoryList, [idCategoria], this.main, { action: 'cargarCategorias', idCategoria: idCategoria }, '#ProductosCategorias', event);
        });
    }

    //Cuando pulsemos en alguna de las opciones del nav tiendas
    //recogeremos el id del botón.
    //Ese id se lo paso al handle para poder sacar el objeto tienda
    //que permitirá sacar los productos incluidos en la misma. 
    bindProductsStoreList(handleProductsStoreList) {
        $("#tiendasListadoNav").on('click', ".elemShop", (event) => {
            let idTienda = $(event.target).closest($(".elemShop")).get(0).dataset.tienda;
            this.#excecuteHandler(handleProductsStoreList, [idTienda], this.main, { action: 'cargarTiendas', idTienda: idTienda }, '#ProductosTiendas', event);
        });
    }

    //Cuando pulse uno de los botones dinámicos generados que contengan el class
    //.botontienda se recoje el id que pasaré al handleProductsStoreList para poder obtener
    //el objeto tienda necesario para poder mostrar los productos asociados a la misma.

    bindProductsStoreMenuList(handleProductsStoreList) {
        /*
        $(this.main).on('click', ".botontienda", function () {
            let id = $(this).attr("id");
            handleProductsStoreList(id);
        });
        */

        $(this.main).on('click', ".botontienda", (event) => {
            let idTienda = $(event.target).closest($(".botontienda")).get(0).dataset.tienda;
            this.#excecuteHandler(handleProductsStoreList, [idTienda], this.main, { action: 'cargarTiendasMenu', idTienda: idTienda }, '#ProductosTiendas', event);
        });
    }

    //Esta función será la encargada de pintar en el main los productos incluidos
    //en las tiendas.
    listProducts(generadorProductos, adminMode) {
        this.main.empty();
        for (let value of generadorProductos) {
            if (adminMode) {
                this.main.append(
                    `<div class="card" style="width: 18rem;">
                        <img src="img/${value.images}"  alt="fotoProducto" title="${value.name}"
                            class="w-50 mt-5 mx-auto d-block">
                        <div class="card-body">
                            <h5 class="card-title text-center">${value.name}</h5>
                            <p class="card-text text-center">${value.price} €</p>
                            <!-- Este botón me mostrará en la misma página la información del producto -->
                            <button type="button" class="btn btn-primary mx-auto mb-3 d-block detallesProducto" data-producto = "${value.name}" id="${value.name}">
                                Ver Descripción
                            </button>
                            <!-- Este botón me llevará a una página nueva mostrando la información del producto -->
                            <button type="button" class="btn btn-primary mx-auto mb-3 d-block detallesProductoPaginaNueva" id="${value.name}">
                            Ver Descripción Página Nueva
                            </button>
                            <!-- Este botón me servirá para llevar el producto a favoritos -->
                            <button type="button" class="btn btn-primary mx-auto mb-3 d-block favoritosProducto" data-producto = "${value.name}" id="favorito">
                            Agregar Producto a Favoritos
                            </button>
                        </div>
                    </div>`
                )
            }
            else {
                this.main.append(
                    `<div class="card" style="width: 18rem;">
                        <img src="img/${value.images}"  alt="fotoProducto" title="${value.name}"
                            class="w-50 mt-5 mx-auto d-block">
                        <div class="card-body">
                            <h5 class="card-title text-center">${value.name}</h5>
                            <p class="card-text text-center">${value.price} €</p>
                            <!-- Este botón me mostrará en la misma página la información del producto -->
                            <button type="button" class="btn btn-primary mx-auto mb-3 d-block detallesProducto" data-producto = "${value.name}" id="${value.name}">
                                Ver Descripción
                            </button>
                            <!-- Este botón me llevará a una página nueva mostrando la información del producto -->
                            <button type="button" class="btn btn-primary mx-auto mb-3 d-block detallesProductoPaginaNueva" id="${value.name}">
                            Ver Descripción Página Nueva
                            </button>
                        </div>
                    </div>`
                )
            }
        }
    }

    //Cuando pulse uno de los botones dinámicos generados que contengan el class
    //.detallesproducto se recoje el id que pasaré al handle para poder obtener
    //el objeto producto necesario para poder mostrar las descripciones de los productos.
    bindDetalleProductos(handleshowDetailsProducts) {
        $(this.main).on('click', ".detallesProducto", (event) => {
            let nombreProducto = $(event.target).closest($(".detallesProducto")).get(0).dataset.producto;
            this.#excecuteHandler(handleshowDetailsProducts, [nombreProducto], this.main, { action: 'cargarDetalles', nombreProducto: nombreProducto }, '#DetallesProducto', event);
        });
    }

    //Las siguientes funciones serán las encargadas de pintar
    //en el main los detalles de los productos incluidos en las tiendas en función del tipo de producto
    //que sea el objeto que hemos obtenido en el handle gracias al id del botón pulsado.
    mostrarDetallesVideojuegos(products, iteradorTiendas) {
        let stock;

        for (let value of iteradorTiendas) {
            for (let elem of value.products) {
                if (elem.product === products.serialNumber) {
                    stock = elem.quantity;
                }
            }
        }

        this.main.empty();
        this.main.append(
            `<div class="card" style="width: 18rem;">
            <img src="img/${products.images}"  alt="fotoProducto" title="${products.name}"
                class="w-50 mt-5 mx-auto d-block">
            <div class="card-body">
                <h5 class="card-title text-center">${products.name}</h5>
                <p class="card-text text-center"><b>Número de Serie:</b> ${products.serialNumber}</p>
                <p class="card-text text-center"><b>Descripción:</b> ${products.description}</p>
                <p class="card-text text-center"><b>Género:</b> ${products.genero}</p>
                <p class="card-text text-center"><b>DLCs:</b> ${products.dlc}</p>
                <p class="card-text text-center"><b>Precio:</b> ${products.price} €</p>
                <p class="card-text text-center"><b>Impuestos:</b> ${products.tax} %</p>
                <p class="card-text text-center"><b>Stock:</b> ${stock}</p>
            </div>
            </div>`
        )
    }

    mostrarDetallesConsolas(products, iteradorTiendas) {
        let stock;

        for (let value of iteradorTiendas) {
            for (let elem of value.products) {
                if (elem.product === products.serialNumber) {
                    stock = elem.quantity;
                }
            }
        }

        this.main.empty();
        this.main.append(
            `<div class="card" style="width: 18rem;">
            <img src="img/${products.images}"  alt="fotoProducto" title="${products.name}"
                class="w-50 mt-5 mx-auto d-block">
            <div class="card-body">
                <h5 class="card-title text-center">${products.name}</h5>
                <p class="card-text text-center"><b>Número de Serie:</b> ${products.serialNumber}</p>
                <p class="card-text text-center"><b>Descripción:</b> ${products.description}</p>
                <p class="card-text text-center"><b>Tipo:</b> ${products.tipo}</p>
                <p class="card-text text-center"><b>Formato:</b> ${products.formato}</p>
                <p class="card-text text-center"><b>Precio:</b> ${products.price} €</p>
                <p class="card-text text-center"><b>Impuestos:</b> ${products.tax} %</p>
                <p class="card-text text-center"><b>Stock:</b> ${stock}</p>
            </div>
            </div>`
        )
    }

    mostrarDetallesAccesorios(products, iteradorTiendas) {
        let stock;

        for (let value of iteradorTiendas) {
            for (let elem of value.products) {
                if (elem.product === products.serialNumber) {
                    stock = elem.quantity;
                }
            }
        }
        this.main.empty();
        this.main.append(
            `<div class="card" style="width: 18rem;">
            <img src="img/${products.images}"  alt="fotoProducto" title="${products.name}"
                class="w-50 mt-5 mx-auto d-block">
            <div class="card-body">
                <h5 class="card-title text-center">${products.name}</h5>
                <p class="card-text text-center"><b>Número de Serie:</b> ${products.serialNumber}</p>
                <p class="card-text text-center"><b>Descripción:</b> ${products.description}</p>
                <p class="card-text text-center"><b>Plataforma:</b> ${products.plataforma}</p>
                <p class="card-text text-center"><b>Color:</b> ${products.color}</p>
                <p class="card-text text-center"><b>Precio:</b> ${products.price} €</p>
                <p class="card-text text-center"><b>Impuestos:</b> ${products.tax} %</p>
                <p class="card-text text-center"><b>Stock:</b> ${stock}</p>
            </div>
            </div>`
        )
    }

    //Cuando pulse uno de los botones dinámicos generados que contengan el class
    //.detallesProductoPaginaNueva se recoje el id que pasaré al handleProductosNuevaVentana
    //para poder obtener el objeto tienda necesario para poder mostrar 
    //los productos asociados a la misma.
    //Además, pusheo la ventana en el array websAbiertas para poder borrar las webs
    //abiertas mas adelante.

    bindProductosNuevaVentana(handleProductosNuevaVentana) {
        $(this.main).on('click', ".detallesProductoPaginaNueva", function () {
            let nombre = $(this).attr("id");
            handleProductosNuevaVentana(nombre);
        });
    }

    mostrarDetallesNuevaVentana(products, iteradorTiendas) {
        let stock;

        for (let value of iteradorTiendas) {
            for (let elem of value.products) {
                if (elem.product === products.serialNumber) {
                    stock = elem.quantity;
                }
            }
        }

        let ventanaNueva = null;
        let titleID;
        let index = -1;

        do {
            titleID = "DescripcionProducto" + Math.random();
            index = this.websAbiertas.findIndex((elem) => {
                return elem.titleID === titleID;
            });
        } while (index !== -1);

        ventanaNueva = window.open("", titleID, "width=640, height=640, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");

        ventanaNueva.document.write(
            `<!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="css/normalize.css">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <link rel="stylesheet" href="css/auxPage.css">
                <title>Daniestore -- Descripción Producto</title>
            </head>
            <body class="body">
            <!--Header-->
            <header class="header">
                <a href="./index.html" class="header__logo">
                    <img src="img/logobuenobuenobueno.png" class="menu" alt="logo" title="Inicio">
                </a>
            </header>`
        );

        if (products instanceof Videojuegos) {
            let videojuego = (
                `<!--Cuerpo de la web-->
            <main class="main">  
                <!--Parte Principal-->
                <div class=main__div>
                <div class="card" style="width: 18rem;">
                <img src="img/${products.images}"  alt="fotoProducto" title="${products.name}"
                    class="w-50 mt-5 mx-auto d-block">
                <div class="card-body">
                    <h5 class="card-title text-center">${products.name}</h5>
                    <p class="card-text text-center"><b>Número de Serie:</b> ${products.serialNumber}</p>
                    <p class="card-text text-center"><b>Descripción:</b> ${products.description}</p>
                    <p class="card-text text-center"><b>Género:</b> ${products.genero}</p>
                    <p class="card-text text-center"><b>DLCs:</b> ${products.dlc}</p>
                    <p class="card-text text-center"><b>Precio:</b> ${products.price} €</p>
                    <p class="card-text text-center"><b>Impuestos:</b> ${products.tax} %</p>
                    <p class="card-text text-center"><b>Stock:</b> ${stock}</p>
                </div>
                </div>
                </div>
        
            </main>
            
            <script src="../js/storeHouse/storeHouseApp.js" type="module"></script>
        </body>
        </html>`);

            ventanaNueva.document.body.insertAdjacentHTML("afterbegin", videojuego);

        }
        else if (products instanceof Consolas) {

            let consola = (
                `<!--Cuerpo de la web-->
                <main class="main">
            
                    <!--Parte Principal-->
                    <div class=main__div>
                    <div class="card" style="width: 18rem;">
                    <img src="img/${products.images}"  alt="fotoProducto" title="${products.name}"
                        class="w-50 mt-5 mx-auto d-block">
                    <div class="card-body">
                        <h5 class="card-title text-center">${products.name}</h5>
                        <p class="card-text text-center"><b>Número de Serie:</b> ${products.serialNumber}</p>
                        <p class="card-text text-center"><b>Descripción:</b> ${products.description}</p>
                        <p class="card-text text-center"><b>Tipo:</b> ${products.tipo}</p>
                        <p class="card-text text-center"><b>Formato:</b> ${products.formato}</p>
                        <p class="card-text text-center"><b>Precio:</b> ${products.price} €</p>
                        <p class="card-text text-center"><b>Impuestos:</b> ${products.tax} %</p>
                        <p class="card-text text-center"><b>Stock:</b> ${stock}</p>
                    </div>
                    </div>
                    </div>
            
                </main>
                
                <script src="../js/storeHouse/storeHouseApp.js" type="module"></script>
            </body>
            
            </html>`);

            ventanaNueva.document.body.insertAdjacentHTML("afterbegin", consola);
        }
        else if (products instanceof Accesorios) {
            let accesorio = (
                `<!--Cuerpo de la web-->
                <main class="main">
            
                    <!--Parte Principal-->
                    <div class=main__div>
                    <div class="card" style="width: 18rem;">
                    <img src="./img/${products.images}"  alt="fotoProducto" title="${products.name}"
                        class="w-50 mt-5 mx-auto d-block">
                    <div class="card-body">
                        <h5 class="card-title text-center">${products.name}</h5>
                        <p class="card-text text-center"><b>Número de Serie:</b> ${products.serialNumber}</p>
                        <p class="card-text text-center"><b>Descripción:</b> ${products.description}</p>
                        <p class="card-text text-center"><b>Plataforma:</b> ${products.plataforma}</p>
                        <p class="card-text text-center"><b>Color:</b> ${products.color}</p>
                        <p class="card-text text-center"><b>Precio:</b> ${products.price} €</p>
                        <p class="card-text text-center"><b>Impuestos:</b> ${products.tax} %</p>
                        <p class="card-text text-center"><b>Stock:</b> ${stock}</p>
                    </div>
                    </div>
                    </div>
            
                </main>
                
                <script src="../js/storeHouse/storeHouseApp.js" type="module"></script>
            </body>
            
            </html>`);

            ventanaNueva.document.body.insertAdjacentHTML("afterbegin", accesorio);
        }
        this.websAbiertas.push(ventanaNueva);
    }

    //Cuando pulse el boton "Cerrar Ventanas" que contiene el ID
    //#botonCerrar se recoje el array websAbiertas que se va rellenando conforme se abren las ventanas
    //con las descripciones de los productos.
    //Ese array lo recorro con un foreach y voy cerrando en orden cada una de las webs que he ido
    //abriendo. Al finalizar, se limpia el array websAbiertas.

    bindCerrarVentanas() {
        $("#botonCerrar").click(() => {
            this.websAbiertas.forEach(element => {
                element.close();
            });
        })
        this.websAbiertas = [];
    }

    //
    //
    // FORMULARIOS
    //
    //

    //Cuando pulse el botón "Añadir Consola" llamaré al handler "handlerFormularioConsola".
    //Este será el encargado de, mediante mostrarFormularioConsola(), pintar en el main el formulario
    //para insertar un producto consola.

    bindFormularioConsola(handlerFormularioConsola) {
        $('#formularioConsola').click((event) => {
            this.#excecuteHandler(handlerFormularioConsola, [], this.main, { action: 'formularioConsola' }, '#FormularioConsola', event);
        });
    }

    mostrarFormularioConsola() {
        this.main.empty();
        this.main.append(
            `<form class="form-card" name = "consoleFormulario" id="consoleFormulario" method = "post" enctype="multipart/form-data">
            <h1 class="text-center">FORMULARIO CONSOLAS</h1>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Serial Number<span class="text-danger"> *</span></label> <input type="text" id="fsnumber" name="fsnumber" placeholder="Introduce el serial number"><div id="veri"></div></div>
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Nombre<span class="text-danger"> *</span></label> <input type="text" id="fname" name="fname" placeholder="Introduce el nombre"> <div id="veri"></div></div>
            </div>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Compañia<span class="text-danger"></span></label> <input type="text" id="fcompania" name="fcompania" placeholder="Introduce la Compañia"> <div id="veri"></div> </div>
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Descripción<span class="text-danger"></span></label> <input type="text" id="fdescription" name="fdescription" placeholder="Introduce una descripción"> <div id="veri"></div> </div>
            </div>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Precio<span class="text-danger"> *</span></label> <input type="number" id="fprice" name="fprice" placeholder="Introduce un precio"><div id="veri"></div></div>
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Impuestos<span class="text-danger"> *</span></label>
                <select class="form-select" id="ftax" name="ftax" aria-label="Default select example">
                <option selected>Selecciona un tipo de impuesto</option>
                <option value="4">4</option>
                <option value="10">10</option>
                <option value="21">21</option>
                </select>
                <div id="veriSelect"></div>
                </div>
            </div>
            <div class="row justify-content-between text-left">
                <div class="form-group col-12 flex-column d-flex"> <label class="form-control-label px-3">Subir Imagen<span class="text-danger"> *</span></label> <input type="file" id="fimage" name="fimage"><div id="veri"></div></div>
            </div>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Tipo<span class="text-danger"> *</span></label> 
                <select class="form-select" id="ftipo" name="ftipo" aria-label="Default select example">
                <option selected>Selecciona un formato de consola</option>
                <option value="sobremesa">sobremesa</option>
                <option value="portatil">portatil</option>
                </select> 
                <div id="veriSelect"></div>
                </div>
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Formato<span class="text-danger"> *</span></label> 
                <select class="form-select" id="fformato" name="fformato" aria-label="Default select example">
                <option selected>Selecciona un tipo formato de juegos que lee</option>
                <option value="disco">disco</option>
                <option value="cartucho">cartucho</option>
                <option value="digital">digital</option>
                </select>
                <div id="veriSelect"></div>
                </div>
            <div class="row justify-content-end">
            <div class="form-group col-sm-6"> <button type="submit" class="btn-block btn-primary" id="submitform">Añadir Producto</button> </div>
        </div>
        </form>`
        )
    }

    //El siguiente bind será el encargado de ir recogiendo los datos de las distintas variables que se vayan
    //incorporando al formulario. A través de la función verificarCamposConsola() se realizará el chequeo pertinente
    //de las variables y si cumplen con lo establecido.
    //Tras pusar el botón "Añadir Producto", se recogerán las variables (siempre y cuando esté todo correcto) y estas se pasarán
    //al handlerValidacionConsolaNueva que será la encargada de generar el producto deseado y que este aparezca de forma
    //dinámica en la web.
    bindValidacionConsolaNueva(handlerValidacionConsolaNueva) {

        serialNumberOK = false;
        nombreOK = false;
        precioOK = false;
        impuestosOK = false;
        picsOK = false;
        tipoOK = false;
        formatoOK = false;

        //Recojo el contenido del formulario escrito.
        $(this.main).on("input", "#consoleFormulario", function (event) {

            fsnumber = document.getElementById("fsnumber");
            fname = document.getElementById("fname");
            fcompania = document.getElementById("fcompania");
            fdescription = document.getElementById("fdescription");
            fprice = document.getElementById("fprice");
            ftax = document.getElementById("ftax");
            fimage = document.getElementById("fimage");
            ftipo = document.getElementById("ftipo");
            fformato = document.getElementById("fformato");

            //A través de esta función compruebo que el contenido es introducido de la forma correcta
            verificarCamposConsola();
        })

        //Tras pulsar "enviar", recojo la información del formulario y la paso al handler correspondiente
        //que será el encargado de generar el objeto producto que será mostrado en la web.
        $(document).on("submit", "#consoleFormulario", function (event) {

            event.preventDefault();
            event.stopPropagation();

            if ((serialNumberOK) && (nombreOK) && (precioOK) && (impuestosOK) && (picsOK) && (tipoOK) && (formatoOK)) {
                handlerValidacionConsolaNueva(serialNumberForm, nameForm, companiaForm, descriptionForm, precioForm, impuestosForm, picsForm, tipoForm, formatoForm);
            }

        })

    }

    //Cuando pulse el botón "Añadir Videojuego" llamaré al handler "handlerFormularioVideojuego".
    //Este será el encargado de, mediante mostrarFormularioVideojuego(), pintar en el main el formulario
    //para insertar un producto juego.

    bindFormularioVideojuego(handlerFormularioVideojuego) {
        $('#formularioVideojuego').click((event) => {
            this.#excecuteHandler(handlerFormularioVideojuego, [], this.main, { action: 'formularioVideojuego' }, '#FormularioVideojuego', event);
        });
    }

    mostrarFormularioVideojuego() {
        this.main.empty();
        this.main.append(
            `<form class="form-card" name = "videojuegoFormulario" id="videojuegoFormulario" method = "post" enctype="multipart/form-data">
            <h1 class="text-center">FORMULARIO VIDEOJUEGO</h1>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Serial Number<span class="text-danger"> *</span></label> <input type="text" id="fsnumber" name="fsnumber" placeholder="Introduce el serial number"><div id="veri"></div></div>
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Nombre<span class="text-danger"> *</span></label> <input type="text" id="fname" name="fname" placeholder="Introduce el nombre"> <div id="veri"></div></div>
            </div>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Compañia<span class="text-danger"></span></label> <input type="text" id="fcompania" name="fcompania" placeholder="Introduce la Compañia"> <div id="veri"></div> </div>
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Descripción<span class="text-danger"></span></label> <input type="text" id="fdescription" name="fdescription" placeholder="Introduce una descripción"> <div id="veri"></div> </div>
            </div>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Precio<span class="text-danger"> *</span></label> <input type="number" id="fprice" name="fprice" placeholder="Introduce un precio"><div id="veri"></div></div>
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Impuestos<span class="text-danger"> *</span></label>
                <select class="form-select" id="ftax" name="ftax" aria-label="Default select example">
                <option selected>Selecciona un tipo de impuesto</option>
                <option value="4">4</option>
                <option value="10">10</option>
                <option value="21">21</option>
                </select>
                <div id="veriSelect"></div>
                </div>
            </div>
            <div class="row justify-content-between text-left">
                <div class="form-group col-12 flex-column d-flex"> <label class="form-control-label px-3">Subir Imagen<span class="text-danger"> *</span></label> <input type="file" id="fimage" name="fimage"><div id="veri"></div></div>
            </div>
            <div class="row justify-content-between text-left">
            <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Género<span class="text-danger"></span></label> <input type="text" id="fgenero" name="fgenero" placeholder="¿A qué genero pertenece?"><div id="veri"></div></div>
            <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">DLC<span class="text-danger"></span></label> <input type="number" id="fdlc" name="fdlc" placeholder="Di cuantos DLC tiene"><div id="veri"></div></div>
            <div class="row justify-content-end">
            <div class="form-group col-sm-6"> <button type="submit" class="btn-block btn-primary" id="submitform">Añadir Producto</button> </div>
        </div>
        </form>`
        )
    }

    //El siguiente bind será el encargado de ir recogiendo los datos de las distintas variables que se vayan
    //incorporando al formulario. A través de la función verificarCamposVideojuego() se realizará el chequeo pertinente
    //de las variables y si cumplen con lo establecido.
    //Tras pusar el botón "Añadir Producto", se recogerán las variables (siempre y cuando esté todo correcto) y estas se pasarán
    //al handlerValidacionVideojuegoNuevo que será el encargado de generar el producto deseado y que este aparezca de forma
    //dinámica en la web.
    bindValidacionVideojuegoNuevo(handlerValidacionVideojuegoNuevo) {

        serialNumberOK = false;
        nombreOK = false;
        precioOK = false;
        impuestosOK = false;
        picsOK = false;
        dlcOK = false;

        $(this.main).on("input", "#videojuegoFormulario", function (event) {

            fsnumber = document.getElementById("fsnumber");
            fname = document.getElementById("fname");
            fcompania = document.getElementById("fcompania");
            fdescription = document.getElementById("fdescription");
            fprice = document.getElementById("fprice");
            ftax = document.getElementById("ftax");
            fimage = document.getElementById("fimage");
            fgenero = document.getElementById("fgenero");
            fdlc = document.getElementById("fdlc");

            verificarCamposVideojuego();
        })

        $(this.main).on("submit", "#videojuegoFormulario", function (event) {

            event.preventDefault();
            event.stopPropagation();

            if ((serialNumberOK) && (nombreOK) && (precioOK) && (impuestosOK) && (picsOK) && (dlcOK)) {
                handlerValidacionVideojuegoNuevo(serialNumberForm, nameForm, companiaForm, descriptionForm, precioForm, impuestosForm, picsForm, generoForm, dlcForm);
            }
        })
    }

    //Cuando pulse el botón "Añadir Accesorio" llamaré al handler "handlerFormularioAccesorio".
    //Este será el encargado de, mediante mostrarFormularioAccesorio(), pintar en el main el formulario
    //para insertar un producto accesorio.

    bindFormularioAccesorio(handlerFormularioAccesorio) {
        $('#formularioAccesorio').click((event) => {
            this.#excecuteHandler(handlerFormularioAccesorio, [], this.main, { action: 'formularioAccesorio' }, '#FormularioAccesorio', event);
        });
    }

    mostrarFormularioAccesorio() {
        this.main.empty();
        this.main.append(
            `<form class="form-card" name = "accesorioFormulario" id="accesorioFormulario" method = "post" enctype="multipart/form-data">
            <h1 class="text-center">FORMULARIO ACCESORIO</h1>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Serial Number<span class="text-danger"> *</span></label> <input type="text" id="fsnumber" name="fsnumber" placeholder="Introduce el serial number"><div id="veri"></div></div>
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Nombre<span class="text-danger"> *</span></label> <input type="text" id="fname" name="fname" placeholder="Introduce el nombre"> <div id="veri"></div></div>
            </div>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Compañia<span class="text-danger"></span></label> <input type="text" id="fcompania" name="fcompania" placeholder="Introduce la Compañia"> <div id="veri"></div> </div>
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Descripción<span class="text-danger"></span></label> <input type="text" id="fdescription" name="fdescription" placeholder="Introduce una descripción"> <div id="veri"></div> </div>
            </div>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Precio<span class="text-danger"> *</span></label> <input type="number" id="fprice" name="fprice" placeholder="Introduce un precio"><div id="veri"></div></div>
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Impuestos<span class="text-danger"> *</span></label>
                <select class="form-select" id="ftax" name="ftax" aria-label="Default select example">
                <option selected>Selecciona un tipo de impuesto</option>
                <option value="4">4</option>
                <option value="10">10</option>
                <option value="21">21</option>
                </select>
                <div id="veriSelect"></div>
                </div>
            </div>
            <div class="row justify-content-between text-left">
                <div class="form-group col-12 flex-column d-flex"> <label class="form-control-label px-3">Subir Imagen<span class="text-danger"> *</span></label> <input type="file" id="fimage" name="fimage"><div id="veri"></div></div>
            </div>
            <div class="row justify-content-between text-left">
            <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Color<span class="text-danger"></span></label> <input type="text" id="fcolor" name="fcolor" placeholder="¿De qué color es?"><div id="veri"></div></div>
            <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Plataforma<span class="text-danger"> *</span></label> 
            <select class="form-select" id="fplataforma" name="fplataforma" aria-label="Default select example">
            <option selected>Selecciona a que plataforma pertenece</option>
            <option value="xbox">xbox</option>
            <option value="playstation">playstation</option>
            <option value="nintendo">nintendo</option>
            <option value="pc">pc</option>
            </select>
            <div id="veriSelect"></div>
            </div>
            <div class="row justify-content-end">
            <div class="form-group col-sm-6"> <button type="submit" class="btn-block btn-primary" id="submitform">Añadir Producto</button> </div>
        </div>
        </form>`
        )
    }

    //El siguiente bind será el encargado de ir recogiendo los datos de las distintas variables que se vayan
    //incorporando al formulario. A través de la función verificarCamposAccesorio() se realizará el chequeo pertinente
    //de las variables y si cumplen con lo establecido.
    //Tras pusar el botón "Añadir Producto", se recogerán las variables (siempre y cuando esté todo correcto) y estas se pasarán
    //al handlerValidacionAccesorioNuevo que será el encargado de generar el producto deseado y que este aparezca de forma
    //dinámica en la web.
    bindValidacionAccesorioNuevo(handlerValidacionAccesorioNuevo) {

        serialNumberOK = false;
        nombreOK = false;
        precioOK = false;
        impuestosOK = false;
        picsOK = false;
        plataformaOK = false;


        $(this.main).on("input", "#accesorioFormulario", function (event) {

            fsnumber = document.getElementById("fsnumber");
            fname = document.getElementById("fname");
            fcompania = document.getElementById("fcompania");
            fdescription = document.getElementById("fdescription");
            fprice = document.getElementById("fprice");
            ftax = document.getElementById("ftax");
            fimage = document.getElementById("fimage");
            fcolor = document.getElementById("fcolor");
            fplataforma = document.getElementById("fplataforma");

            verificarCamposAccesorio();

        })

        $(this.main).on("submit", "#accesorioFormulario", function (event) {

            event.preventDefault();
            event.stopPropagation();

            if ((serialNumberOK) && (nombreOK) && (precioOK) && (impuestosOK) && (picsOK) && (plataformaOK)) {
                handlerValidacionAccesorioNuevo(serialNumberForm, nameForm, companiaForm, descriptionForm, precioForm, impuestosForm, picsForm, colorForm, plataformaForm);
            }
        })
    }

    //Cuando pulse el botón "Añadir Categoria" llamaré al handler "handlerFormularioCategoria".
    //Este será el encargado de, mediante mostrarFormularioCategoria(), pintar en el main el formulario
    //para insertar una categoria.

    bindFormularioCategoria(handlerFormularioCategoria) {
        $('#formularioCategoria').click((event) => {
            this.#excecuteHandler(handlerFormularioCategoria, [], this.main, { action: 'formularioCategoria' }, '#FormularioCategoria', event);
        });
    }

    mostrarFormularioCategoria() {
        this.main.empty();
        this.main.append(
            `<form class="form-card" name = "categoriaFormulario" id="categoriaFormulario" method = "post" enctype="multipart/form-data">
            <h1 class="text-center">FORMULARIO CATEGORIA</h1>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Nombre Categoria<span class="text-danger"> *</span></label> <input type="text" id="ftitle" name="ftitle" placeholder="Introduce el nombre de la categoria"> <div id="veri"></div></div>
            </div>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">ID<span class="text-danger"> *</span></label> <input type="text" id="fid" name="fid" placeholder="Introduce un ID para la categoria"> <div id="veri"></div> </div>
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Descripción<span class="text-danger"></span></label> <input type="text" id="fdescription" name="fdescription" placeholder="Introduce una descripción de categoria"> <div id="veri"></div> </div>
            </div>
            <div class="row justify-content-end">
            <div class="form-group col-sm-6"> <button type="submit" class="btn-block btn-primary" id="submitform">Añadir Categoria</button> </div>
        </div>
        </form>`
        )
    }

    //El siguiente bind será el encargado de ir recogiendo los datos de las distintas variables que se vayan
    //incorporando al formulario. A través de la función verificarCamposCategoria() se realizará el chequeo pertinente
    //de las variables y si cumplen con lo establecido.
    //Tras pusar el botón "Añadir Categoria", se recogerán las variables (siempre y cuando esté todo correcto) y estas se pasarán
    //al handlerValidacionCategoriaNuevo que será el encargado de generar la categoria deseada y que esta aparezca de forma
    //dinámica en la web.

    bindValidacionCategoriaNuevo(handlerValidacionCategoriaNuevo) {

        titleOK = false;
        idOK = false;
        descriptionOK = false;

        $(this.main).on("input", "#categoriaFormulario", function (event) {

            fid = document.getElementById("fid");
            fdescription = document.getElementById("fdescription");
            ftitle = document.getElementById("ftitle");

            verificarCamposCategoria();

        })

        $(this.main).on("submit", "#categoriaFormulario", function (event) {
            event.preventDefault();
            event.stopPropagation();
            if ((titleOK && idOK)) {
                handlerValidacionCategoriaNuevo(titleForm, descriptionForm, idForm);
            }
        })
    }

    //Cuando pulse el botón "Añadir Tienda" llamaré al handler "handlerFormularioTienda".
    //Este será el encargado de, mediante mostrarFormularioTienda(), pintar en el main el formulario
    //para insertar una tienda.

    bindFormularioTienda(handlerFormularioTienda) {
        $('#formularioTienda').click((event) => {
            this.#excecuteHandler(handlerFormularioTienda, [], this.main, { action: 'formularioTienda' }, '#FormularioTienda', event);
        });
    }

    mostrarFormularioTienda() {
        this.main.empty();
        this.main.append(
            `<form class="form-card" name = "tiendaFormulario" id="tiendaFormulario" method = "post" enctype="multipart/form-data">
            <h1 class="text-center">FORMULARIO TIENDA</h1>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">ID<span class="text-danger"> *</span></label> <input type="text" id="fid" name="fid" placeholder="Introduce un ID para la tienda"> <div id="veri"></div></div>
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">CIF<span class="text-danger"></span></label> <input type="text" id="fcif" name="fcif" placeholder="Introduce un CIF para la tienda"> <div id="veri"></div></div>
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Nombre<span class="text-danger"> *</span></label> <input type="text" id="fname" name="fname" placeholder="Introduce un nombre para la tienda"> <div id="veri"></div></div>
            </div>
            <div class="row justify-content-between text-left">
            <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Dirección<span class="text-danger"></span></label> <input type="text" id="fdireccion" name="fdireccion" placeholder="Introduce una dirección para la tienda"> <div id="veri"></div></div>
            <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Teléfono<span class="text-danger"></span></label> <input type="text" id="ftelefono" name="ftelefono" placeholder="Introduce un teléfono para la tienda"> <div id="veri"></div></div>
            </div>
            <div class="row justify-content-between text-left">
            <div class="form-group col-12 flex-column d-flex"> <label class="form-control-label px-3">Subir Imagen<span class="text-danger"> *</span></label> <input type="file" id="fimage" name="fimage"><div id="veri"></div></div>
            </div>
            <div class="row justify-content-end">
            <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Mapa Tienda <span class="text-danger">*</span></label></div>
            <div class="container"><div class="m4" id="mapid"></div></div>
            <div class="row justify-content-end">
            <div class="form-group col-sm-6"> <button type="submit" class="btn-block btn-primary" id="submitform">Añadir Tienda</button> </div>
        </div>
        </form>`
        )

        let mapContainer = $('#mapid');
        mapContainer.css({
            height: '350px',
            border: '2px solid #000000'
        });
        let map = L.map('mapid').setView([38.990831799999995, -3.9206173000000004], 15);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BYSA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>', maxZoom: 18
        }).addTo(map);

        map.on('click', function (event) {
            map.eachLayer((layer) => {
                if (layer['_latlng'] != undefined)
                    layer.remove();
            });
            L.marker([event.latlng.lat, event.latlng.lng]).addTo(map);
            longitudForm = event.latlng.lng;
            latitudForm = event.latlng.lat;
        });
    }

    //El siguiente bind será el encargado de ir recogiendo los datos de las distintas variables que se vayan
    //incorporando al formulario. A través de la función verificarCamposTienda() se realizará el chequeo pertinente
    //de las variables y si cumplen con lo establecido.
    //Tras pusar el botón "Añadir Tienda", se recogerán las variables (siempre y cuando esté todo correcto) y estas se pasarán
    //al handlerValidacionTiendaNuevo que será el encargado de generar la tienda deseada y que esta aparezca de forma
    //dinámica en la web.

    bindValidacionTiendaNuevo(handlerValidacionTiendaNuevo) {

        idOK = false;
        nameOK = false;
        picsOK = false;

        $(this.main).on("input", "#tiendaFormulario", function (event) {

            fid = document.getElementById("fid");
            fcif = document.getElementById("fcif");
            fname = document.getElementById("fname");
            fdireccion = document.getElementById("fdireccion");
            ftelefono = document.getElementById("ftelefono");
            fimage = document.getElementById("fimage");

            verificarCamposTienda();

        })

        $(this.main).on("submit", "#tiendaFormulario", function (event) {
            event.preventDefault();
            event.stopPropagation();

            if ((nameOK) && (idOK) && (picsOK)) {
                handlerValidacionTiendaNuevo(cifForm, nameForm, direccionForm, telefonoForm, latitudForm, longitudForm, picsForm, idForm);
            }
        })
    }

    //Cuando pulse el botón "Eliminar tienda" llamaré al handler "handlerEliminarTienda".
    //Este será el encargado de, mediante mostrarEliminarTienda(), pintar en el main el formulario
    //para eliminar una tienda.
    bindEliminarTienda(handlerEliminarTienda) {
        $('#formularioEliminarTienda').click((event) => {
            this.#excecuteHandler(handlerEliminarTienda, [], this.main, { action: 'formularioEliminarTienda' }, '#FormularioEliminarTienda', event);
        });
    }

    mostrarEliminarTienda(iteradorTiendas) {
        this.main.empty();
        this.main.append(
            `<form class="form-card" name = "eliminarTienda" id="eliminarTienda" method = "post" enctype="multipart/form-data">
            <h1 class="text-center">ELIMINAR TIENDA</h1>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Selecciona tienda<span class="text-danger"> *</span></label>
                <select class="form-select" id="ftienda" name="ftienda" aria-label="Default select example">
                    <option selected>Selecciona una tienda</option>
                    </select>
            <div id="veriSelect"></div>
            </div>
            </div>
            <div class="row justify-content-end">
            <div class="form-group col-sm-6"> <button type="submit" class="btn-block btn-primary" id="submitform">Eliminar Tienda</button> </div>
            </div>
        </form>`
        )

        for (let value of iteradorTiendas) {
            //Evito que salga la tienda por defecto a través del cif
            if (value.shop.cif !== 789456) {
                $("#ftienda").append(
                    `<option value="${value.shop.cif}">${value.shop.name}</option>`
                )
            }
        }
    }

    //El siguiente bind será el encargado de ir recogiendo los datos de las distintas variables que se vayan
    //incorporando al formulario. A través de la función verificarCamposEliminarTienda() se realizará el chequeo pertinente
    //de las variables y si cumplen con lo establecido.
    //Tras pusar el botón "Eliminar Tienda", se recogerán las variables (siempre y cuando esté todo correcto) y estas se pasarán
    //al handlerValidacionEliminarTienda que será el encargado de eliminar la tienda deseada y que esta desaparezca de forma
    //dinámica en la web.

    bindValidacionEliminarTienda(handlerValidacionEliminarTienda) {

        tiendaOK = false;

        $(this.main).on("input", "#eliminarTienda", function (event) {

            ftienda = document.getElementById("ftienda");

            verificarCamposEliminarTienda();
        })

        $(this.main).on("submit", "#eliminarTienda", function (event) {

            event.preventDefault();
            event.stopPropagation();

            if (tiendaOK) {
                handlerValidacionEliminarTienda(tiendaForm);
            }
        })
    }

    //Cuando pulse el botón "Eliminar Categoria" llamaré al handler "handlerEliminarCategoria".
    //Este será el encargado de, mediante mostrarEliminarCategoria(), pintar en el main el formulario
    //para eliminar una categoria.

    bindEliminarCategoria(handlerEliminarCategoria) {
        $('#formularioEliminarCategoria').click((event) => {
            this.#excecuteHandler(handlerEliminarCategoria, [], this.main, { action: 'formularioEliminarCategoria' }, '#FormularioEliminarCategoria', event);
        });
    }

    mostrarEliminarCategoria(iteradorCategorias) {
        this.main.empty();
        this.main.append(
            `<form class="form-card" name = "eliminarCategoria" id="eliminarCategoria" method = "post" enctype="multipart/form-data">
            <h1 class="text-center">ELIMINAR CATEGORIA</h1>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Selecciona Categoria<span class="text-danger"> *</span></label>
                <select class="form-select" id="fcategoria" name="fcategoria" aria-label="Default select example">
                    <option selected>Selecciona una Categoria</option>
                    </select>
            <div id="veriSelect"></div>
            </div>
            </div>
            <div class="row justify-content-end">
            <div class="form-group col-sm-6"> <button type="submit" class="btn-block btn-primary" id="submitform">Eliminar Categoria</button> </div>
            </div>
        </form>`
        )

        for (let value of iteradorCategorias) {
            if (value.category.title !== "Cat.Defecto") {
                $("#fcategoria").append(
                    `<option value="${value.category.title}">${value.category.title}</option>`
                )
            }
        }
    }

    //El siguiente bind será el encargado de ir recogiendo los datos de las distintas variables que se vayan
    //incorporando al formulario. A través de la función handlerValidacionEliminarCategoria() se realizará el chequeo pertinente
    //de las variables y si cumplen con lo establecido.
    //Tras pusar el botón "Eliminar Categoria", se recogerán las variables (siempre y cuando esté todo correcto) y estas se pasarán
    //al handlerValidacionEliminarCategoria que será el encargado de eliminar la categoria deseada y que esta desaparezca de forma
    //dinámica en la web.

    bindValidacionEliminarCategoria(handlerValidacionEliminarCategoria) {

        categoriaOK = false;

        $(this.main).on("input", "#eliminarCategoria", function (event) {

            fcategoria = document.getElementById("fcategoria");
            verificarCamposEliminarCategoria();
        })

        $(this.main).on("submit", "#eliminarCategoria", function (event) {

            event.preventDefault();
            event.stopPropagation();

            if (categoriaOK) {
                handlerValidacionEliminarCategoria(categoriaForm);
            }
        })
    }

    //Cuando pulse el botón "Eliminar Producto" llamaré al handler "handlerEliminarProducto".
    //Este será el encargado de, mediante mostrarEliminarProducto(), pintar en el main el formulario
    //para eliminar un producto.
    bindEliminarProducto(handlerEliminarProducto) {
        $('#formularioEliminarProducto').click((event) => {
            this.#excecuteHandler(handlerEliminarProducto, [], this.main, { action: 'formularioEliminarProducto' }, '#FormularioEliminarProducto', event);
        });
    }

    mostrarEliminarProducto(iteradorProductos) {
        this.main.empty();
        this.main.append(
            `<form class="form-card" name = "eliminarProducto" id="eliminarProducto" method = "post" enctype="multipart/form-data">
            <h1 class="text-center">ELIMINAR PRODUCTO</h1>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Selecciona Producto<span class="text-danger"> *</span></label>
                <select class="form-select" id="fproducto" name="fproducto" aria-label="Default select example">
                    <option selected>Selecciona un Producto</option>
                    </select>
            <div id="veriSelect"></div>
            </div>
            </div>
            <div class="row justify-content-end">
            <div class="form-group col-sm-6"> <button type="submit" class="btn-block btn-primary" id="submitform">Eliminar Producto</button> </div>
            </div>
        </form>`
        )

        for (let value of iteradorProductos) {
            for (let elem of value.products) {
                if (elem.store !== undefined) {
                    $("#fproducto").append(
                        `<option value="${elem.product.name}">${elem.product.name}</option>`
                    )
                }
            }
        }
    }

    //El siguiente bind será el encargado de ir recogiendo los datos de las distintas variables que se vayan
    //incorporando al formulario. A través de la función handlerValidacionEliminarProducto() se realizará el chequeo pertinente
    //de las variables y si cumplen con lo establecido.
    //Tras pusar el botón "Eliminar Producto", se recogerán las variables (siempre y cuando esté todo correcto) y estas se pasarán
    //al handlerValidacionEliminarProducto que será el encargado de eliminar el producto deseado y que esta desaparezca de forma
    //dinámica en la web.
    bindValidacionEliminarProducto(handlerValidacionEliminarProducto) {

        productoOK = false;

        $(this.main).on("input", "#eliminarProducto", function (event) {

            fproducto = document.getElementById("fproducto");
            verificarCamposEliminarProducto();
        })

        $(this.main).on("submit", "#eliminarProducto", function (event) {

            event.preventDefault();
            event.stopPropagation();
            if (productoOK) {
                handlerValidacionEliminarProducto(productoForm);
            }
        })
    }

    //Cuando pulse el botón "Vincular Producto" llamaré al handler "handlerDefectoProducto".
    //Este será el encargado de, mediante mostrarDefectoProducto(), pintar en el main el formulario
    //para vincular un producto.
    bindDefectoProducto(handlerDefectoProducto) {
        $('#formularioDefectoProducto').click((event) => {
            this.#excecuteHandler(handlerDefectoProducto, [], this.main, { action: 'formularioDefectoProducto' }, '#FormularioDefectoProducto', event);
        });
    }

    mostrarDefectoProducto(iteradorProductos, iteradorTiendas) {
        this.main.empty();
        this.main.append(
            `<form class="form-card" name = "defectoProducto" id="defectoProducto" method = "post" enctype="multipart/form-data">
            <h1 class="text-center">VINCULAR A TIENDAS PRODUCTOS EN TIENDA DEFECTO</h1>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Selecciona Producto situado en Tienda Defecto<span class="text-danger"> *</span></label>
                <select class="form-select" id="fproducto" name="fproducto" aria-label="Default select example">
                    <option selected>Selecciona un Producto</option>
                    </select>
            <div id="veriSelect"></div>
            </div>
            </div>

            <div class="row justify-content-between text-left">
            <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Selecciona Tienda<span class="text-danger"> *</span></label>
            <select class="form-select" id="ftienda" name="ftienda" aria-label="Default select example">
                <option selected>Selecciona una tienda</option>
                </select>
        <div id="veriSelect"></div>
        <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Cantidad Stock<span class="text-danger"> *</span></label> <input type="number" id="fstock" name="fstock" placeholder="Introduce una cantidad"><div id="veri"></div></div>

        </div>
        </div>
            <div class="row justify-content-end">
            <div class="form-group col-sm-6"> <button type="submit" class="btn-block btn-primary" id="submitform">Vincular Producto</button> </div>
            </div>
        </form>`
        )

        for (let value of iteradorProductos) {
            for (let elem of value.products) {
                if (elem.store === 789456) {
                    $("#fproducto").append(
                        `<option value="${elem.product.name}">${elem.product.name}</option>`
                    )
                }
            }
        }

        for (let value of iteradorTiendas) {
            //Evito que salga la tienda por defecto a través del cif
            if (value.shop.cif !== 789456) {
                $("#ftienda").append(
                    `<option value="${value.shop.cif}">${value.shop.name}</option>`
                )
            }
        }
    }

    //El siguiente bind será el encargado de ir recogiendo los datos de las distintas variables que se vayan
    //incorporando al formulario. A través de la función verificarCamposDefectoProducto() se realizará el chequeo pertinente
    //de las variables y si cumplen con lo establecido.
    //Tras pusar el botón "Vincular Producto", se recogerán las variables (siempre y cuando esté todo correcto) y estas se pasarán
    //al handlerValidacionDefectoProducto que será el encargado de vincular el producto deseado y que esta aparezca de forma
    //dinámica en la web.
    bindValidacionDefectoProducto(handlerValidacionDefectoProducto) {

        productoOK = false;
        tiendaOK = false;
        stockOK = false;

        $(this.main).on("input", "#defectoProducto", function (event) {

            fproducto = document.getElementById("fproducto");
            ftienda = document.getElementById("ftienda");
            fstock = document.getElementById("fstock");

            verificarCamposDefectoProducto();
        })

        $(this.main).on("submit", "#defectoProducto", function (event) {

            event.preventDefault();
            event.stopPropagation();
            if (productoOK && tiendaOK && stockOK) {
                handlerValidacionDefectoProducto(productoForm, tiendaForm, stockForm);
            }
        })
    }

    //Cuando pulse el botón "Manejar Stock Producto" llamaré al handler "handlerStockProducto".
    //Este será el encargado de, mediante mostrarStockProducto(), pintar en el main el formulario
    //para manejar el stock de un producto asociado a una tienda.
    bindStockProducto(handlerStockProducto) {
        $('#formularioStockProducto').click((event) => {
            this.#excecuteHandler(handlerStockProducto, [], this.main, { action: 'formularioStockProducto' }, '#FormularioStockProducto', event);
        });
    }

    mostrarStockProducto(iteradorProductos, iteradorTiendas) {
        this.main.empty();
        this.main.append(
            `<form class="form-card" name = "stockProducto" id="stockProducto" method = "post" enctype="multipart/form-data">
            <h1 class="text-center">MANEJAR STOCK PRODUCTOS EN TIENDAS</h1>
            <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Selecciona Producto vinculado a una tienda.<span class="text-danger"> *</span></label>
                <select class="form-select" id="fproducto" name="fproducto" aria-label="Default select example">
                    <option selected>Selecciona un Producto</option>
                    </select>
            <div id="veriSelect"></div>
            </div>
            </div>

            <div class="row justify-content-between text-left">
        <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Cantidad Stock (Se suman unidades a las ya existentes)<span class="text-danger"> *</span></label> <input type="number" id="fstock" name="fstock" placeholder="Introduce una cantidad"><div id="veri"></div></div>
        </div>
        </div>
            <div class="row justify-content-end">
            <div class="form-group col-sm-6"> <button type="submit" class="btn-block btn-primary" id="submitform">Añadir Stock</button> </div>
            </div>
        </form>`
        )

        for (let value of iteradorProductos) {
            for (let elem of value.products) {
                if (elem.store !== 789456) {
                    for (let value of iteradorTiendas) {
                        //Evito que salga la tienda por defecto a través del cif
                        if (value.shop.cif === elem.store) {
                            $("#fproducto").append(
                                `<option value="${elem.store}%${elem.product.name}">${value.shop.name} - ${elem.product.name}</option>`
                            )
                        }
                    }
                }
            }
        }
    }

    //El siguiente bind será el encargado de ir recogiendo los datos de las distintas variables que se vayan
    //incorporando al formulario. A través de la función verificarCamposStockProducto() se realizará el chequeo pertinente
    //de las variables y si cumplen con lo establecido.
    //Tras pusar el botón "Añadir Stock", se recogerán las variables (siempre y cuando esté todo correcto) y estas se pasarán
    //al handlerValidacionStockProducto que será el encargado de vincular el stock al producto deseado y que esta aparezca de forma
    //dinámica en la web.

    bindValidacionStockProducto(handlerValidacionStockProducto) {

        productoOK = false;
        tiendaOK = false;
        stockOK = false;

        $(this.main).on("input", "#stockProducto", function (event) {

            fproducto = document.getElementById("fproducto");
            fproductoid = document.getElementById("fproducto");
            ftienda = document.getElementById("fproducto");
            fstock = document.getElementById("fstock");

            verificarCamposStockProducto();
        })

        $(this.main).on("submit", "#stockProducto", function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (productoOK && tiendaOK && stockOK) {
                handlerValidacionStockProducto(productoForm, tiendaForm, stockForm);
            }
        })
    }

    //El siguiente bind será el encargado de recoger los datos del formulario de login. A través de la función
    //verificarCamposLogin() se realizará el checkeo de las variables.
    //Tras pulsar el botón "Entrar" se recogerán las variables (siempre y cuando esté todo correcto) y estas se pasan al
    //handlerLoginValidacion que será el encargado de generar la cookie.
    bindLoginValidacion(handlerLoginValidacion) {
        usuarioOK = false;
        contrasenaOK = false;

        $("#formulario").on("input", "#loginForm", function (event) {
            fusuario = document.getElementById("fusuario");
            fcontrasena = document.getElementById("fcontrasena");

            verificarCamposLogin();
        })

        $("#formulario").on("submit", "#loginForm", function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (usuarioOK && contrasenaOK) {
                handlerLoginValidacion(usuarioForm, contrasenaForm);
            }
        })
    }

    //Si hago click en el botón "Desconectar" llamo al handlerLogOut que será el encargado 
    //de hacer el "borrado" de la cookie.
    bindLogOut(handlerLogOut) {
        $("#logout").click(() => {
            handlerLogOut();
        })
    }

    //Si hago click en el botón "Añadir a favoritos" llamo al handlerProductosFavoritos que será el encargado 
    //de añadir el producto a la categoria de favoritos.
    bindProductosFavoritos(handlerProductosFavoritos) {
        $(this.main).on('click', ".favoritosProducto", (event) => {
            let nombreProducto = $(event.target).closest($(".favoritosProducto")).get(0).dataset.producto;
            handlerProductosFavoritos(nombreProducto);
        });
    }

    //Si hago click en el botón "Favoritos" llamo al handlerMostrarFavoritos que será el encargado 
    //de mostrar los productos añadidos a esta categoria.
    bindMostrarProductosFavoritos(handlerMostrarFavoritos) {
        $('#productosFavoritos').click((event) => {
            this.#excecuteHandler(handlerMostrarFavoritos, [], this.main, { action: 'mostrarFavoritos' }, '#ProductosFavoritos', event);
        });
    }

    //Si hago click en el botón "Mapa Tiendas" llamo al handlerMapaTiendas y me mostrará el mapa
    //con la localización de las tiendas que tengamos registradas en la web.
    bindMapaTiendas(handlerMapaTiendas) {
        $('#mapaTiendas').click((event) => {
            this.#excecuteHandler(handlerMapaTiendas, [], this.main, { action: 'mostrarTiendas' }, '#MapaTiendas', event);
        });
    }

    mostrarMapaTiendas(iteradorTiendas) {
        this.main.empty();
        this.main.append(
            `<div id="map"></div>`
        )

        var map = L.map('map').setView([38.98626, -3.92907], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        for (let value of iteradorTiendas) {
            if (value.shop.cif !== 789456) {
                L.marker([value.shop.coords.latitude, value.shop.coords.longitude]).addTo(map).bindPopup(`${value.shop.name}`).openPopup();
            }
        }
    }

    //Si hago click en el botón "backup" llamo al handler handleBackup que será el encargado de
    //ir recogiendo TODA la info de los elementos almacenados en la web y los va a ir pasando a formato JSON
    //donde posteriormente serán guardados en un string que nos será util para la obtención del fichero txt que se nos pide.
    bindBackup(handleBackup) {
        $('#ficheroBackup').click(function () {
            handleBackup();
        })
    }
}

function verificacionMal(input, mensaje) {
    let contenedorInput = input.parentElement;
    let veri = contenedorInput.querySelector('#veri');
    veri.innerText = mensaje;
    input.classList.add('Mal');
    input.classList.remove('Bien');
}

function verificacionBien(input, mensaje) {
    let contenedorInput = input.parentElement;
    let veri = contenedorInput.querySelector('#veri');
    veri.innerText = mensaje;
    input.classList.add('Bien');
    input.classList.remove('Mal');
}

function verificacionMalSelect(select, mensaje) {
    let contenedorSelect = select.parentElement;
    let veri = contenedorSelect.querySelector('#veriSelect');
    veri.innerText = mensaje;
    select.classList.add('Mal');
    select.classList.remove('Bien');
}

function verificacionBienSelect(select, mensaje) {
    let contenedorSelect = select.parentElement;
    let veri = contenedorSelect.querySelector('#veriSelect');
    veri.innerText = mensaje;
    select.classList.add('Bien');
    select.classList.remove('Mal');
}

//Variables de verificación de formularios
let serialNumberForm;
let nameForm;
let companiaForm;
let descriptionForm;
let precioForm;
let impuestosForm;
let picsForm;
let tipoForm;
let formatoForm;
let dlcForm;
let plataformaForm;
let titleForm;
let idForm;
let generoForm
let colorForm;
let latitudForm;
let longitudForm;
let direccionForm;
let telefonoForm;
let cifForm;
let tiendaForm;
let categoriaForm;
let productoString;
let productoForm;
let stockForm;
let usuarioForm;
let contrasenaForm;

function isSerialNumber(serialNumber) {
    let serialRegex = /^[A-Z]{3}[0-9]{2}$/;
    if (serialRegex.test(serialNumber)) {
        return true;
    }
}

//Función que checkea el formato del imagen.
function isImage(images) {
    let imagesRegex = /([A-z\-_0-9\/\.]*\.(png|jpg|jpeg|gif))/;
    if (imagesRegex.test(images)) {
        return true;
    }
}

function verificarCamposConsola() {
    serialNumberForm = fsnumber.value;
    nameForm = fname.value;
    companiaForm = fcompania.value;
    descriptionForm = fdescription.value;
    precioForm = fprice.value;
    impuestosForm = ftax.value;
    picsForm = fimage.value;
    let imagenRuta = picsForm.split("\\");
    picsForm = imagenRuta[imagenRuta.length - 1];
    tipoForm = ftipo.value;
    formatoForm = fformato.value;

    if ((!serialNumberForm) || !(isSerialNumber(serialNumberForm))) {
        verificacionMal(fsnumber, "Mal. Verifica el Serial Number");
        serialNumberOK = false;
    } else {
        verificacionBien(fsnumber, 'OK');
        serialNumberOK = true;
    }

    if (!nameForm) {
        verificacionMal(fname, "El Nombre no puede estar vacio");
        nombreOK = false;
    } else {
        verificacionBien(fname, 'OK');
        nombreOK = true;
    }

    if ((!precioForm) || (precioForm < 0)) {
        verificacionMal(fprice, "Precio vacio o Negativo. Revisalo");
        precioOK = false;
    } else {
        verificacionBien(fprice, 'OK');
        precioOK = true;
    }

    if (!(impuestosForm == 4) && !(impuestosForm == 10) && !(impuestosForm == 21)) {
        verificacionMalSelect(ftax, "Selecciona un impuesto");
        impuestosOK = false;
    } else {
        verificacionBienSelect(ftax, 'OK');
        impuestosOK = true;
    }

    if (!isImage(picsForm)) {
        verificacionMal(fimage, "Obligatorio");
        picsOK = false;
    } else {
        verificacionBien(fimage, 'OK');
        picsOK = true;
    }

    if (!(tipoForm === "sobremesa") && !(tipoForm === "portatil")) {
        verificacionMalSelect(ftipo, "Selecciona un tipo de consola");
        tipoOK = false;
    } else {
        verificacionBienSelect(ftipo, 'OK');
        tipoOK = true;
    }

    if (!(formatoForm === "disco") && !(formatoForm === "cartucho") && !(formatoForm === "digital")) {
        verificacionMalSelect(fformato, "Selecciona el formato principal de los juegos");
        formatoOK = false;
    } else {
        verificacionBienSelect(fformato, 'OK');
        formatoOK = true;
    }
}

function verificarCamposVideojuego() {

    serialNumberForm = fsnumber.value;
    nameForm = fname.value;
    companiaForm = fcompania.value;
    descriptionForm = fdescription.value;
    precioForm = fprice.value;
    impuestosForm = ftax.value;
    picsForm = fimage.value;
    let imagenRuta = picsForm.split("\\");
    picsForm = imagenRuta[imagenRuta.length - 1];
    generoForm = fgenero.value;
    dlcForm = fdlc.value;

    if ((!serialNumberForm) || !(isSerialNumber(serialNumberForm))) {
        verificacionMal(fsnumber, "Mal. Verifica el Serial Number");
        serialNumberOK = false;
    } else {
        verificacionBien(fsnumber, 'OK');
        serialNumberOK = true;
    }

    if (!nameForm) {
        verificacionMal(fname, "El Nombre no puede estar vacio");
        nombreOK = false;
    } else {
        verificacionBien(fname, 'OK');
        nombreOK = true;
    }

    if ((!precioForm) || (precioForm < 0)) {
        verificacionMal(fprice, "Precio vacio o Negativo. Revisalo");
        precioOK = false;
    } else {
        verificacionBien(fprice, 'OK');
        precioOK = true;
    }

    if (!(impuestosForm == 4) && !(impuestosForm == 10) && !(impuestosForm == 21)) {
        verificacionMalSelect(ftax, "Selecciona un impuesto");
        impuestosOK = false;
    } else {
        verificacionBienSelect(ftax, 'OK');
        impuestosOK = true;
    }

    if (!isImage(picsForm)) {
        verificacionMal(fimage, "Obligatorio");
        picsOK = false;
    } else {
        verificacionBien(fimage, 'OK');
        picsOK = true;
    }

    if ((dlcForm < 0)) {
        verificacionMal(fdlc, "DLC negativo. Revisalo");
        dlcOK = false;
    } else {
        verificacionBien(fdlc, 'OK');
        dlcOK = true;
    }
}

function verificarCamposAccesorio() {

    serialNumberForm = fsnumber.value;
    nameForm = fname.value;
    companiaForm = fcompania.value;
    descriptionForm = fdescription.value;
    precioForm = fprice.value;
    impuestosForm = ftax.value;
    picsForm = fimage.value;
    let imagenRuta = picsForm.split("\\");
    picsForm = imagenRuta[imagenRuta.length - 1];
    colorForm = fcolor.value;
    plataformaForm = fplataforma.value;


    if ((!serialNumberForm) || !(isSerialNumber(serialNumberForm))) {
        verificacionMal(fsnumber, "Mal. Verifica el Serial Number");
        serialNumberOK = false;
    } else {
        verificacionBien(fsnumber, 'OK');
        serialNumberOK = true;
    }

    if (!nameForm) {
        verificacionMal(fname, "El Nombre no puede estar vacio");
        nombreOK = false;
    } else {
        verificacionBien(fname, 'OK');
        nombreOK = true;
    }

    if ((!precioForm) || (precioForm < 0)) {
        verificacionMal(fprice, "Precio vacio o Negativo. Revisalo");
        precioOK = false;
    } else {
        verificacionBien(fprice, 'OK');
        precioOK = true;
    }

    if (!(impuestosForm == 4) && !(impuestosForm == 10) && !(impuestosForm == 21)) {
        verificacionMalSelect(ftax, "Selecciona un impuesto");
        impuestosOK = false;
    } else {
        verificacionBienSelect(ftax, 'OK');
        impuestosOK = true;
    }

    if (!isImage(picsForm)) {
        verificacionMal(fimage, "Obligatorio");
        picsOK = false;
    } else {
        verificacionBien(fimage, 'OK');
        picsOK = true;
    }

    if (!(plataformaForm === "xbox") && !(plataformaForm === "playstation") && !(plataformaForm === "nintendo") && !(plataformaForm === "pc")) {
        verificacionMalSelect(fplataforma, "Selecciona una plataforma");
        plataformaOK = false;
    } else {
        verificacionBienSelect(fplataforma, 'OK');
        plataformaOK = true;
    }

}

function verificarCamposCategoria() {
    titleForm = ftitle.value;
    idForm = fid.value;
    descriptionForm = fdescription.value;

    if (!titleForm) {
        verificacionMal(ftitle, "El Title no puede estar vacio");
        titleOK = false;
    } else {
        verificacionBien(ftitle, 'OK');
        titleOK = true;
    }

    if (!idForm) {
        verificacionMal(fid, "El id no puede estar vacio");
        idOK = false;
    } else {
        verificacionBien(fid, 'OK');
        idOK = true;
    }
}

function verificarCamposTienda() {

    nameForm = fname.value;
    picsForm = fimage.value;
    let imagenRuta = picsForm.split("\\");
    picsForm = imagenRuta[imagenRuta.length - 1];
    idForm = fid.value;
    cifForm = fcif.value;
    direccionForm = fdireccion.value;
    telefonoForm = ftelefono.value;

    if (!nameForm) {
        verificacionMal(fname, "El Nombre no puede estar vacio");
        nameOK = false;
    } else {
        verificacionBien(fname, 'OK');
        nameOK = true;
    }

    if (!isImage(picsForm)) {
        verificacionMal(fimage, "Obligatorio");
        picsOK = false;
    } else {
        verificacionBien(fimage, 'OK');
        picsOK = true;
    }

    if (!idForm) {
        verificacionMal(fid, "El ID no puede estar vacio");
        idOK = false;
    } else {
        verificacionBien(fid, 'OK');
        idOK = true;
    }
}

function verificarCamposEliminarCategoria() {
    categoriaForm = fcategoria.value;

    if (!categoriaForm || categoriaForm === "Selecciona una Categoria") {
        verificacionMalSelect(fcategoria, "Selecciona una tienda");
        categoriaOK = false;
    } else {
        verificacionBienSelect(fcategoria, 'OK');
        categoriaOK = true;
    }
}

function verificarCamposEliminarTienda() {
    tiendaForm = ftienda.value;

    if (!tiendaForm || tiendaForm === "Selecciona una tienda") {
        verificacionMalSelect(ftienda, "Selecciona una tienda");
        tiendaOK = false;
    } else {
        verificacionBienSelect(ftienda, 'OK');
        tiendaOK = true;
    }
}


function verificarCamposEliminarProducto() {

    productoForm = fproducto.value;

    if (!productoForm || productoForm === "Selecciona un Producto") {
        verificacionMalSelect(fproducto, "Selecciona un Producto");
        productoOK = false;
    } else {
        verificacionBienSelect(fproducto, 'OK');
        productoOK = true;
    }
}

function verificarCamposDefectoProducto() {

    productoForm = fproducto.value;
    tiendaForm = ftienda.value;
    stockForm = fstock.value;

    if (!productoForm || productoForm === "Selecciona un Producto") {
        verificacionMalSelect(fproducto, "Selecciona un Producto");
        productoOK = false;
    } else {
        verificacionBienSelect(fproducto, 'OK');
        productoOK = true;
    }

    if (!tiendaForm || tiendaForm === "Selecciona una tienda") {
        verificacionMalSelect(ftienda, "Selecciona una tienda");
        tiendaOK = false;
    } else {
        verificacionBienSelect(ftienda, 'OK');
        tiendaOK = true;
    }

    if ((!stockForm) || (stockForm < 0)) {
        verificacionMal(fstock, "Stock vacio o Negativo. Revisalo");
        stockOK = false;
    } else {
        verificacionBien(fstock, 'OK');
        stockOK = true;
    }
}

function verificarCamposStockProducto() {
    productoString = fproducto.value;
    let datosProducto = productoString.split("%");

    productoForm = datosProducto[1];
    tiendaForm = datosProducto[0];
    stockForm = fstock.value;

    if (!productoForm || productoForm === "Selecciona un Producto") {
        verificacionMalSelect(fproducto, "Selecciona un Producto");
        productoOK = false;
    } else {
        verificacionBienSelect(fproducto, 'OK');
        productoOK = true;
    }

    if (!tiendaForm) {
        tiendaOK = false;
    } else {
        tiendaOK = true;
    }

    if ((!stockForm) || (stockForm < 0)) {
        verificacionMal(fstock, "Stock vacio o Negativo. Revisalo");
        stockOK = false;
    } else {
        verificacionBien(fstock, 'OK');
        stockOK = true;
    }
}

function verificarCamposLogin() {
    usuarioForm = fusuario.value;
    contrasenaForm = fcontrasena.value;

    if (!usuarioForm) {
        usuarioOK = false;
    } else {
        usuarioOK = true;
    }

    if (!contrasenaForm) {
        contrasenaOK = false;
    } else {
        contrasenaOK = true;
    }
}

export { storeHouseView };