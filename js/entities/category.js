"use strict";

import { EmptyValueException } from "../errors.js";

export class Category {

    #title;
    #description;
    #id;

    constructor(title, description, id) {
        if (!title) {
            throw new EmptyValueException("title");
        }
        this.#title = title;
        this.#description = description;
        this.#id = id;
    }

    get id () {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    set title(newTitle) {
        if (!newTitle) {
            throw new EmptyValueException("newTitle");
        }
        this.#title = newTitle;
    }

    get description() {
        return this.#description;
    }

    set description(newDescription) {
        this.#description = newDescription;
    }

}