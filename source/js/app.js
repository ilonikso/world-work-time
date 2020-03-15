
const nowTime = {
    getNow: function(){
        return new Date();
    },

    getHours : function(){
        return this.getNow().getHours();
    },

    getMinutes: function(){
        let minutes = this.getNow().getMinutes();
        return minutes < 10 ? minutes = '0' + minutes : minutes;
    },

    getSeconds: function(){
        let seconds = this.getNow().getSeconds();
        return seconds < 10 ? seconds = '0' + seconds : seconds;
    },

    getUTCOffset: function(){
        return this.getNow().getTimezoneOffset() / 60;
    },

    getDateLineCross: function(cityUTCOffset){
        if(cityUTCOffset < 0 && cityUTCOffset !== -this.getUTCOffset()){  
            return 1;    
        }

        return 0;
    },

    getDayStatus: function(cityUTCOffset){
        let now = this.getCityTime(cityUTCOffset);
        let hours = +now.charAt(0) * 10 + +now.charAt(1);
        let status;

        if(hours >= 0 && hours < 4){
            status = 'night';
        } else if (hours >= 4 && hours < 8) {
            status = 'morning'
        } else if (hours >= 8 && hours < 17) {
            status = 'work'
        } else if (hours >= 17 && hours < 20) {
            status = 'evening'
        } else if (hours >= 20 && hours < 24) {
            status = 'night'
        } else {
            status = 'no-status'
        }
        
        return status;
    },

    getTime: function(offset = 0){
        
        //Offset limit
        offset >= 12 ? offset -= 24 : offset;
        offset <= -12 ? offset += 24 : offset;

        // Check hour > 24
        let hours = this.getHours() + offset;
        
        // Hours limit
        hours >= 24 ? hours -= 24 : hours;
        hours <= 0 ? hours += 24 : hours;
        // Formating to 00:00
        hours < 10 ? hours = '0' + hours : hours;


        if(hours === 24){
            return '00' + ':' + this.getMinutes();
        } else{
            return hours + ':' + this.getMinutes();
        }
    },

    getLocalTime: function(){
        return this.getHours() + ':' + this.getMinutes() + ':' + this.getSeconds();
    },

    getCityTime: function(UTCOffset){
        return this.getTime(this.getUTCOffset() + UTCOffset + this.getDateLineCross(UTCOffset));
    }
}

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

//console.log('Local time | ' + nowTime.getTime());
//console.log('UTC time | ' + nowTime.getTime(nowTime.getUTCOffset()));
//console.log('New York time | ' + nowTime.getTime(nowTime.getUTCOffset() - 5 + 1));
//console.log('Los Angeles time | ' + nowTime.getTime(nowTime.getUTCOffset() - 8 + 1));
//console.log('Tokio time | ' + nowTime.getTime(nowTime.getUTCOffset() + 9 ));
//console.log('Kiev time | ' + nowTime.getTime(nowTime.getUTCOffset() + 2 ));

// Initialization
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
