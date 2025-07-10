<script lang="ts">
import { bookings } from '$lib/stores/massage';
import { demoUsers } from '$lib/stores/demoUsers';
import { onMount } from 'svelte';
import { get } from 'svelte/store';

let bookingList: any[] = [];
let clientName = '';
let masseuseId = '';
let time = '';
let error = '';

// Only show masseuses in the selector
const masseuses = demoUsers.filter(u => u.role === 'masseuse');

function addBooking() {
  if (!clientName || !masseuseId || !time) {
    error = 'All fields are required.';
    return;
  }
  bookings.update(bks => [
    ...bks,
    {
      id: Date.now().toString(),
      clientName,
      masseuseId,
      operatorId: '', // Fill with current operator if needed
      scheduleId: '', // Optional
      time,
      status: 'pending'
    }
  ]);
  clientName = '';
  masseuseId = '';
  time = '';
  error = '';
}

onMount(() => {
  bookingList = get(bookings);
});
</script>

<h1 class="text-3xl font-extrabold mb-6 text-primary-700 dark:text-primary-300">Create/Approve Bookings</h1>
<form class="mb-8 flex flex-col gap-4 max-w-lg bg-white dark:bg-gray-800 p-6 rounded shadow" on:submit|preventDefault={addBooking}>
  <div>
    <label class="block mb-1 text-gray-700 dark:text-gray-200 font-semibold">Client Name</label>
    <input class="border p-2 rounded w-full" placeholder="Client Name" bind:value={clientName} />
  </div>
  <div>
    <label class="block mb-1 text-gray-700 dark:text-gray-200 font-semibold">Masseuse</label>
    <select class="border p-2 rounded w-full" bind:value={masseuseId}>
      <option value="">-- Select Masseuse --</option>
      {#each masseuses as m}
        <option value={m.id}>{m.name}</option>
      {/each}
    </select>
  </div>
  <div>
    <label class="block mb-1 text-gray-700 dark:text-gray-200 font-semibold">Time</label>
    <input class="border p-2 rounded w-full" type="datetime-local" bind:value={time} />
  </div>
  {#if error}
    <div class="text-red-600">{error}</div>
  {/if}
  <button class="bg-primary-700 text-white px-4 py-2 rounded hover:bg-primary-800 transition" type="submit">Add Booking</button>
</form>
<div class="overflow-x-auto rounded shadow bg-white dark:bg-gray-800">
  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
    <thead class="bg-gray-50 dark:bg-gray-700">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Masseuse</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
      </tr>
    </thead>
    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
      {#each bookingList as b}
        <tr class="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{b.clientName}</td>
          <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{masseuses.find(m => m.id === b.masseuseId)?.name || b.masseuseId}</td>
          <td class="px-6 py-4 whitespace-nowrap">{b.time}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-block px-2 py-1 rounded text-xs font-semibold
              {b.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''}
              {b.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
              {b.status === 'completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : ''}
              {b.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}">
              {b.status}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {#if b.status === 'pending'}
              <button class="bg-green-500 text-white px-2 py-1 rounded">Approve</button>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
