<svelte:head>
  <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/datejs/1.0/date.min.js" integrity="sha512-/n/dTQBO8lHzqqgAQvy0ukBQ0qLmGzxKhn8xKrz4cn7XJkZzy+fAtzjnOQd5w55h4k1kUC+8oIe6WmrGUYwODA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->
</svelte:head>

<script lang="ts">
  import type jsPDFInvoiceTemplate from "jspdf-invoice-template";
  import { onMount } from "svelte";
  import { dataModel } from "../store";
  

  let jsPdf: typeof jsPDFInvoiceTemplate;
  const now = new Date();
  let today = `${now.getDate()}.${now.getMonth() + 1}. ${now.getFullYear()}`;
  let invoiceTitle = `Faktúra ${today}`;

  onMount(async () => {
    jsPdf = (await import("jspdf-invoice-template")).default
  });


  function onCreate() {
    let items = $dataModel?.items.filter(i => i.total > 0);
    if (!items || !items.length ) return;
    let withoutVAT = $dataModel!.totalPrice * 0.8;

    jsPdf({
          outputType: "save",
          returnJsPDFDocObject: true,
          fileName: invoiceTitle + '.pdf',
          orientationLandscape: false,
          compress: true,
          logo: {
              src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
              width: 53.33, //aspect ratio = width/height
              height: 26.66,
              margin: {
                  top: 0, //negative or positive num, from the current position
                  left: 0 //negative or positive num, from the current position
              }
          },
          stamp: {
              inAllPages: true,
              src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
              width: 20, //aspect ratio = width/height
              height: 20,
              margin: {
                  top: 0, //negative or positive num, from the current position
                  left: 0 //negative or positive num, from the current position
              }
          },
          business: {
              name: "Business Name",
              address: "Albania, Tirane ish-Dogana, Durres 2001",
              phone: "(+355) 069 11 11 111",
              email: "email@example.com",
              email_1: "info@example.al",
              website: "www.example.al",
          },
          contact: {
              label: "Invoice issued for:",
              name: "Client Name",
              address: "Albania, Tirane, Astir",
              phone: "(+355) 069 22 22 222",
              email: "client@website.al",
              otherInfo: "www.website.al",
          },
          invoice: {
              label: "Invoice #: ",
              num: 19,
              invDate: `Dátum vystavenia: ${today}. `,
              invGenDate: "Dátum splatnosti: ${}",
              headerBorder: false,
              tableBodyBorder: false,
              header: [
              {
                  title: "#", 
                  style: { 
                    width: 10 
                  } 
              }, 
              { 
                  title: "Názov",
                  style: {
                    width: 110
                  } 
              }, 
              { title: "Cena"},
              { title: "Množstvo"},
              { title: "Celkom"}
              ],
              table: items.map((v, i) => [
                i + 1, 
                v.name, 
                v.price + ' €',
                v.amount, 
                v.total + ' €'
              ]),
          additionalRows: [{
                  col1: 'Suma bez DPH:',
                  col2: `${withoutVAT.toFixed(2)}`,
                  col3: '€',
                  style: {
                      fontSize: 10 //optional, default 12
                  }
              },
              {
                  col1: 'DPH celkom:',
                  col2: `${($dataModel!.totalPrice - withoutVAT).toFixed(2)}`,
                  col3: '€',
                  style: {
                      fontSize: 10 //optional, default 12
                  }
              },
              {
                  col1: 'Suma na úhradu:',
                  col2:  `${$dataModel!.totalPrice.toFixed(2)}`,
                  col3: '€',
                  style: {
                      fontSize: 12 //optional, default 12
                  }
              }] as any,
              
              invDescLabel: "Invoice Note",
              invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
          },
          footer: {
              text: "The invoice is created on a computer and is valid without the signature and stamp.",
          },
          pageEnable: true,
          pageLabel: "Strana ",
      });
  }

</script>

<div class="section">
  <div class="attributes">
    <div class="row">
      <label for="title" class="w-100">Názov faktury </label>
      <input type="string" class="w-400" id="title" required autocomplete="off" bind:value={invoiceTitle}>
    </div>
  </div>
  <button on:click={onCreate}>Vytvoriť faktúru</button>
</div>

<style>
.attributes {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;;
}

.row {
  display: flex;
  gap: 10px;
}

.w-100 {
  width: 100px;
}

.w-200 {
  width: 200px;
}

.w-400 {
  width: 400px;
}
</style>