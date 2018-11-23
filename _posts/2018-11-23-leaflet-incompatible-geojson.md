---
title: Leaflet.js and geojson with wrong order of latitude and longitude
tags:
  - code
---

##### Leaflet and geojson might sometimes have issues because of a standards confusion. This is how to fix it #####

You might end up with geojson that has latitude and longitude in different order than [what leaflet.js expects](https://github.com/Leaflet/Leaflet/issues/3061). If that is the case, here is what you need:

```javascript
L.geoJSON(json, {
    coordsToLatLng: function(coords) {
        return new L.LatLng(coords[0], coords[1], coords[2]);
    }
}).addTo(mymap);
```

Voila!