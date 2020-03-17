

// Initialize time object
const nowTime = new Time();
const ls = new Storage();
const valid = new Validator();


ls.getItemsFromStorage().forEach(item => {
    console.log(item);
});


 /* const cities = [
    {
        name: 'London',
        UTCOffset: 0
    },
    {
        name: 'Donetsk',
        UTCOffset: 3
    },
    {
        name: 'Moscow',
        UTCOffset: 3
    },
    {
        name: 'New York',
        UTCOffset: -5
    },
    {
        name: 'Los Angeles',
        UTCOffset: -8
    },
    {
        name: 'Tokio',
        UTCOffset: 9 
    },
    {
        name: 'New Delhi',
        UTCOffset: 6 
    },
    {
        name: 'Kiev',
        UTCOffset: 2 
    },
    {
        name: 'Berlin',
        UTCOffset: 1 
    },
]; */ 

/* cities.forEach(item => {
    ls.storeItem(item);
}) */
//onst cityItem = new City ();
//ls.storeItem(cityItem);


// UI refs --------------------
const UIlocalTime = document.querySelector('.map__local');
const UITimeContainer = document.querySelector('.map__items');
const UIPageTitle = document.querySelector('title');
const UIInputCity = document.querySelector('.map__input-city');
const UIInputOffset = document.querySelector('.map__input-offset');
const UIInputSubmit = document.querySelector('.map__input-submit');


const UICitiesRender = function(cities){
    UITimeContainer.innerHTML = '';

    cities.forEach((item, index) => {
        let html;
    
        html = `
        <div class="map__item map__item--${nowTime.getDayStatus(item.UTCOffset)}" data-id="${item.id}">
            <span class="map__item-city">${item.name}</span>
            <span class="map__item-time">${nowTime.getCityTime(item.UTCOffset)}</span>
            <span class="map__item-status">${nowTime.getDayStatus(item.UTCOffset)}</span>
            <span class="map__item-edit title="edit item">Edit</span>
            <span class="map__item-close title="delete item">Close</span>
        </div>
        `;
    
        UITimeContainer.innerHTML += html;
    });
};


// Add Item
UIInputSubmit.addEventListener('click', (e) => {
    let city = UIInputCity, 
        offset = UIInputOffset;


    if(city !== '' && offset !== ''){
        if(valid.validateName(UIInputCity) && valid.validateOffset(UIInputOffset)) {
            let ID;
            let cities = ls.getItemsFromStorage();

        
            if(cities.length > 0){
                ID = cities[cities.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new Item and Update DOM
            let newItem = new City(city.value, +offset.value, ID);
            ls.storeItem(newItem);
            UICitiesRender(ls.getItemsFromStorage());

            UIInputCity.value = '';
            UIInputOffset.value = '';
        }
    }
    
    e.preventDefault();
});

// Delete Item
UITimeContainer.addEventListener('click', e1 => {
    let item = e1.target.parentElement;
    let itemId = item.getAttribute('data-id');

    ls.deleteItemFromStorage(+itemId);
    UICitiesRender(ls.getItemsFromStorage());
    
    e1.preventDefault();
});

// UI refs --------------------


// Time Initialization
UIlocalTime.textContent = nowTime.getLocalTime();
UIPageTitle.textContent = nowTime.renderTime();
UICitiesRender(ls.getItemsFromStorage());

// Update time cycle
(function(){
    setInterval(() => {
        // Update Local times
        UIlocalTime.textContent = nowTime.getLocalTime();

        // Update cities time every minute
        if(nowTime.getSeconds() == 0){
            UICitiesRender(ls.getItemsFromStorage());
            UIPageTitle.textContent = nowTime.renderTime();
        }

    }, 1000);
})();
