# spectrum-map



<!-- Auto Generated Below -->


## Overview

Spectrum Map Component

A flexible map component that supports multiple providers (Leaflet, MapLibre GL JS)
via dynamic imports and a common adapter interface.

## Properties

| Property      | Attribute      | Description                                                                                                                                                            | Type                      | Default     |
| ------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------- |
| `config`      | `config`       | Map configuration (JSON-driven) Can be a JSON string or object                                                                                                         | `MapConfig \| string`     | `undefined` |
| `data`        | `data`         | Map data for markers, regions, heatmap, routes Can be a JSON string or object                                                                                          | `MapData \| string`       | `undefined` |
| `debug`       | `debug`        | Whether to enable debug logging                                                                                                                                        | `boolean`                 | `false`     |
| `mapProvider` | `map-provider` | Map provider to use ('leaflet' or 'maplibre') Default: 'leaflet' (lightweight, 40KB)  Choose 'maplibre' for modern GPU-accelerated vector tiles and 3D support (200KB) | `"leaflet" \| "maplibre"` | `'leaflet'` |


## Events

| Event          | Description                            | Type                                |
| -------------- | -------------------------------------- | ----------------------------------- |
| `boundsChange` | Event emitted when map bounds change   | `CustomEvent<MapBoundsChangeEvent>` |
| `markerClick`  | Event emitted when a marker is clicked | `CustomEvent<MapMarkerClickEvent>`  |
| `regionClick`  | Event emitted when a region is clicked | `CustomEvent<MapRegionClickEvent>`  |


## Methods

### `fitBounds() => Promise<void>`

Public method: Fit bounds to show all features

#### Returns

Type: `Promise<void>`



### `getBounds() => Promise<{ north: number; south: number; east: number; west: number; }>`

Public method: Get current bounds

#### Returns

Type: `Promise<{ north: number; south: number; east: number; west: number; }>`



### `resize() => Promise<void>`

Public method: Resize map (call after container size changes)

#### Returns

Type: `Promise<void>`



### `setCenter(lat: number, lng: number, zoom?: number) => Promise<void>`

Public method: Set map center

#### Parameters

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| `lat`  | `number` |             |
| `lng`  | `number` |             |
| `zoom` | `number` |             |

#### Returns

Type: `Promise<void>`



### `setZoom(zoom: number) => Promise<void>`

Public method: Set zoom level

#### Parameters

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| `zoom` | `number` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------


