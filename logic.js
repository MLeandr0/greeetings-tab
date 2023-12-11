var shortcuts = [
    { url: 'https://www.youtube.com/watch?v=4KxRp8jeliQ', imageSrc: 'https://icon.horse/icon/youtube.com' },
    { url: 'https://github.com/', imageSrc: 'https://icon.horse/icon/github.com' },
    { url: 'https://web.whatsapp.com/', imageSrc: 'https://icon.horse/icon/whatsapp.com' },
    { url: 'https://www.linkedin.com/', imageSrc: 'https://icon.horse/icon/linkedin.com' },
    { url: 'https://music.youtube.com/', imageSrc: 'https://icon.horse/icon/music.youtube.com' }
];

const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

const daysNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday'
];

// Initialize your shortcuts array from localStorage or create an empty array if it doesn't exist
var shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];

function saveShortcutsToLocalStorage() {
    // Save the shortcuts array to localStorage
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
}

function loadShortcutsFromLocalStorage() {
    // Load the shortcuts array from localStorage
    shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
}

function openForm(link, event) {
    var commonParent = event.target.parentElement.parentElement.parentElement;

    // Get the array of children elements of the common parent
    var siblings = Array.from(commonParent.children);

    // Get the index of the clicked button's parent within its siblings
    var index = siblings.indexOf(event.target.parentElement.parentElement);

    // Log the index to the console
    console.log("Index of the clicked element's parent:", index);
    
    // Load and display the popup content
    fetch('popup.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('popupContainer').innerHTML = data;
            document.getElementById('linkInput').value = link;
            document.getElementById('popupForm').setAttribute('data-index', index);
            document.getElementById("popupForm").style.display = "block";
            document.getElementById("overlay").style.display = "block";
        });

        event.preventDefault();
}

function getIcon(link) {
    // Define a regular expression to match URLs starting with "https" and ending on "com/"
    const regex = /^https?:\/\/(www\.)?([^\/]+)\//;

    // Use the regular expression to replace the matched part of the URL
    const match = link.match(regex);

    // If there is a match, return the extracted domain, otherwise return the original URL
    return match ? match[2] : link;
}

function updateIcon(shortcutElement, newLink) {
    // Update the corresponding image source
    var imageShortcut = shortcutElement.querySelector('.image-shortcut');
    if (imageShortcut) {
        // Use the getIcon function to get the correct icon from the new link
        imageShortcut.src = "https://icon.horse/icon/" + getIcon(newLink);
    }

    return imageShortcut.src;
}

function editLink() {
    var index = document.getElementById('popupForm').getAttribute('data-index');
    
    // Get the new link from the input field
    var newLink = document.getElementById('linkInput').value;

    // Update the corresponding link in the HTML
    var shortcutBox = document.querySelector('.shortcut-box');
    var shortcutToUpdate = shortcutBox.querySelector(`a:nth-child(${parseInt(index) + 1})`);
    
    if (shortcutToUpdate) {
        shortcutToUpdate.href = newLink;
        var newImageSrc = updateIcon(shortcutToUpdate, newLink);

        // Update the shortcut data in the array
        shortcuts[index] = {
            link: newLink,
            imageSrc: newImageSrc,
            // Add other properties as needed
        };

        // Save the updated shortcuts array to localStorage
        saveShortcutsToLocalStorage();
    }

    closeForm(); // Close the form after saving changes
}


function deleteLink() {
    // Get the index as a number
    var index = parseInt(document.getElementById('popupForm').getAttribute('data-index'));

    // Ensure index is a valid number
    if (!isNaN(index)) {
        // Remove the shortcut corresponding to the clicked index
        shortcuts.splice(index, 1);

        // Remove the corresponding shortcut box from the HTML
        var shortcutBox = document.querySelector('.shortcut-box');
        var shortcutToDelete = shortcutBox.querySelector(`a:nth-child(${index + 1})`);

        // Check if the element exists before trying to remove it
        if (shortcutToDelete) {
            shortcutBox.removeChild(shortcutToDelete);
        } else {
            console.error("Element to delete not found");
        }

        closeForm(); // Close the form after deleting the link
    } else {
        console.error("Invalid index");
    }
}


function closeForm() {
   document.getElementById("popupForm").style.display = "none";
   document.getElementById("overlay").style.display = "none";
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

// Load shortcuts when the page loads
loadShortcutsFromLocalStorage();

// Update every second (1000 milliseconds)
setInterval(updateCurrentTime, 1000);
