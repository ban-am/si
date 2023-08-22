<script lang="ts">
    import { onMount } from "svelte";
  import { hashPassword, decrypt, type DataModel } from "../lib/index";
  import { dataHash, dataModel } from "../store";

  onMount(() => {
    onLoad();
  })

  let password: string;

  function onLogin() {
    if (!password) return;

    let hash = hashPassword(password);
    tryLogin(hash);
  }


  function onLogout() {
      localStorage.removeItem('pass');
      dataModel.set(undefined);
  }

  function tryLogin(hash: string) {
    let obj: DataModel = decrypt(dataHash, hash);

    if (!obj) {
      alert('Nesprávne heslo.');
      return;
    }

    obj.items = [
        { id: 'id-1', name: "Rol", price: 1.99, total: 0, amount: 0 },
        { id: 'id-2', name: "Bread", price: 2.00 , total: 0, amount: 0},
        { id: 'id-3', name: "Pen", price: 3.00, total: 0, amount: 0 },
      ]

    localStorage.setItem('pass', hash);

    for (let item of obj.items) {
      item.total = 0;
    }
    
    dataModel.set(obj);
  }
  
  function onLoad() {
    const passwordHash = localStorage.getItem('pass');
    if (!passwordHash) return;
    tryLogin(passwordHash);
  }


</script>

<div class="section">
  {#if !$dataModel }
    <label for="password">Zadaj heslo:</label>
    <input type="password" id="password" placeholder="Heslo" required autocomplete="off" bind:value={password}>
    <button on:click={onLogin}>Prihlasiť sa</button>
  {:else}
    <button on:click={onLogout}>Odhlasiť sa</button>
  {/if}
</div>
