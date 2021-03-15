<script>
  import Map from "./Map/Map.svelte";
	import Dashboard from "./Dashboard/Dashboard.svelte";
  import { events } from "./events.json";
</script>

<div class="wrapper">
  <div>
    <Map />
  </div>
  <div class="dashboard-wrapper">
    <Dashboard {events} />
  </div>
</div>

<style>
  .wrapper{
    width: 100vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .dashboard-wrapper{
    padding-left: 50px;
  }
</style>

