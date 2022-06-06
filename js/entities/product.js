"use strict";

import { EmptyValueException, InvalidAccessConstructorException, InvalidRegexException, InvalidValueException } from "../errors.js";

//Función que checkea el Serial Number (regex inventada por mi).
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

export class Product {
    //Añado refTienda para poder tener un punto de referencia entre los productos y la tienda a la que va asociado el mismo.
    //Por defecto, la referencia será la tienda por defecto.
    #refTienda
    #serialNumber;
    #name;
    //Añado Compania porque las subclases Videojuegos, Consolas y Accesorios van a tener esa propiedad
    //por lo que no tiene sentido incorporarlas de forma individual. Tiene mas lógica que se herede.
    #compania;
    #description;
    #price;
    #tax;
    #images;


    constructor(refTienda, serialNumber, name, compania, description, price, tax, images) {

        if (!new.target) throw new InvalidAccessConstructorException();

        if (!refTienda) {
            throw new EmptyValueException("refTienda");
        }

        if ((!serialNumber) || !(isSerialNumber(serialNumber))) {
            throw new InvalidRegexException("serialNumber");
        }
        if (!name) {
            throw new EmptyValueException("name");
        }
        if (!price || (price < 0)) {
            throw new InvalidValueException("price");
        }
        if (!(tax === 4) && !(tax === 10) && !(tax === 21)) {
            throw new InvalidValueException("tax");
        }
        if (!isImage(images)) {
            throw new InvalidRegexException("images");
        }

        this.#refTienda = 789456;
        this.#serialNumber = serialNumber;
        this.#name = name;
        this.#compania = compania;
        this.#description = description;
        this.#price = price;
        this.#tax = tax;
        this.#images = images;

    }

    get refTienda() {
        return this.#refTienda;
    }

    set refTienda(newRefTienda) {
        if (!newRefTienda) {
            throw new EmptyValueException("newRefTienda");
        }
        this.#refTienda = newRefTienda;
    }

    get serialNumber() {
        return this.#serialNumber;
    }

    get name() {
        return this.#name;
    }

    set name(newName) {
        if (!newName) {
            throw new EmptyValueException("newName");
        }
        this.#name = newName;
    }

    get compania() {
        return this.#compania;
    }

    set compania(newCompania) {
        this.#compania = newCompania;
    }

    get description() {
        return this.#description;
    }

    set description(newDescription) {
        this.#description = newDescription;
    }

    get price() {
        return this.#price;
    }

    set price(newPrice) {
        if (!newPrice || (newPrice < 0)) {
            throw new InvalidValueException("newPrice");
        }
        this.#price = newPrice;
    }

    get tax() {
        return this.#tax;
    }

    set tax(newTax) {
        if (!(newTax === 4) || !(newTax === 10) || !(newTax === 21)) {
            throw new InvalidValueException("newTax");
        }
        this.#tax = newTax;
    }

    get images() {
        return this.#images;
    }

    set images(newImage) {
        if (!isImage(newImage)) {
            throw new InvalidRegexException("newImage");
        }
        this.#images = newImage;
    }

}
