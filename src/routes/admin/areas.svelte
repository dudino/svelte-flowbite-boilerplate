<script lang="ts">
import { areas } from '$lib/stores/massage';
import { onMount } from 'svelte';
import { get } from 'svelte/store';

let areaList: any[] = [];

onMount(() => {
  areaList = get(areas);
});
</script>

<h1 class="text-2xl font-bold mb-4">Manage Areas</h1>
<ul class="list-disc ml-6">
  {#each areaList as area}
    <li>{area.name}</li>
  {/each}
</ul>
