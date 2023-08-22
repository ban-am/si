<script lang="ts">
  import type { ItemModel } from "../lib/index";
  import { dataModel } from "../store";

  function onAmountChange(item: ItemModel) {
    dataModel.update((obj) => {
      if (!obj) return obj;
      let v = obj.items.find(i => i.id == item.id);
      if (!v) return obj;
      v.total = item.price * item.amount;

      obj.totalPrice = obj.items.reduce((s, i) => s + i.total, 0);
      return obj;
    });
  } 

</script>

{#if $dataModel}
  <div class="section">
    <table>
      <thead>
        <tr>
          <th>Produkt</th>
          <th>Cena</th>
          <th>Množstvo</th>
          <th>Celkom</th>
        </tr>
      </thead>
      <tbody>
        {#each $dataModel.items as item}
          <tr>
              <td>{item.name}</td>
              <td>€{item.price.toFixed(2)}</td>
              <td>
                <input type="number" 
                  placeholder="0"
                  on:change={() => onAmountChange(item)} 
                  bind:value={item.amount} >
              </td>
              <td>€{item.total.toFixed(2)}</td>
          </tr>
        {/each}

      </tbody>
    </table>

    <div id="total">Celková suma: €<span id="totalSum">{$dataModel.totalPrice}</span></div>
  </div>
{/if}