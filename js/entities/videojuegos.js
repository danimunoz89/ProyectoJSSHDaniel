"use strict";

import { Product } from "./product.js";
import { InvalidValueException } from "../errors.js";

//Videojuegos es una subclase de Product.
export class Videojuegos extends Product {

    #genero;
    #dlc;

    constructor(serialNumber, name, compania, description, price, tax, images, genero, dlc) {
              
        super(serialNumber, name, compania, description, price, tax, images);

        if (dlc < 0) {
            throw new InvalidValueException("dlc");
        }
        this.#genero = genero;
        this.#dlc = dlc;
    }

    get genero() {
        return this.#genero;
    }

    set genero(newGenero) {
        this.#genero = newGenero;
    }

    get dlc() {
        return this.#dlc;
    }

    set dlc(newDLC) {
        if (newDLC < 0) {
            throw new InvalidValueException("newDLC");
        }
        this.#dlc = newDLC;
    }

}