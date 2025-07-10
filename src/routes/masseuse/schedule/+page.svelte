<script lang="ts">
import { schedules, areas, rooms } from '$lib/stores/massage';
import { user } from '$lib/stores/user';
import { onMount } from 'svelte';
import { get } from 'svelte/store';

let mySchedules: any[] = [];
let currentUser: any = null;
let availableFrom = '';
let availableTo = '';
let areaId = '';
let roomId = '';
let error = '';
let areaList: any[] = [];
let roomList: any[] = [];

function addSchedule() {
  if (!availableFrom || !availableTo || !areaId || !roomId) {
    error = 'All fields are required.';
    return;
  }
  // Check if room is already taken for the selected time
  const overlap = get(schedules).some(s => s.roomId === roomId && (
    (availableFrom < s.availableTo && availableTo > s.availableFrom)
  ));
  if (overlap) {
    error = 'This room is already taken for the selected time.';
    return;
  }
  schedules.update(schs => [
    ...schs,
    {
      id: Date.now().toString(),
      masseuseId: currentUser.id,
      availableFrom,
      availableTo,
      areaId,
      roomId,
      approved: false
    }
  ]);
  error = '';
  availableFrom = '';
  availableTo = '';
  areaId = '';
  roomId = '';
  // Refresh mySchedules after adding
  mySchedules = get(schedules).filter(s => s.masseuseId === currentUser.id);
}

onMount(() => {
  currentUser = get(user);
  areaList = get(areas);
  roomList = get(rooms);
  if (currentUser) {
    mySchedules = get(schedules).filter(s => s.masseuseId === currentUser.id);
  }
});

function getAreaName(id: string) {
  return areaList.find(a => a.id === id)?.name || id;
}
function getRoomName(id: string) {
  return roomList.find(r => r.id === id)?.name || id;
}
</script>

<h1 class="text-2xl font-bold mb-4">My Schedule</h1>
<form class="mb-6 flex flex-col gap-2" on:submit|preventDefault={addSchedule}>
  <select class="border p-2 rounded" bind:value={areaId} required>
    <option value="">-- Select Area --</option>
    {#each areaList as a}
      <option value={a.id}>{a.name}</option>
    {/each}
  </select>
  <select class="border p-2 rounded" bind:value={roomId} required disabled={!areaId}>
    <option value="">-- Select Room --</option>
    {#each roomList.filter(r => r.areaId === areaId) as r}
      <option value={r.id}>{r.name}</option>
    {/each}
  </select>
  <input class="border p-2 rounded" type="datetime-local" placeholder="Available From" bind:value={availableFrom} />
  <input class="border p-2 rounded" type="datetime-local" placeholder="Available To" bind:value={availableTo} />
  {#if error}
    <div class="text-red-600">{error}</div>
  {/if}
  <button class="bg-primary-700 text-white px-4 py-2 rounded" type="submit">Add Availability</button>
</form>
<ul class="list-disc ml-6">
  {#each mySchedules as s}
    <li>{getAreaName(s.areaId)} - {getRoomName(s.roomId)}: {s.availableFrom} - {s.availableTo} ({s.approved ? 'Approved' : 'Pending'})</li>
  {/each}
</ul>
