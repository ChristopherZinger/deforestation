<script>
  import { selectedDetection, selectedEvent } from '../store.js';

  export let events = [];
  export let detections = [];

  const setSelectedDetection = (detection) => {
    selectedDetection.update(()=> detection)
    selectedEvent.update(()=> events[detection.eventId])
  }
  
</script>

<div class="detections-wrapper">
  <table>
    {#each detections as detection, i}
          <tr class="topRow"  on:click={()=>setSelectedDetection(detection)} >
            <td>{i}</td>
            <td class="date" colspan="2">Detection Date : {detection.date}</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>Size: {Math.round(detection.totalSize)} units</td>
            <td class="overlap">Non overlap size: {Math.round(detection.nonOverlapSize)} units</td>
          </tr>
          {#each detection.areaOverlaps as overlap, i}
            <tr>
              <td></td>
              <td></td>
              <td class="overlap">{overlap.category} {Math.round(overlap.size)} units</td>
            </tr>
          {/each}
    {/each}
  </table>
</div>

<style>
  table{
    width: 500px;
    border-spacing: 0px 1rem;
  }

  td:first{
    width: 10px;
  }

  .overlap{
    border-left: 1px solid black;
    padding-left: 10px;
  }

  .date{
    font-weight: bold;
  }

  .detections-wrapper{
    max-height: 300px;
    overflow-y: auto;
    display: inline-block;
  }

  .topRow{
    background-color: rgb(241, 241, 241);
    cursor: pointer;
    transition-duration: .4s;
  }

  .topRow td{
    padding: 7px 5px;
  }

  .topRow:hover{
    background-color: aquamarine;
    text-decoration: underline;
  }

</style>

