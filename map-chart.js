<<<<<<< HEAD
// 1. Initialize Map
// Uttarkashi coordinates: 30.7268, 78.4354
const map = L.map('map').setView([30.7268, 78.4354], 12);

// Add OpenStreetMap tiles (Dark theme looks better)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

//marker for Van Panchayat office 
L.marker([30.7268, 78.4354]).addTo(map).bindPopup("<b>Uttarkashi HQ</b><br>Monitoring Centere");
// Draw a polygon (Mock Forest Area)
const forestArea = [
    [30.7350, 78.4400],
    [30.7380, 78.4500],
    [30.7300, 78.4550],
    [30.7250, 78.4450]
];
L.polygon(forestArea, {
    color: "lime",
    fillColor: "#22c55e",
    fillOpacity: 0.4
}).addTo(map).bindPopup("Pilot Area: 100 Hectares");

// 2. Initialize Chart.js
const ctx = document.getElementById('carbonChart').getContext('2d');
new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Apple Orchards', 'Van Panchayat', 'Reserve Forest'],
        datasets: [{
            data: [30, 50, 20], // Mock percentages
            backgroundColor: ['#22c55e', '#eab308', '#3b82f6'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { labels: { color: 'white' } }
        }
    }
=======
// 1. Initialize Map
// Uttarkashi coordinates: 30.7268, 78.4354
const map = L.map('map').setView([30.7268, 78.4354], 12);

// Add OpenStreetMap tiles (Dark theme looks better)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

//marker for Van Panchayat office 
L.marker([30.7268, 78.4354]).addTo(map).bindPopup("<b>Uttarkashi HQ</b><br>Monitoring Centere");
// Draw a polygon (Mock Forest Area)
const forestArea = [
    [30.7350, 78.4400],
    [30.7380, 78.4500],
    [30.7300, 78.4550],
    [30.7250, 78.4450]
];
L.polygon(forestArea, {
    color: "lime",
    fillColor: "#22c55e",
    fillOpacity: 0.4
}).addTo(map).bindPopup("Pilot Area: 100 Hectares");

// 2. Initialize Chart.js
const ctx = document.getElementById('carbonChart').getContext('2d');
new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Apple Orchards', 'Van Panchayat', 'Reserve Forest'],
        datasets: [{
            data: [30, 50, 20], // Mock percentages
            backgroundColor: ['#22c55e', '#eab308', '#3b82f6'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { labels: { color: 'white' } }
        }
    }
>>>>>>> b3801c490b2ee6c451050ee4af6a2977b34dcd86
});