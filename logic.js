const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

function formatTime(time) {
    if (time < 10) return "0" + time;
    return time;
}

function myFunction() {
    alert("Function called from HTML!");
}

function updateCurrentDate() {
    const currentDate = new Date();
    const currentDateTime = currentDate.getDay() + "° " + monthNames[currentDate.getMonth()] + " - " + currentDate.getFullYear();
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
