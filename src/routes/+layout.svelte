<script>
  import "../app.postcss";
  import {page} from "$app/stores";
  import {DarkMode, Navbar, NavBrand, NavHamburger, NavLi, NavUl} from "flowbite-svelte";
  import {FlowbiteSolid} from "flowbite-svelte-icons";
  import ReusableModal from "$lib/components/ReusableModal.svelte";
  import { user } from '$lib/stores/user';
  import { isAdmin, isOperator, isMasseuse } from '$lib/utils/roles';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';

  let currentUser = null;
  $: user.subscribe(u => currentUser = u);

  function logout() {
    sessionStorage.clear();
    user.set(null);
    goto('/login');
  }
</script>
<Navbar class="z-10" let:hidden let:toggle>
    <NavBrand>
        <DarkMode/>
     <FlowbiteSolid class="text-primary-700 dark:text-primary-300 w-6 h-6"/>
    <span class="font-bold text-lg dark:text-white">Massage Parlor System</span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
        {#if currentUser}
          {#if isAdmin(currentUser)}
            <NavLi href="/admin/users" active={$page.url.pathname.startsWith('/admin/users')}>Users</NavLi>
            <NavLi href="/admin/areas" active={$page.url.pathname.startsWith('/admin/areas')}>Areas</NavLi>
            <NavLi href="/admin/bookings" active={$page.url.pathname.startsWith('/admin/bookings')}>Bookings</NavLi>
          {:else if isOperator(currentUser)}
            <NavLi href="/operator/bookings" active={$page.url.pathname.startsWith('/operator/bookings')}>Bookings</NavLi>
            <NavLi href="/operator/schedules" active={$page.url.pathname.startsWith('/operator/schedules')}>Schedules</NavLi>
          {:else if isMasseuse(currentUser)}
            <NavLi href="/masseuse/schedule" active={$page.url.pathname.startsWith('/masseuse/schedule')}>My Schedule</NavLi>
            <NavLi href="/masseuse/bookings" active={$page.url.pathname.startsWith('/masseuse/bookings')}>My Bookings</NavLi>
          {/if}
          <NavLi on:click={logout}>Logout</NavLi>
        {:else}
          <NavLi href="/login" active={$page.url.pathname === '/login'}>LOGIN</NavLi>
        {/if}
    </NavUl>
</Navbar>
<div class="my-5">
<slot />
    <ReusableModal/>
</div>
