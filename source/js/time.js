class Time {
    constructor() {}

    getNow() {
        return new Date();
    }

    getHours() {
        return this.getNow().getHours();
    }

    getMinutes() {
        let minutes = this.getNow().getMinutes();
        return minutes < 10 ? (minutes = "0" + minutes) : minutes;
    }

    getSeconds() {
        let seconds = this.getNow().getSeconds();
        return seconds < 10 ? (seconds = "0" + seconds) : seconds;
    }

    getUTCOffset() {
        return this.getNow().getTimezoneOffset() / 60;
    }

    getDateLineCross(cityUTCOffset) {
        if (cityUTCOffset < 0 && cityUTCOffset !== -this.getUTCOffset()) {
            return 1;
        }

        return 0;
    }

    getDayStatus(cityUTCOffset) {
        let now = this.getCityTime(cityUTCOffset);
        let hours = +now.charAt(0) * 10 + +now.charAt(1);
        let status;

        if (hours >= 0 && hours < 4) {
            status = "night";
        } else if (hours >= 4 && hours < 8) {
            status = "morning";
        } else if (hours >= 8 && hours < 17) {
            status = "work";
        } else if (hours >= 17 && hours < 20) {
            status = "evening";
        } else if (hours >= 20 && hours < 24) {
            status = "night";
        } else {
            status = "no-status";
        }

        return status;
    }

    getTime(offset = 0) {
        //Offset limit
        offset >= 12 ? (offset -= 24) : offset;
        offset <= -12 ? (offset += 24) : offset;

        // Check hour > 24
        let hours = this.getHours() + offset;

        // Hours limit
        hours >= 24 ? (hours -= 24) : hours;
        hours <= 0 ? (hours += 24) : hours;
        // Formating to 00:00
        hours < 10 ? (hours = "0" + hours) : hours;

        if (hours === 24) {
            return "00" + ":" + this.getMinutes();
        } else {
            return hours + ":" + this.getMinutes();
        }
    }

    getLocalTime() {
        return (
            this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds()
        );
    }

    getCityTime(UTCOffset) {
        return this.getTime(
            this.getUTCOffset() + UTCOffset + this.getDateLineCross(UTCOffset)
        );
    }

    renderTime() {
        return `Time is ${this.getCityTime(-this.getUTCOffset())}`
    }
}
