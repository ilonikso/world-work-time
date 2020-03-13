
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
        let LocalUTCOffset = -this.getUTCOffset();
        

        if((cityUTCOffset < LocalUTCOffset) && (cityUTCOffset < 0) && (LocalUTCOffset - cityUTCOffset > LocalUTCOffset ) && (LocalUTCOffset > 0)){
            //console.log('cross forward');

            return 1;
        }   
        
        if((cityUTCOffset > LocalUTCOffset) && (cityUTCOffset > 0) && (LocalUTCOffset - cityUTCOffset < LocalUTCOffset ) && (LocalUTCOffset < 0)){
            //console.log('cross back');

            return -1;
        }

        return 0
    },

    getDateLineCross2: function(loc, city){
        console.log(' *** Cross function test ***');

        
        if((city < loc) && (city < 0) && (loc - city > loc ) && (loc > 0)){
            console.log('cross forward');
        }

        if((city > loc) && (city > 0) && (loc - city < loc ) && (loc < 0)){
            console.log('cross back');

        }


        console.log(' *** Cross function test ***')
    },
    getLocalTime: function(){
        return this.getHours() + ':' + this.getMinutes() + ':' + this.getSeconds();
    },
    getTime: function(offset = 0){
        
        //Offset limit
        offset >= 12 ? offset = 12 : offset;
        offset <= -12 ? offset = -12 : offset;

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
}

const cities = [
    {
        name: 'Local Time',
        UTCOffset: -nowTime.getUTCOffset()
    },
    {
        name: 'London',
        UTCOffset: 0
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
        name: 'Kiev',
        UTCOffset: 2 
    },
    {
        name: 'Berlin',
        UTCOffset: 1 
    },
];

console.log(cities);
//nowTime.getDateLineCross2(2, 13);

// ------------------------



console.log('Local time | ' + nowTime.getTime());
console.log('UTC time | ' + nowTime.getTime(nowTime.getUTCOffset()));

console.log('New York time | ' + nowTime.getTime(nowTime.getUTCOffset() - 5 + 1));

console.log('Los Angeles time | ' + nowTime.getTime(nowTime.getUTCOffset() - 8 + 1));

console.log('Tokio time | ' + nowTime.getTime(nowTime.getUTCOffset() + 9 ));

cities.forEach(item => {
    console.log(`--- ${item.name} time | ${nowTime.getTime(nowTime.getUTCOffset() + item.UTCOffset + nowTime.getDateLineCross(item.UTCOffset) ) }`);
    //console.log(`To ${item.name} - Cross the line ${nowTime.getDateLineCross(item.UTCOffset)}`)
});


// Update time cycle
(function(){
    setInterval(() => {
        //console.log('Local time | ' + nowTime.getLocalTime());
        
    }, 1000);
})();
