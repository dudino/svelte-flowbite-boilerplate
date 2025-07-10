<script lang="ts">
import { demoUsers, loggedInUser } from '$lib/stores/demoUsers';
import { user } from '$lib/stores/user';
import { goto } from '$app/navigation';

let selectedEmail = '';
let error = '';

function login() {
  const found = demoUsers.find(u => u.email === selectedEmail);
  if (found) {
    loggedInUser.set(found);
    user.set(found);
    sessionStorage.user = JSON.stringify(found);
    goto('/');
  } else {
    error = 'Invalid user.';
  }
}
</script>

<div class="max-w-md mx-auto mt-16 p-8 bg-white dark:bg-gray-800 rounded shadow">
  <h1 class="text-2xl font-bold mb-6 dark:text-white">Login</h1>
  <label class="block mb-2 text-gray-700 dark:text-gray-200">Select User</label>
  <select bind:value={selectedEmail} class="w-full mb-4 p-2 border rounded">
    <option value="">-- Choose a user --</option>
    {#each demoUsers as u}
      <option value={u.email}>{u.name} ({u.role})</option>
    {/each}
  </select>
  {#if error}
    <div class="text-red-600 mb-2">{error}</div>
  {/if}
  <button class="w-full bg-primary-700 text-white py-2 rounded hover:bg-primary-800" on:click={login} disabled={!selectedEmail}>Login</button>
</div>

<!-- Remove old login.svelte if it exists, and ensure login/+page.svelte is the only login page. -->
