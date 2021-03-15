<script>
    import { Map } from '@beyonk/svelte-mapbox';
    import MapDetections from "./MapDetections.svelte"
    import { selectedDetection, selectedEvent } from "../store";
    import { afterUpdate } from 'svelte';
    import MapWMTS from "./MapWMTS.svelte";
    import { MAP_API_KEY } from "../secret.js"

    let event;
    let detection;
    let mapComponent;
    const zoom = 14;
    const eventGeometry = {type: "MultiPolygon", coordinates:[]};

    selectedDetection.subscribe(value => detection = value)
    selectedEvent.subscribe(value => event = value)   

    function onReady() {
      let center = [117.8, 4];
      if(event){
        center = event.geometry.coordinates;
      }
      mapComponent.flyTo({center})
    }

    afterUpdate(()=>{
      if(event){
        eventGeometry.coordinates = event.detections.reduce((acc, detection)=> {
          return [...acc, ...detection.geometry.coordinates]
        },[])
      }

      try{
        mapComponent.flyTo({center: event?.geometry.coordinates, zoom})
      } catch (err) {
        console.log(err.message)
      }
    })

</script>

<Map accessToken={MAP_API_KEY}
	style="mapbox://styles/mapbox/outdoors-v11"
	zoom={zoom}
  bind:this={mapComponent} 
  on:ready={onReady}
>
  <MapWMTS />
    {#if (eventGeometry.coordinates.length > 0) }
      <MapDetections geometry={eventGeometry} name="allDetections" options={{rgb: "70,10,180", a:".20"}} />
    {/if}
    {#if (!!detection) }
      <MapDetections geometry={detection.geometry} name="detection" options={{rgb: "255,255,255", a: ".8"}} />
    {/if}
</Map>