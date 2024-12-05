// Global Data Arrays
let events = [];
let services = [];

// Function to Save Data to Local Storage
function saveToLocalStorage() {
    localStorage.setItem("events", JSON.stringify(events));
    localStorage.setItem("services", JSON.stringify(services));
}

// Function to Load Data from Local Storage
function loadFromLocalStorage() {
    events = JSON.parse(localStorage.getItem("events")) || [];
    services = JSON.parse(localStorage.getItem("services")) || [];
    displayEvents();
    displayServices();
}

// Utility to Display Items
function displayItems(listElement, dataArray, templateCallback) {
    listElement.innerHTML = dataArray.map(templateCallback).join("");
}

// Event Management
function addEvent() {
    const title = document.getElementById("event-title").value.trim();
    const date = document.getElementById("event-date").value.trim();
    const description = document.getElementById("event-description").value.trim();

    if (title && date && description) {
        events.push({ title, date, description });
        displayEvents();
        clearEventForm();
        saveToLocalStorage();
    } else {
        alert("Please fill in all fields.");
    }
}

function displayEvents() {
    displayItems(
        document.getElementById("event-list"),
        events,
        (event, index) => `
            <li>
                <strong>${event.title}</strong> - ${event.date}
                <p>${event.description}</p>
                <button onclick="editEvent(${index})">Edit</button>
                <button onclick="deleteEvent(${index})">Delete</button>
            </li>
        `
    );
}

function editEvent(index) {
    const event = events[index];
    document.getElementById("event-title").value = event.title;
    document.getElementById("event-date").value = event.date;
    document.getElementById("event-description").value = event.description;
    deleteEvent(index);
}

function deleteEvent(index) {
    if (confirm("Are you sure you want to delete this event?")) {
        events.splice(index, 1);
        displayEvents();
        saveToLocalStorage();
    }
}

function clearEventForm() {
    document.getElementById("event-form").reset();
}

// Service Management
function addService() {
    const name = document.getElementById("service-name").value.trim();
    const time = document.getElementById("service-time").value.trim();

    if (name && time) {
        services.push({ name, time });
        displayServices();
        clearServiceForm();
        saveToLocalStorage();
    } else {
        alert("Please fill in all fields.");
    }
}

function displayServices() {
    displayItems(
        document.getElementById("service-list"),
        services,
        (service, index) => `
            <li>
                <strong>${service.name}</strong> - ${service.time}
                <button onclick="editService(${index})">Edit</button>
                <button onclick="deleteService(${index})">Delete</button>
            </li>
        `
    );
}

function editService(index) {
    const service = services[index];
    document.getElementById("service-name").value = service.name;
    document.getElementById("service-time").value = service.time;
    deleteService(index);
}

function deleteService(index) {
    if (confirm("Are you sure you want to delete this service?")) {
        services.splice(index, 1);
        displayServices();
        saveToLocalStorage();
    }
}

function clearServiceForm() {
    document.getElementById("service-form").reset();
}

// Load Data When Page Loads
document.addEventListener("DOMContentLoaded", loadFromLocalStorage);
