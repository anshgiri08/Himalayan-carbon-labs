# Carbon Estimation Methodology v0.1
**Himalaya Carbon Labs**
**Date:** 30 October 2026

## 1. Data Sources
| Source | Resolution | Provider | Cost |
|--------|-----------|----------|------|
| Sentinel-2 | 10m | ESA | Free |
| Landsat-9 | 30m | NASA/USGS | Free |
| Google Earth Engine | Cloud | Google | Free |

## 2. NDVI Calculation
NDVI = (NIR - Red) / (NIR + Red)

Where:
- NIR = Band 8 (842 nm)
- Red = Band 4 (665 nm)

**Interpretation:**
- NDVI > 0.4 = Forest
- NDVI 0.2–0.4 = Shrub/grassland
- NDVI < 0.2 = Non-vegetation

## 3. Biomass Estimation (IPCC Tier 1)
AGB = 120 × NDVI (tonnes/hectare)
*For Himalayan mixed forest*

Species-specific:
- Pine: AGB = 120 × NDVI
- Oak: AGB = 150 × NDVI
- Mixed: AGB = 135 × NDVI

## 4. Carbon Calculation
Carbon = AGB × 0.47 (carbon fraction)
CO2e = Carbon × 3.67 (molecular weight ratio)

## 5. Limitations
- 10m resolution misses small trees
- Cloud cover in monsoon (July–Sept)
- No ground truth validation yet
- Allometric equations are approximations
- Uncertainty: ±20–30%

## 6. Next Steps
1. Ground truth sampling (10 plots)
2. Species-specific equations
3. Uncertainty quantification
4. Third-party verification (Verra/Gold Standard)
5. Annual monitoring

## 7. References
- IPCC Guidelines 2006
- Verra VCS VM0042
- Gold Standard Agriculture Methodology
- Sentinel-2 User Handbook