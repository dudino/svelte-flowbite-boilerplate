<script lang="ts">
import { users } from '$lib/stores/user';
import { onMount } from 'svelte';
import { get } from 'svelte/store';

let userList: any[] = [];

onMount(() => {
  userList = get(users);
});
</script>

<h1 class="text-2xl font-bold mb-4">Manage Users</h1>
<table class="min-w-full border">
  <thead>
    <tr>
      <th class="border px-2 py-1">Name</th>
      <th class="border px-2 py-1">Email</th>
      <th class="border px-2 py-1">Role</th>
    </tr>
  </thead>
  <tbody>
    {#each userList as u}
      <tr>
        <td class="border px-2 py-1">{u.name}</td>
        <td class="border px-2 py-1">{u.email}</td>
        <td class="border px-2 py-1">{u.role}</td>
      </tr>
    {/each}
  </tbody>
</table>
