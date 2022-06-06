"use strict";
import { EmptyValueException } from "../errors.js";

export class Coords {

    #latitude;
    #longitude;

    constructor(latitude, longitude) {

        if (!latitude) {
            throw new EmptyValueException("latitude");
        }
        if (!longitude) {
            throw new EmptyValueException("longitude");
        }

        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    get latitude() {
        return this.#latitude;
    }

    set latitude(newLatitude) {
        if (!newLatitude) {
            throw new EmptyValueException("newLatitude");
        }
        this.#latitude = newLatitude;
    }

    get longitude() {
        return this.#longitude;
    }

    set longitude(newLongitude) {
        if (!newLongitude) {
            throw new EmptyValueException("newLongitude");
        }
        this.#longitude = newLongitude;
    }

}