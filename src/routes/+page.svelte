<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import Invoice from '../components/Invoice.svelte';
  import Login from '../components/Login.svelte';
  import Table from '../components/Table.svelte';
  import { dataModel } from "../store";
  import { browser } from '$app/environment';


</script>



<Login />

{#if $dataModel}
  <Table />
  <Invoice />
{/if}
