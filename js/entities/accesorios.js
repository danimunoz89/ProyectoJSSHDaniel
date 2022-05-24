"use strict";

import { Product } from "./product.js";
import { InvalidValueException } from "../errors.js";

//Accesorios es una subclase de Product.
export class Accesorios extends Product {

    #color;
    #plataforma;

    constructor(serialNumber, name, compania, description, price, tax, images, color, plataforma) {
               
        super(serialNumber, name, compania, description, price, tax, images);

        if (!(plataforma === "xbox") && !(plataforma === "playstation") && !(plataforma === "nintendo") && !(plataforma === "pc")) {
            throw new InvalidValueException("plataforma");
        }
        this.#color = color;
        this.#plataforma = plataforma;
    }

    get color() {
        return this.#color;
    }

    set color(newColor) {
        this.#color = newColor;
    }

    get plataforma() {
        return this.#plataforma;
    }

    set plataforma(newPlataforma) {
        if (!(newPlataforma === "xbox") && !(newPlataforma === "playstation") && !(newPlataforma === "nintendo") && !(newPlataforma === "pc")) {
            throw new InvalidValueException("newPlataforma");
        }
        this.#plataforma = newPlataforma;
    }

}