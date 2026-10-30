# Himalayan Carbon Labs 🌲

A satellite-based MRV (Measurement, Reporting, and Verification) dashboard for forest carbon credits, built specifically for the Uttarakhand region. 

This project was developed as a prototype to help local communities (like Van Panchayats) and the state government measure forest biomass and estimate carbon credits without cutting any trees.

## 🚀 What's inside?

This repository contains the full proof-of-concept stack, including frontend UI, backend structure, and Google Earth Engine scripts.

*   **Interactive Dashboard:** Real-time tracking of mapped area, estimated credits, and revenue.
*   **GIS Map Integration:** Leaflet.js map showing the pilot area boundaries in Uttarkashi.
*   **Carbon Estimator:** A quick tool to calculate potential credits based on land area.
*   **PDF Export:** One-click report generation for sharing data with stakeholders.
*   **GEE Scripts:** Python/JavaScript scripts for satellite data processing (Sentinel-2/Landsat).

## 📁 Repository Structure

```text
├── backend/          # Server-side logic and API endpoints
├── data/             # Sample datasets and mock JSON files
├── docs/             # Project documentation and DPRs
├── forms/            # Farmer/Van Panchayat agreement templates
├── frontend/src/     # Main UI components (if using React/Vite)
├── gee-scripts/      # Google Earth Engine satellite processing code
├── calculator-report.js # Logic for credit calculation and PDF generation
├── map-chart.js      # Leaflet map and Chart.js initialization
├── index.html        # Main dashboard interface
└── readme.md
