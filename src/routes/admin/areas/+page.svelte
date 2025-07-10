<script lang="ts">
import { areas, rooms } from '$lib/stores/massage';
import { get } from 'svelte/store';
import { onMount } from 'svelte';
import { Card, Button } from 'flowbite-svelte';

let areaList: any[] = [];
let roomList: any[] = [];
let newArea = '';
let newRoom = '';
let selectedArea = '';

function addArea() {
  if (!newArea) return;
  areas.update(a => [...a, { id: Date.now().toString(), name: newArea }]);
  newArea = '';
  areaList = get(areas);
}

function deleteArea(id: string) {
  areas.update(a => a.filter(ar => ar.id !== id));
  rooms.update(r => r.filter(room => room.areaId !== id));
  areaList = get(areas);
  roomList = get(rooms);
}

function addRoom() {
  if (!newRoom || !selectedArea) return;
  rooms.update(r => [...r, { id: Date.now().toString(), name: newRoom, areaId: selectedArea }]);
  newRoom = '';
  roomList = get(rooms);
}

function deleteRoom(id: string) {
  rooms.update(r => r.filter(room => room.id !== id));
  roomList = get(rooms);
}

onMount(() => {
  areaList = get(areas);
  roomList = get(rooms);
});
</script>

<section class="mb-8">
  <Card class="max-w-2xl mx-auto bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
    <h1 class="text-3xl font-extrabold mb-2 text-primary-700 dark:text-primary-300">Manage Areas & Rooms</h1>
    <p class="mb-2 text-gray-700 dark:text-gray-200">Administrators can add, edit, or remove areas and rooms. Each area can have multiple rooms. Masseuses will select a room for their schedule.</p>
  </Card>
</section>

<div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
  <div class="bg-white dark:bg-gray-800 rounded shadow p-6">
    <h2 class="text-xl font-bold mb-4">Areas</h2>
    <form class="flex gap-2 mb-4" on:submit|preventDefault={addArea}>
      <input class="flex-1 border p-2 rounded" placeholder="New Area Name" bind:value={newArea} />
      <Button type="submit">Add Area</Button>
    </form>
    <ul>
      {#each areaList as a}
        <li class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
          <span>{a.name}</span>
          <Button color="failure" size="xs" on:click={() => deleteArea(a.id)}>Delete</Button>
        </li>
      {/each}
    </ul>
  </div>
  <div class="bg-white dark:bg-gray-800 rounded shadow p-6">
    <h2 class="text-xl font-bold mb-4">Rooms</h2>
    <form class="flex gap-2 mb-4" on:submit|preventDefault={addRoom}>
      <select class="border p-2 rounded flex-1" bind:value={selectedArea} required>
        <option value="">-- Select Area --</option>
        {#each areaList as a}
          <option value={a.id}>{a.name}</option>
        {/each}
      </select>
      <input class="flex-1 border p-2 rounded" placeholder="New Room Name" bind:value={newRoom} />
      <Button type="submit">Add Room</Button>
    </form>
    <ul>
      {#each roomList as r}
        <li class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
          <span>{r.name} <span class="text-xs text-gray-400">({areaList.find(a => a.id === r.areaId)?.name})</span></span>
          <Button color="failure" size="xs" on:click={() => deleteRoom(r.id)}>Delete</Button>
        </li>
      {/each}
    </ul>
  </div>
</div>
