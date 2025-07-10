<script lang="ts">
import { schedules } from '$lib/stores/massage';
import { onMount } from 'svelte';
import { get } from 'svelte/store';

let scheduleList: any[] = [];

onMount(() => {
  scheduleList = get(schedules);
});
</script>

<h1 class="text-2xl font-bold mb-4">Approve Schedules</h1>
<table class="min-w-full border">
  <thead>
    <tr>
      <th class="border px-2 py-1">Masseuse</th>
      <th class="border px-2 py-1">From</th>
      <th class="border px-2 py-1">To</th>
      <th class="border px-2 py-1">Approved</th>
      <th class="border px-2 py-1">Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each scheduleList as s}
      <tr>
        <td class="border px-2 py-1">{s.masseuseId}</td>
        <td class="border px-2 py-1">{s.availableFrom}</td>
        <td class="border px-2 py-1">{s.availableTo}</td>
        <td class="border px-2 py-1">{s.approved ? 'Yes' : 'No'}</td>
        <td class="border px-2 py-1">
          {#if !s.approved}
            <button class="bg-green-500 text-white px-2 py-1 rounded">Approve</button>
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
