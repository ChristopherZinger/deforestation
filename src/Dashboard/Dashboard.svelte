<script>
  import { onMount } from 'svelte';
  import DetectionList from "./DetectionList.svelte";
  import DetectionDetail from "./DetectionDetail.svelte";

  export let events = [];

  const months = [ "January", "February", "March" ];
  let currentMonth = months[0];
  let detectionsForCurrentMonth = [];

  const setCurrentMonth = (month) => {
    if (month === currentMonth){
      currentMonth = "";
      return;
    }
    const m = months.find(item=> item === month);
    currentMonth = m || currentMonth;
    setDetectionsForSelectedMonth(month);
  }

  const setDetectionsForSelectedMonth = (month)=>{
    const monthIndex = months.indexOf(month) + 1;
    let detections = [];
    for(let i=0; i< events.length; i++){
      const event = events[i]
      event.detections = event.detections.map(detection=> ({...detection, eventId: i})) // add id
      detections = [...detections, ...event.detections]
    }
    detectionsForCurrentMonth = detections.filter(detection => parseInt(detection.date.split("-")[1], 10) === monthIndex)
  }

  onMount(()=> setDetectionsForSelectedMonth(currentMonth))
</script>

<DetectionDetail/>
<h3>Timeline</h3>
{#each months as month, i}
  <div class="dateBtn {currentMonth===month ? "active" : ""}" on:click={()=>setCurrentMonth(month)}>{month}</div>
  {#if currentMonth === month}
    <DetectionList detections={detectionsForCurrentMonth} {events} />
  {/if}
{/each}

<style>
  .dateBtn{
    cursor: pointer;
    padding: 7px 25px;
    color: white;
    max-width:90px;
    text-align: center;
    background-color:rgb(37, 134, 158);
    margin-bottom: 20px;
  }

  .active{
    color:  rgb(37, 134, 158);
    border: 2px solid rgb(37, 134, 158);
    background-color: white;
  }
</style>