import * as L from 'leaflet';
import homicides from '../_data/harvard_park_homicides.json';
import MiniMap from 'leaflet-minimap';

// Create map, add satellite area, set location to the 62nd and Harvard BLVD, and set Zoom level
const map = L.map(
  'map',
  { scrollWheelZoom: false } // Remove default scroll wheel zoom behavior
);
const satelliteLayer = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGF0aW1lcyIsImEiOiJjanJmNjg4ZzYweGtvNDNxa2ZpZ2lma3Z4In0.g0lYVIEs9Y5QcUOhXactHA'
);
satelliteLayer.addTo(map);
map.setView([33.98342046314282, -118.30681395997071], 18);

//  Loop through homicide records and add marker for where each death occured
homicides.forEach((obj) => {
  L.circleMarker([obj.latitude, obj.longitude])
    .addTo(map) // Add markers at homicide locations
    .bindTooltip(obj.first_name + ' ' + obj.last_name, { permanent: true }); // Add tooltip with victims name
});

const satelliteLayer2 = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGF0aW1lcyIsImEiOiJjanJmNjg4ZzYweGtvNDNxa2ZpZ2lma3Z4In0.g0lYVIEs9Y5QcUOhXactHA',
  {
    maxZoom: 13,
  }
);

const miniMap = new MiniMap(satelliteLayer2);
miniMap.addTo(map);

console.log('Leaflet', L);
console.log(homicides);
