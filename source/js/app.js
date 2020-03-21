// Initialize time object
const nowTime = new Time();
const ls = new Storage();
const valid = new Validator();
const modal = new Modal();

ls.getItemsFromStorage().forEach(item => {
    console.log(item);
});

// UI refs --------------------
const UIlocalTime = document.querySelector(".map__local");
const UITimeContainer = document.querySelector(".map__items");
const UIPageTitle = document.querySelector("title");
const UICitiesNumber = document.querySelector(".map__cities-num");
const UIInputCity = document.querySelector(".map__input-city");
const UIInputOffset = document.querySelector(".map__input-offset");
const UIInputSubmit = document.querySelector(".map__input-submit");
const UIInputEdit = document.querySelector(".map__input-submit-edit");
const UIInputCancel = document.querySelector(".map__input-submit-cancel");

const UICitiesRender = function(cities){
    UITimeContainer.innerHTML = '';

    cities.forEach((item, index) => {
        let html;

        html = `
        <div class="map__item map__item--${nowTime.getDayStatus(
            item.UTCOffset
        )}" data-id="${item.id}">
            <span class="map__item-city">${item.name}</span>
            <span class="map__item-time">${nowTime.getCityTime(
                item.UTCOffset
            )}</span>
            <span class="map__item-status">${nowTime.getDayStatus(
                item.UTCOffset
            )}</span>
            <span class="map__item-edit" title="edit city">Edit</span>
            <span class="map__item-close" title="delete city">Close</span>
        </div>
        `;

        UITimeContainer.innerHTML += html;
    });

    let addButton = `
    <div class="map__item map__item--add">
        <span class="map__item-city">Add new city</span>
    </div>
    `;

    UICitiesNumber.textContent = cities.length;

    UITimeContainer.innerHTML += addButton;

    


    document.querySelector(".map__item--add").addEventListener("click", () => {
        modal.show();
    });
};

// Add Item

//UIAddItem.addEventListener('click', () => {
//modal.show();
//});

UIInputSubmit.addEventListener("click", e => {
    let city = UIInputCity,
        offset = UIInputOffset;

    // Show modal

    if (city !== "" && offset !== "") {
        if (
            valid.validateName(UIInputCity) &&
            valid.validateOffset(UIInputOffset)
        ) {
            // Create new Item and Update DOM
            let newItem = new City(
                city.value,
                parseInt(offset.value),
                ls.getNewID()
            );
            ls.storeItem(newItem);
            UICitiesRender(ls.getItemsFromStorage());

            // Clear fields
            UIInputCity.value = "";
            UIInputOffset.value = "";

            // Close modal
            modal.hide();
        }
    }

    e.preventDefault();
});



// Delete Item
UITimeContainer.addEventListener("click", e1 => {
    if (e1.target.className === "map__item-close") {
        let item = e1.target.parentElement;
        let itemId = item.getAttribute("data-id");
        updateFlag = true;

        ls.deleteItemFromStorage(parseInt(itemId));
        UICitiesRender(ls.getItemsFromStorage());
    }

    e1.preventDefault();
});

// Edit Item

UITimeContainer.addEventListener("click", e2 => {
    if (e2.target.className === "map__item-edit") {
        let item = e2.target.parentElement;
        let itemId = item.getAttribute("data-id");
        let city = ls.getItemFromStorage(parseInt(itemId));

        modal.show("edit");

        UIInputCity.value = city.name;
        UIInputOffset.value = city.UTCOffset;

        // Edit state
        item.classList.add("map__item--edit");

        // Submit Edits
        UIInputEdit.addEventListener("click", () => {
            let city = UIInputCity,
                offset = UIInputOffset;

            if (city !== "" && offset !== "") {
                if (
                    valid.validateName(UIInputCity) &&
                    valid.validateOffset(UIInputOffset)
                ) {
                    let newItem = new City(
                        city.value,
                        parseInt(offset.value),
                        +itemId
                    );

                    // Update and render cities
                    ls.updateItemFromStorage(itemId, newItem);
                    UICitiesRender(ls.getItemsFromStorage());

                    // Clear fields
                    UIInputCity.value = "";
                    UIInputOffset.value = "";

                    item.classList.remove("map__item--edit");

                    modal.hide();
                }
            }
        });

        // Cancel Edits
        UIInputCancel.addEventListener("click", () => {
            modal.hide(item);

            // Clear fields
            UIInputCity.value = "";
            UIInputOffset.value = "";

            item.classList.remove("map__item--edit");
        });

        //console.log(city);
    }

    e2.preventDefault();
});




// UI refs --------------------

// Time Initialization
UIlocalTime.textContent = nowTime.getLocalTime();
UIPageTitle.textContent = nowTime.renderTime();
UICitiesRender(ls.getItemsFromStorage());

// Update time cycle
(function() {
    // Modal watcher
    modal.watch();

    setInterval(() => {
        // Update Local times
        UIlocalTime.textContent = nowTime.getLocalTime();

        // Update cities time every minute
        if (nowTime.getSeconds() == 0) {
            UICitiesRender(ls.getItemsFromStorage());
            UIPageTitle.textContent = nowTime.renderTime();
        }

    }, 1000);
})();
