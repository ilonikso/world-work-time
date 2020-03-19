class City {
    constructor(name, UTCOffset, id) {
        this.name = name || "UTC Time";
        this.UTCOffset = UTCOffset || 0;
        this.id = 0 || id;
    }
}

class Validator {
    constructor() {}

    validateName(name) {
        const error = name.nextElementSibling;
        const re = /^([A-Za-zа-яА-Я]{2,10})?[ .-]+([A-Za-zа-яА-Я]{2,10})|([A-Za-zа-яА-Я]{2,10})$/;

        if (!re.test(name.value)) {
            name.classList.add("is-invalid");
            error.style.visibility = "visible";

            return false;
        } else {
            name.classList.remove("is-invalid");
            error.style.visibility = "hidden";

            return true;
        }
    }

    validateOffset(offset) {
        const zip = offset;
        const error = zip.nextElementSibling;
        const re = /^[0-9]{2}$/;

        if (+zip.value >= -12 && +zip.value <= 12) {
            zip.classList.remove("is-invalid");
            error.style.visibility = "hidden";

            return true;
        } else {
            zip.classList.add("is-invalid");
            error.style.visibility = "visible";

            return false;
        }
    }
}
