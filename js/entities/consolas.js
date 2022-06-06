"use strict";

import { Product } from "./product.js";
import { InvalidValueException } from "../errors.js";

//Consolas es una subclase de Product.
export class Consolas extends Product {

    #tipo;
    #formato;

    constructor(refTienda, serialNumber, name, compania, description, price, tax, images, tipo, formato) {

        super(refTienda, serialNumber, name, compania, description, price, tax, images);

        if (!(tipo === "sobremesa") && !(tipo === "portatil")) {
            throw new InvalidValueException("tipo");
        }
        if (!(formato === "disco") && !(formato === "cartucho") && !(formato === "digital")) {
            throw new InvalidValueException("formato");
        }
        this.#tipo = tipo;
        this.#formato = formato;
    }

    get tipo() {
        return this.#tipo;
    }

    set tipo(newTipo) {
        if (!(newTipo === "sobremesa") && !(newTipo === "portatil")) {
            throw new InvalidValueException("newTipo");
        }
        this.#tipo = newTipo;
    }

    get formato() {
        return this.#formato;
    }

    set formato(newFormato) {
        if (!(newFormato === "disco") && !(newFormato === "cartucho") && !(newFormato === "digital")) {
            throw new InvalidValueException("newFormato");
        }
        this.#formato = newFormato;
    }

}