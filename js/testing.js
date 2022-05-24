"use strict";
import { SHSingleton } from "./storeHouse.js";
import { Videojuegos } from "./videojuegos.js";
import { Consolas } from "./consolas.js";
import { Accesorios } from "./accesorios.js";
import { Category } from "./category.js";
import { Store } from "./store.js";
import { Coords } from "./coords.js";

console.log("Crear StoreHouse:");
let almacen = SHSingleton.getInstance();
console.log(almacen.nameStoreHouse);

console.log("Cambiar nombre StoreHouse:");
almacen.nuevoNameStoreHouse = "Almacenaco";
console.log(almacen.nameStoreHouse);

console.log("Crear/Añadir Categorias (Recordar que hay una por defecto): ");
let categoria1 = new Category("Juegos", "El alimento de las consolas");
let categoria2 = new Category("Consolas", "Lo esencial para jugar");
let categoria3 = new Category("Accesorios", "Complementos para tu consola");
console.log("Número de categorias totales: " + almacen.addCategory(categoria1));
console.log("Número de categorias totales: " + almacen.addCategory(categoria2));
console.log("Número de categorias totales: " + almacen.addCategory(categoria3));

console.log("Mostrar categorias: ");
for (const elem of almacen.categories) {
    console.log("CATEGORIA");
    console.log("TITULO: " + elem.category.title);
    console.log("DESCRIPCION: " + elem.category.description);
}

console.log("Crear Tiendas:");
let coordenadas1 = new Coords("213123", "2431234");
let tienda1 = new Store(123123, "Eroski", "calle falsa", 1231723, coordenadas1);
let coordenadas2 = new Coords("852963", "741456");
let tienda2 = new Store(963741, "Carrefour", "calle verdadera", 753951, coordenadas2);

console.log("Añadir Tiendas (Recordar que hay una por defecto)");
console.log("Número de tiendas totales: " + almacen.addShop(tienda1));
console.log("Número de tiendas totales: " + almacen.addShop(tienda2));

console.log("Mostrar Tiendas: ");
for (const elem of almacen.shops) {
    console.log("TIENDA");
    console.log("CIF: " + elem.shop.cif);
    console.log("Name: " + elem.shop.name);
    console.log("Address: " + elem.shop.address);
    console.log("Phone: " + elem.shop.phone);
    console.log("Latitude: " + elem.shop.coords.latitude + " Longitude: " + elem.shop.coords.latitude);
}

console.log("Crear/Añadir Producto");
let juego1 = new Videojuegos("CDE12", "FIFA", "EA", "Es un juego de Fútbol", 70, 21, "fifa.png", "Deportivo", 3);
console.log("Numero de juegos almacenados en categoria juegos: " + almacen.addProduct(juego1, categoria1));
let consola1 = new Consolas("UTY21", "XBOX", "Microsoft", "La mejor consola", 500, 21, "dklsafj.png", "sobremesa", "cartucho");
let consola2 = new Consolas("IOP32", "PS5", "SONY", "La consola de sony", 70, 21, "dklsafj.png", "sobremesa", "cartucho");
console.log("Numero de consolas almacenados en categoria consola: " + almacen.addProduct(consola1, categoria2));
console.log("Numero de consolas almacenados en categoria consola: " + almacen.addProduct(consola2, categoria2));
let accesorio1 = new Accesorios("CDT12", "Mando", "Ardistel", "Un mando muy bonito", 20, 21, "asdfklj.jpeg", "Blanco", "pc");
let accesorio2 = new Accesorios("ASQ12", "Mando", "Logitech", "Un mando muy bonito", 20, 21, "asdfklj.jpeg", "Blanco", "pc");
let accesorio3 = new Accesorios("RTY21", "Maleta", "Samsonite", "Un maleta para tu consola", 20, 21, "asdfklj.jpeg", "Blanco", "pc");
console.log("Numero de accesorios almacenados en categoria accesorio: " + almacen.addProduct(accesorio1, categoria3));
console.log("Numero de accesorios almacenados en categoria accesorio: " + almacen.addProduct(accesorio2, categoria3));
console.log("Numero de accesorios almacenados en categoria accesorio: " + almacen.addProduct(accesorio3, categoria3));

