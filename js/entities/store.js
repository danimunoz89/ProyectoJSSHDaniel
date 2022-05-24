"use strict";
import { EmptyValueException, InvalidRegexException } from "../errors.js";

//Función que checkea el formato del imagen.
function isImage(images) {
    let imagesRegex = /([A-z\-_0-9\/\.]*\.(png|jpg|jpeg|gif))/;
    if (imagesRegex.test(images)) {
        return true;
    }
}

export class Store {

    #cif;
    #name;
    #address;
    #phone;
    #coords;
    #images;
    //Añado un nuevo atributo id para facilitar la obtención de información
    //de cara a mostrar productos de forma dinámica en el html.
    #id;

    constructor(cif, name, address, phone, coords, images, id) {

        if (!name) {
            throw new EmptyValueException("name");
        }

        if (!isImage(images)) {
            throw new InvalidRegexException("images");
        }

        if (!id) {
            throw new EmptyValueException("id");
        }

        this.#cif = cif;
        this.#name = name;
        this.#address = address;
        this.#phone = phone;
        this.#coords = coords;
        this.#images = images;
        this.#id = id;
    }

    get id () {
        return this.#id;
    }

    get cif() {
        return this.#cif;
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

    get address() {
        return this.#address;
    }

    set address(newAddress) {
        this.#address = newAddress;
    }

    get phone() {
        return this.#phone;
    }

    set phone(newPhone) {
        this.#phone = newPhone;
    }

    get coords() {
        return this.#coords;
    }

    set coords(newCoords) {
        this.#coords = newCoords;
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