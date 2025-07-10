<script lang="ts">
import { bookings } from '$lib/stores/massage';
import { onMount } from 'svelte';
import { get } from 'svelte/store';

let bookingList: any[] = [];

onMount(() => {
  bookingList = get(bookings);
});
</script>

<h1 class="text-2xl font-bold mb-4">Create/Approve Bookings</h1>
<table class="min-w-full border">
  <thead>
    <tr>
      <th class="border px-2 py-1">Client</th>
      <th class="border px-2 py-1">Masseuse</th>
      <th class="border px-2 py-1">Time</th>
      <th class="border px-2 py-1">Status</th>
      <th class="border px-2 py-1">Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each bookingList as b}
      <tr>
        <td class="border px-2 py-1">{b.clientName}</td>
        <td class="border px-2 py-1">{b.masseuseId}</td>
        <td class="border px-2 py-1">{b.time}</td>
        <td class="border px-2 py-1">{b.status}</td>
        <td class="border px-2 py-1">
          {#if b.status === 'pending'}
            <button class="bg-green-500 text-white px-2 py-1 rounded">Approve</button>
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
