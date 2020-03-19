class Modal {
    constructor() {
        this.modal = document.querySelector(".modal");
        this.overlay = document.querySelector(".overlay");
        this.editButtons = document.querySelector(".map__edit");
        this.closeModal = document.querySelector(".modal__cross");
    }

    show(state = "new") {
        if (state === "new") {
            this.editButtons.style.display = "none";
            UIInputSubmit.style.display = "block";
        }

        if (state === "edit") {
            UIInputSubmit.style.display = "none";
            this.editButtons.style.display = "flex";
        }

        this.modal.classList.add("active");
        this.overlay.classList.add("active");
    }

    hide() {
        this.modal.classList.remove("active");
        this.overlay.classList.remove("active");
    }

    watch() {
        this.overlay.addEventListener("click", () => {
            this.hide();
        });

        this.closeModal.addEventListener("click", () => {
            this.hide();
        });

        document.body.addEventListener("keyup", e => {
            if (e.keyCode === 27) {
                this.hide();
            }
        });
    }
}
