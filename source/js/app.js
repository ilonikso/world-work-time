// Initialize time object
const nowTime = new Time();

const cities = [
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
];

// UI refs --------------------
const UIlocalTime = document.querySelector('.map__local');
const UITimeContainer = document.querySelector('.map__items');

const UICitiesRender = function(cities){
    UITimeContainer.innerHTML = '';

    cities.forEach((item, index) => {
        let html;
    
        html = `
        <div class="map__item map__item--${nowTime.getDayStatus(item.UTCOffset)}">
            <span class="map__item-city">${item.name}</span>
            <span class="map__item-time">${nowTime.getCityTime(item.UTCOffset)}</span>
            <span class="map__item-status">${nowTime.getDayStatus(item.UTCOffset)}</span>
        </div>
        `;
    
        UITimeContainer.innerHTML += html;
    });
};
// UI refs --------------------


// Time Initialization
UIlocalTime.textContent = nowTime.getLocalTime();
UICitiesRender(cities);

// Update time cycle
(function(){
    setInterval(() => {
        // Update Local times
        UIlocalTime.textContent = nowTime.getLocalTime();

        // Update cities time every minute
        if(nowTime.getSeconds() == 0){
            UICitiesRender(cities);
        }

    }, 1000);
})();
