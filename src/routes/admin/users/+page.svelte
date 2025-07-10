<script lang="ts">
import { users } from '$lib/stores/user';
import { onMount } from 'svelte';
import { get } from 'svelte/store';
import { Card, Badge, Tooltip } from 'flowbite-svelte';

let userList: any[] = [];

onMount(() => {
  userList = get(users);
});
</script>

<section class="mb-8">
  <Card class="max-w-2xl mx-auto bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
    <h1 class="text-3xl font-extrabold mb-2 text-primary-700 dark:text-primary-300">Manage Users</h1>
    <p class="mb-2 text-gray-700 dark:text-gray-200">Below is a list of all users registered in the system. Each user has a role: <Badge color="blue">Administrator</Badge>, <Badge color="green">Operator</Badge>, or <Badge color="pink">Masseuse</Badge>. Roles determine what actions users can perform.</p>
    <p class="text-gray-600 dark:text-gray-400 text-sm">Tip: You can add, edit, or remove users in future versions.</p>
  </Card>
</section>

<div class="overflow-x-auto rounded shadow bg-white dark:bg-gray-800 max-w-4xl mx-auto">
  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
    <thead class="bg-gray-50 dark:bg-gray-700">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
      </tr>
    </thead>
    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
      {#each userList as u}
        <tr class="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{u.name}</td>
          <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{u.email}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <Badge color={u.role === 'administrator' ? 'blue' : u.role === 'operator' ? 'green' : 'pink'}>
              {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
            </Badge>
            {#if u.role === 'masseuse'}
              <Tooltip content="Masseuses can register their schedules to Koubkova or Halkova areas.">
                <span class="ml-2 text-xs text-gray-400 cursor-help">?</span>
              </Tooltip>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
