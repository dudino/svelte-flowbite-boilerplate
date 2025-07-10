<script>
  import "../app.postcss";
  import {page} from "$app/stores";
  import {base} from "$app/paths";
  import {DarkMode, Navbar, NavBrand, NavHamburger, NavLi, NavUl} from "flowbite-svelte";
  import {FlowbiteSolid, GithubSolid} from "flowbite-svelte-icons";
  import ReusableModal from "$lib/components/ReusableModal.svelte";
</script>
<Navbar class="z-10" let:hidden let:toggle>
    <NavBrand>
        <DarkMode/>
     <FlowbiteSolid class="text-primary-700 dark:text-primary-300 w-6 h-6"/>
    <span class="font-bold text-lg dark:text-white">Massage Parlor System</span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
        <NavLi href="{base}/docs" active={$page.url.pathname.endsWith('docs')}>DOCS</NavLi>
        <NavLi href="https://github.com/sroehrl/svelte-flowbite-boilerplate#readme" >
            <GithubSolid/>
        </NavLi>
    </NavUl>
</Navbar>
<div class="my-5">
<slot />
    <ReusableModal/>
</div>
