const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

const daysNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday'
];

function MyFunction() {
    alert('CADELA');
    event.preventDefault();
}

function formatTime(time) {
    if (time < 10) return "0" + time;
    return time;
}

function updateCurrentDate() {
    const currentDate = new Date();
    const currentDateTime = daysNames[currentDate.getDay()] + " - " + monthNames[currentDate.getMonth()];
    document.getElementById("currentDate").innerHTML = currentDateTime;
}

function updateCurrentTime() {
    var time = Date.now();
    var date = new Date(time);
    var currentTime = formatTime(date.getHours()) + ":" + formatTime(date.getMinutes());
    document.getElementById("currentTime").innerHTML = currentTime;
}


// Initial update
updateCurrentDate();
updateCurrentTime();

// Update every second (1000 milliseconds)
setInterval(updateCurrentTime, 1000);
