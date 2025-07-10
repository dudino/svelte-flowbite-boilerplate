<script lang="ts">
import { schedules } from '$lib/stores/massage';
import { user } from '$lib/stores/user';
import { onMount } from 'svelte';
import { get } from 'svelte/store';

let mySchedules: any[] = [];
let currentUser: any = null;
let availableFrom = '';
let availableTo = '';
let error = '';

function addSchedule() {
  if (!availableFrom || !availableTo) {
    error = 'Both fields are required.';
    return;
  }
  schedules.update(schs => [
    ...schs,
    {
      id: Date.now().toString(),
      masseuseId: currentUser.id,
      availableFrom,
      availableTo,
      approved: false
    }
  ]);
  error = '';
  availableFrom = '';
  availableTo = '';
  // Refresh mySchedules after adding
  mySchedules = get(schedules).filter(s => s.masseuseId === currentUser.id);
}

onMount(() => {
  currentUser = get(user);
  if (currentUser) {
    mySchedules = get(schedules).filter(s => s.masseuseId === currentUser.id);
  }
});
</script>

<h1 class="text-2xl font-bold mb-4">My Schedule</h1>
<form class="mb-6 flex flex-col gap-2" on:submit|preventDefault={addSchedule}>
  <input class="border p-2 rounded" type="datetime-local" placeholder="Available From" bind:value={availableFrom} />
  <input class="border p-2 rounded" type="datetime-local" placeholder="Available To" bind:value={availableTo} />
  {#if error}
    <div class="text-red-600">{error}</div>
  {/if}
  <button class="bg-primary-700 text-white px-4 py-2 rounded" type="submit">Add Availability</button>
</form>
<ul class="list-disc ml-6">
  {#each mySchedules as s}
    <li>{s.availableFrom} - {s.availableTo} ({s.approved ? 'Approved' : 'Pending'})</li>
  {/each}
</ul>
