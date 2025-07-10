<script lang="ts">
import { schedules } from '$lib/stores/massage';
import { user } from '$lib/stores/user';
import { onMount } from 'svelte';
import { get } from 'svelte/store';

let mySchedules: any[] = [];
let currentUser: any = null;

onMount(() => {
  currentUser = get(user);
  if (currentUser) {
    mySchedules = get(schedules).filter(s => s.masseuseId === currentUser.id);
  }
});
</script>

<h1 class="text-2xl font-bold mb-4">My Schedule</h1>
<ul class="list-disc ml-6">
  {#each mySchedules as s}
    <li>{s.availableFrom} - {s.availableTo} ({s.approved ? 'Approved' : 'Pending'})</li>
  {/each}
</ul>
<button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Add Availability</button>
