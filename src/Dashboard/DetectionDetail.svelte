<script>
  import dayjs from "dayjs";
  import { selectedDetection, selectedEvent } from '../store.js';

  let detection;
  let event;

  selectedDetection.subscribe(v=>{
    detection = v;
  })
  selectedEvent.subscribe(v=>{
    event = v;
  })

  const roundTo = (nr, to=100) => Math.round(nr * to) / to;
</script>

{#if !!detection && !!event }
  <h3>Detail: { event.references[0] }</h3>
  <h5 style="color: lightblue">Type: { detection.category.toUpperCase()}</h5>
  <p> Lat: {roundTo(event.geometry.coordinates[0])}, Long: {roundTo(event.geometry.coordinates[1])}</p>
  <h5>Last Detected: {dayjs(detection.date).format("MMMM DD, YYYY")}</h5>
  <h5>Region: {event.region}</h5>

  <table>
    <tr>
      <td>Total Size</td>
      <td>{(roundTo(detection.totalSize))} units</td>
      {#if detection.areaOverlaps.length > 0}
      <td class="overlap">{roundTo(detection.areaOverlaps[0].size)} units on {detection.areaOverlaps[0].category} </td>
      {/if}
    </tr>
    {#each detection.areaOverlaps.slice(1) as overlap, i}
      <tr>
        <td></td>
        <td></td>
        <td class="overlap">{roundTo(overlap.size)} units on {overlap.category} </td>
      </tr>
    {/each}
  </table>
{:else}
  <h3>Detections Details:</h3>
  <p style="color: gray">Select a detection from the list to see the details.</p>
{/if}

<style>
    table{
    border-spacing: 10px;
  }

  .overlap{
    border-left: 1px solid gray;
    padding-left: 10px;
  }
</style>