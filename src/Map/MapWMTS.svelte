<script>
  import {  getContext } from 'svelte';
  import { contextKey } from '@beyonk/svelte-mapbox';
  import { WMTS_KEY } from "../secret.js";

  const { getMap } = getContext(contextKey);
  const map = getMap();

  map.addSource( 'geo', {
    type: "raster",
    tiles: [
      `https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_2021-01_mosaic/gmap/{z}/{x}/{y}.png?api_key=${WMTS_KEY}`,
    ],
  })

  map.addLayer({
    id: "geo",
    type: "raster",
    source: "geo",
    paint: {}
  })

</script>