console.log("Añado Productos a Tienda:");
console.log("Productos añadidos en la tienda1: " + almacen.addProductInShop(consola1, tienda1, 20));
console.log("Productos añadidos en la tienda1: " + almacen.addProductInShop(accesorio1, tienda1, 5));
console.log("Productos añadidos en la tienda2: " + almacen.addProductInShop(accesorio2, tienda2, 10));
console.log("Productos añadidos en la tienda1: " + almacen.addProductInShop(accesorio3, tienda1, 15));
console.log("Productos añadidos en la tienda2: " + almacen.addProductInShop(consola2, tienda2, 25));
console.log("Productos añadidos en la tienda1: " + almacen.addProductInShop(juego1, tienda1, 30));

console.log("Añado Cantidades a los productos que tengo en las tiendas");
console.log("Cantidad de juego1: " + almacen.addQuantityProductInShop(juego1, tienda1, 7));
console.log("Cantidad de consola1: " + almacen.addQuantityProductInShop(consola1, tienda1, 2));
console.log("Cantidad de consola2: " + almacen.addQuantityProductInShop(consola2, tienda2, 3));
console.log("Cantidad de accesorio1: " + almacen.addQuantityProductInShop(accesorio1, tienda1, 4));
console.log("Cantidad de accesorio2: " + almacen.addQuantityProductInShop(accesorio2, tienda2, 5));
console.log("Cantidad de accesorio3: " + almacen.addQuantityProductInShop(accesorio3, tienda1, 6));

console.log("Pruebo el getCategoryProducts");
let generadorCategoryProducts = almacen.getCategoryProducts(categoria3, Accesorios);
for (const elem of generadorCategoryProducts) {
    console.log(elem);
}

console.log("Pruebo el getShopProducts");
let generadorShopProducts = almacen.getShopProducts(tienda1, Accesorios);
for (const elem of generadorShopProducts) {
    console.log(elem);
}

try {
    console.log("-----------------");
    console.log("-----------------");
    console.log("El nombre StoreHouse no puede ser vacio:");
    almacen.nuevoNameStoreHouse = "";
} catch (error) { console.error(error.message) }

try {
    console.log("-----------------");
    console.log("-----------------");
    console.log("Compruebo que el Singleton está bien creado:");
    let almacenPrueba = SHSingleton.getInstance();
    console.log(almacenPrueba.nameStoreHouse);
    console.log("Al estar ya creado, retorna la instancia previamente creada");
} catch (error) { console.error(error.message) }

try {
    console.log("-----------------");
    console.log("-----------------");
    console.log("Intento ingresar una categoria ya existente:");
    console.log("Número de categorias totales: " + almacen.addCategory(categoria1));
} catch (error) { console.error(error.message) }

try {
    console.log("-----------------");
    console.log("-----------------");
    console.log("Compruebo excepción Categoria no puede ser null:");
    let categoriaprueba = new Category();
    console.log("Número de categorias totales: " + almacen.addCategory(categoriaprueba));
} catch (error) { console.error(error.message) }

try {
    console.log("-----------------");
    console.log("-----------------");
    console.log("Intento ingresar una tienda ya existente:");
    console.log("Número de tiendas: " + almacen.addShop(tienda1));
} catch (error) { console.error(error.message) }

try {
    console.log("-----------------");
    console.log("-----------------");
    console.log("Compruebo excepción tienda no puede ser null:");
    let tiendaprueba = new Store();
    console.log("Número de tiendas: " + almacen.addShop(tiendaprueba));
} catch (error) { console.error(error.message) }

try {
    console.log("-----------------");
    console.log("-----------------");
    console.log("Compruebo excepción Product no puede ser null:");
    let juegoprueba = new Videojuegos();
    console.log("Numero de juegos almacenados en categoria juegos: " + almacen.addProduct(juegoprueba, categoria1));
} catch (error) { console.error(error.message) }

