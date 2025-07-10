<script lang="ts">
import { bookings } from '$lib/stores/massage';
import { user } from '$lib/stores/user';
import { onMount } from 'svelte';
import { get } from 'svelte/store';

let myBookings: any[] = [];
let currentUser: any = null;

onMount(() => {
  currentUser = get(user);
  if (currentUser) {
    myBookings = get(bookings).filter(b => b.masseuseId === currentUser.id);
  }
});
</script>

<h1 class="text-2xl font-bold mb-4">My Bookings</h1>
<table class="min-w-full border">
  <thead>
    <tr>
      <th class="border px-2 py-1">Client</th>
      <th class="border px-2 py-1">Time</th>
      <th class="border px-2 py-1">Status</th>
    </tr>
  </thead>
  <tbody>
    {#each myBookings as b}
      <tr>
        <td class="border px-2 py-1">{b.clientName}</td>
        <td class="border px-2 py-1">{b.time}</td>
        <td class="border px-2 py-1">{b.status}</td>
      </tr>
    {/each}
  </tbody>
</table>
