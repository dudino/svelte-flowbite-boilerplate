<script lang="ts">
import { schedules } from '$lib/stores/massage';
import { demoUsers } from '$lib/stores/demoUsers';
import { onMount } from 'svelte';
import { get } from 'svelte/store';

let scheduleList: any[] = [];
let editId: string | null = null;
let editFrom = '';
let editTo = '';

function approveSchedule(id: string) {
  schedules.update(schs => schs.map(s => s.id === id ? { ...s, approved: true } : s));
  scheduleList = get(schedules);
}

function deleteSchedule(id: string) {
  schedules.update(schs => schs.filter(s => s.id !== id));
  scheduleList = get(schedules);
}

function startEdit(s) {
  editId = s.id;
  editFrom = s.availableFrom;
  editTo = s.availableTo;
}

function saveEdit(id: string) {
  schedules.update(schs => schs.map(s => s.id === id ? { ...s, availableFrom: editFrom, availableTo: editTo } : s));
  scheduleList = get(schedules);
  editId = null;
  editFrom = '';
  editTo = '';
}

function cancelEdit() {
  editId = null;
  editFrom = '';
  editTo = '';
}

onMount(() => {
  scheduleList = get(schedules);
});

function getMasseuseName(id: string) {
  return demoUsers.find(u => u.id === id)?.name || id;
}
</script>

<h1 class="text-2xl font-bold mb-4">Approve & Manage Schedules</h1>
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
        <td class="border px-2 py-1">{getMasseuseName(s.masseuseId)}</td>
        <td class="border px-2 py-1">
          {#if editId === s.id}
            <input class="border p-1 rounded" type="datetime-local" bind:value={editFrom} />
          {:else}
            {s.availableFrom}
          {/if}
        </td>
        <td class="border px-2 py-1">
          {#if editId === s.id}
            <input class="border p-1 rounded" type="datetime-local" bind:value={editTo} />
          {:else}
            {s.availableTo}
          {/if}
        </td>
        <td class="border px-2 py-1">{s.approved ? 'Yes' : 'No'}</td>
        <td class="border px-2 py-1 flex gap-2">
          {#if editId === s.id}
            <button class="bg-blue-500 text-white px-2 py-1 rounded" on:click={() => saveEdit(s.id)}>Save</button>
            <button class="bg-gray-400 text-white px-2 py-1 rounded" on:click={cancelEdit}>Cancel</button>
          {:else}
            {#if !s.approved}
              <button class="bg-green-500 text-white px-2 py-1 rounded" on:click={() => approveSchedule(s.id)}>Approve</button>
            {/if}
            <button class="bg-yellow-500 text-white px-2 py-1 rounded" on:click={() => startEdit(s)}>Edit</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded" on:click={() => deleteSchedule(s.id)}>Delete</button>
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