try {
    console.log("-----------------");
    console.log("-----------------");
    console.log("Compruebo si la tienda ya existe");
    let coordenadasprueba = new Coords("243123", "2441234");
    let tiendaprueba = new Store(123133, "Erroski", "calle falsa", 1231723, coordenadasprueba);
    console.log("Productos añadidos en la tienda1: " + almacen.addProductInShop(juego1, tiendaprueba, 35));
} catch (error) { console.error(error.message) }

try {
    console.log("-----------------");
    console.log("-----------------");
    console.log("Compruebo que la cantidad de stock no pueda ser negativa:");
    console.log("Cantidad de accesorio3: " + almacen.addQuantityProductInShop(accesorio3, tienda1, -1));
} catch (error) { console.error(error.message) }

try {
    console.log("-----------------");
    console.log("-----------------");
    console.log("Compruebo si la tienda ya existe");
    let coordenadasprueba = new Coords("243123", "2441234");
    let tiendaprueba = new Store(123133, "Erroski", "calle falsa", 1231723, coordenadasprueba);
    console.log("Cantidad de accesorio3: " + almacen.addQuantityProductInShop(accesorio3, tiendaprueba, 6));
} catch (error) { console.error(error.message) }

try {
    console.log("-----------------");
    console.log("-----------------");
    console.log("Pruebo el getCategorProducts antes del borado de producto: ");
    let generador = almacen.getCategoryProducts(categoria3, Accesorios);
    for (const elem of generador) {
        console.log(elem);
    }

    console.log("Pruebo el getShopProducts sobre tienda1 antes de borrado de producto: ");
    let generador2 = almacen.getShopProducts(tienda1, Accesorios);
    for (const elem of generador2) {
        console.log(elem);
    }

    console.log("Elimino Producto (accesorio3) : ");
    console.log(almacen.removeProduct(accesorio3));

    console.log("Pruebo el getCategorProducts despues del borado de producto: ");
    let generador3 = almacen.getCategoryProducts(categoria3, Accesorios);
    for (const elem of generador3) {
        console.log(elem);
    }
    console.log("Pruebo el getShopProducts sobre tienda1 despues de borrado de producto: ");
    let generador4 = almacen.getShopProducts(tienda1, Accesorios);
    for (const elem of generador4) {
        console.log(elem);
    }
} catch (error) { console.error(error.message) }

try {
    console.log("-----------------");
    console.log("-----------------");

    console.log("Pruebo el getCategorProducts antes del borado de Categoria: ");
    let generador33 = almacen.getCategoryProducts(categoria3, Accesorios);
    for (const elem of generador33) {
        console.log(elem);
    }

    console.log("Pruebo el getShopProducts sobre tienda1 antes de borrado: ");
    let generador = almacen.getShopProducts(tienda1, Accesorios);
    for (const elem of generador) {
        console.log(elem);
    }
    
    console.log("Elimino categoria (categoria3): ");
    console.log(almacen.removeCategory(categoria3));

    console.log("Pruebo el getCategorProducts despues del borado de Categoria: ");
    let generador2 = almacen.getCategoryProducts(categoria3, Accesorios);
    for (const elem of generador2) {
        console.log(elem);
    }
    console.log("Compruebo que categoria no existe y salta excepción: ");
    console.log(almacen);
    console.log(almacen.removeCategory(categoria3));
    
} catch (error) { console.error(error) }

try {
    console.log("-----------------");
    console.log("-----------------");

    console.log("Pruebo el getCategorProducts antes del borado de Categoria: ");
    let generador33 = almacen.getCategoryProducts(categoria2, Consolas);
    for (const elem of generador33) {
        console.log(elem);
    }

    console.log("Pruebo el getShopProducts sobre tienda1 antes de borrado: ");
    let generador = almacen.getShopProducts(tienda1, Consolas);
    for (const elem of generador) {
        console.log(elem);
    }

    console.log("Elimino tienda2: ");
    console.log(almacen.removeShop(tienda2));

    console.log("Pruebo el getShopProducts sobre tienda1 despues de borrado de producto: ");
    let generador4 = almacen.getShopProducts(tienda1, Consolas);
    for (const elem of generador4) {
        console.log(elem);
    }
    
    console.log("Compruebo excepción tienda no existe: ")
    almacen.removeShop(tienda2);
} catch (error) { console.error(error.message) }