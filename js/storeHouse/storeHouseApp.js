import { SHSingleton } from "./storeHouseModel.js";
import { EmptyValueException, valueIncludedException, valueNotIncludedException, nullException, InvalidValueException, InvalidTypeObjectException } from "./storeHouseModel.js";;
import { Accesorios } from "./storeHouseModel.js";
import { Category } from "./storeHouseModel.js";
import { Consolas } from "./storeHouseModel.js";
import { Coords } from "./storeHouseModel.js";
import { Product } from "./storeHouseModel.js";
import { Store } from "./storeHouseModel.js";
import { Videojuegos } from "./storeHouseModel.js";
import { storeHouseView } from "./storeHouseView.js";
import { storeHouseController } from "./storeHouseController.js";

//Genero la aplicación instanciando el StoreHouse con el getInstance.
const StoreHouseApp = new storeHouseController(SHSingleton.getInstance("Almacenillo"), new storeHouseView());


export {StoreHouseApp};

