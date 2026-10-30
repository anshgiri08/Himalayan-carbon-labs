// ============================================
// HIMALAYA CARBON LABS — SCRIPT 01
// Monthly NDVI Composite
// Author: [CTO Name]
// Date: 30 October 2026
// ============================================
// PURPOSE:
//   Generate cloud-free monthly NDVI composites for pilot area.
//   Better than annual median because it captures seasonal variation.
// USAGE:
//   Paste into GEE Code Editor → Run → Select month from dropdown
// OUTPUT:
//   NDVI map + monthly statistics + comparison chart
// ============================================

// 1. PILOT AREA — Uttarkashi (update after field visit)
var pilot = ee.Geometry.Rectangle([78.40, 30.70, 78.55, 30.80]);
Map.centerObject(pilot, 12);

// 2. CONFIGURATION
var YEAR = 2026;
var MONTH = 10;  // October (post-monsoon, clearest skies)
var CLOUD_THRESHOLD = 20;

// 3. DATE RANGE
var startDate = ee.Date.fromYMD(YEAR, MONTH, 1);
var endDate = startDate.advance(1, 'month');

// 4. LOAD SENTINEL-2
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(pilot)
  .filterDate(startDate, endDate)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', CLOUD_THRESHOLD));

print('Images available:', s2.size());

// 5. CLOUD MASKING FUNCTION
function maskClouds(image) {
  var scl = image.select('SCL');
  // SCL classes: 4=vegetation, 5=bare, 6=water, 7=unclassified
  // 8=cloud_medium, 9=cloud_high, 10=thin_cirrus, 11=snow
  var mask = scl.eq(4).or(scl.eq(5)).or(scl.eq(6)).or(scl.eq(7));
  return image.updateMask(mask).divide(10000);
}

// 6. COMPOSITE (median removes remaining clouds)
var composite = s2.map(maskClouds).median().clip(pilot);

// 7. NDVI
var ndvi = composite.normalizedDifference(['B8', 'B4']).rename('NDVI');

// 8. VISUALIZATION
var rgbViz = {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3};
var ndviViz = {
  min: -0.2, max: 0.8,
  palette: ['blue', 'white', 'yellow', 'lightgreen', 'green', 'darkgreen']
};

Map.addLayer(composite, rgbViz, 'RGB (Oct 2026)');
Map.addLayer(ndvi, ndviViz, 'NDVI (Oct 2026)');

// 9. STATISTICS
var stats = ndvi.reduceRegion({
  reducer: ee.Reducer.mean()
    .combine(ee.Reducer.minMax(), null, true)
    .combine(ee.Reducer.stdDev(), null, true),
  geometry: pilot,
  scale: 10,
  maxPixels: 1e13
});

print('═══════════════════════════════');
print('MONTHLY NDVI STATISTICS');
print('═══════════════════════════════');
print('Month:', startDate.format('YYYY-MM'));
print('Stats:', stats);

// 10. HISTOGRAM
var histogram = ui.Chart.image.histogram({
  image: ndvi,
  region: pilot,
  scale: 10,
  maxPixels: 1e13,
  minBucketWidth: 0.05
}).setOptions({
  title: 'NDVI Distribution — ' + startDate.format('YYYY-MM'),
  hAxis: {title: 'NDVI'},
  vAxis: {title: 'Pixel count'},
  colors: ['#1a5f2a']
});
print(histogram);

// 11. MONTHLY COMPARISON (Jan–Dec 2026)
var months = ee.List.sequence(1, 12);
var monthlyNDVI = months.map(function(m) {
  var start = ee.Date.fromYMD(YEAR, m, 1);
  var end = start.advance(1, 'month');
  var img = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(pilot)
    .filterDate(start, end)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', CLOUD_THRESHOLD))
    .map(maskClouds)
    .median();
  var ndviVal = img.normalizedDifference(['B8', 'B4']).reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: pilot,
    scale: 30,
    maxPixels: 1e9
  }).get('nd');
  return ee.Feature(null, {'month': m, 'ndvi': ndviVal});
});

var comparisonChart = ui.Chart.feature.byFeature(
  ee.FeatureCollection(monthlyNDVI), 'month', 'ndvi'
).setChartType('ColumnChart').setOptions({
  title: 'Monthly NDVI Trend — ' + YEAR,
  hAxis: {title: 'Month', ticks: [
    {v:1,t:'Jan'},{v:2,t:'Feb'},{v:3,t:'Mar'},{v:4,t:'Apr'},
    {v:5,t:'May'},{v:6,t:'Jun'},{v:7,t:'Jul'},{v:8,t:'Aug'},
    {v:9,t:'Sep'},{v:10,t:'Oct'},{v:11,t:'Nov'},{v:12,t:'Dec'}
  ]},
  vAxis: {title: 'Mean NDVI'},
  colors: ['#2d8f4e']
});
print(comparisonChart);

// 12. EXPORT
Export.image.toDrive({
  image: ndvi,
  description: 'NDVI_monthly_' + YEAR + '_' + MONTH,
  folder: 'HimalayaCarbon/NDVI_Monthly',
  region: pilot,
  scale: 10,
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});