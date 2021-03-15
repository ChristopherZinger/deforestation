<script>
  import { afterUpdate, getContext } from 'svelte';
  import { contextKey } from '@beyonk/svelte-mapbox';

  export let geometry;
  export let name;
  export let options = {rgb: "255, 255, 255", a: ".3"};

  const { getMap } = getContext(contextKey);
  const map = getMap();

  afterUpdate(()=>{
    try{
      if(!geometry) return;

      if (map.getLayer(name)){
        map.removeLayer(name)
        }

      if( map.getSource(name)){
        map.removeSource(name);
      }
    
      map.addSource( name, {
        type: "geojson",
        data: geometry
      })

      map.addLayer({
        id: name,
        type: "fill",
        source: name,
        paint: {
          "fill-color": `rgba(${options.rgb}, ${options.a})`,
          "fill-outline-color": `rgba(${options.rgb}, 1)`
        }
      })
    } catch (err) {
      console.log(err)
    }

  })
</script>

