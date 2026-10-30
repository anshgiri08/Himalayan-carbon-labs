// HIMALAYA CARBON LABS — NDVI Script
// Author: [Your Name] | Date: 30 Oct 2026
// Pilot Area: Uttarkashi Forest

var pilot = ee.Geometry.Rectangle([78.40, 30.70, 78.55, 30.80]);

// Load Sentinel-2 (2026, cloud-free)
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(pilot)
  .filterDate('2026-01-01', '2026-10-30')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));

var composite = s2.median().clip(pilot);
var ndvi = composite.normalizedDifference(['B8', 'B4']).rename('NDVI');

// Display
Map.centerObject(pilot, 12);
Map.addLayer(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'RGB');
Map.addLayer(ndvi, 
  {min: -0.2, max: 0.8, palette: ['blue', 'white', 'yellow', 'green', 'darkgreen']}, 
  'NDVI');

// Stats
var meanNdvi = ndvi.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: pilot, scale: 10, maxPixels: 1e9
});
print('Mean NDVI:', meanNdvi);

// Forest mask
var forest = ndvi.gt(0.4);
var forestArea = forest.multiply(ee.Image.pixelArea()).divide(10000);
var areaStats = forestArea.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: pilot, scale: 10, maxPixels: 1e9
});
print('Forest Area (ha):', areaStats);

Map.addLayer(forest.updateMask(forest), {palette: ['darkgreen']}, 'Forest');