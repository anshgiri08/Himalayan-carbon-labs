// HIMALAYA CARBON LABS — Biomass Estimation
// IPCC Tier 1 for Himalayan mixed forest

var pilot = ee.Geometry.Rectangle([78.40, 30.70, 78.55, 30.80]);

var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(pilot)
  .filterDate('2026-01-01', '2026-10-30')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));

var composite = s2.median().clip(pilot);
var ndvi = composite.normalizedDifference(['B8', 'B4']).rename('NDVI');

// AGB = 120 * NDVI (t/ha) for Himalayan mixed forest
var agb = ndvi.multiply(120).rename('AGB_tonnes_per_ha');

Map.centerObject(pilot, 12);
Map.addLayer(agb, {min: 0, max: 200, palette: ['white', 'yellow', 'orange', 'green', 'darkgreen']}, 'Biomass (t/ha)');

var meanAgb = agb.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: pilot, scale: 10, maxPixels: 1e9
});
print('Mean Biomass (t/ha):', meanAgb);