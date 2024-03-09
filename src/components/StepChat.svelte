<script>
  import { Input, Label, Spinner } from 'flowbite-svelte';
  import { appStatusInfo, setAppStatusError } from '../store';
  const { id, url, pages } = $appStatusInfo;

  let answer = '';
  let loading = false;

  const imagesToShow = Math.min(pages, 4);
  // Mostrar imagenes del pdf subido
  const images = Array.from({ length: imagesToShow }, (_, i) => {
    const page = i + 1;
    return url
      .replace('/upload/', `/upload/w_400,h_540,c_fill,pg_${page}/`)
      .replace('.pdf', '.jpg');
  });

  const handleSubmit = async(event) => {
    event.preventDefault();
    loading = true;
    answer = '';

    const question = event.target.question.value;

    //passing id and question like searchParams
    const searchParams = new URLSearchParams();
    searchParams.append('id', id); // id get from the store (appStatusInfo)
    searchParams.append('question', question);

    // el error del catch es si hay un error en la api y el de !res.ok es si hay un error en la respuesta del fetch
    try {
      const eventSource = new EventSource(`/api/ask?${searchParams.toString()}`);

      // cada vez que al eventSource le llegue un mensaje
      eventSource.onmessage = (event) => {
        loading = false;
        const incomingData = JSON.parse(event.data);

        if (incomingData === '__END__') {
          eventSource.close();
          return;
        };

        answer += incomingData;
      };
      
    } catch (error) {
      setAppStatusError();
    } finally {
      loading = false;
    }

  }
</script>

<div class="grid grid-cols-4 gap-2">
  {#each images as image}
    <img class="rounded w-full h-auto aspect-[400/540]" src={image} alt="PDF page image"/>
  {/each}
</div>

<form class="mt-8" on:submit={handleSubmit}>
    <Label for="question" class="block mb-2">Deja aquí tu pregunta</Label>
    <Input id="question" required placeholder="¿De qué trata este documento?"></Input>
</form>

{#if loading}
  <div class="mt-10 flex justify-center items-center flex-col gap-y-2">
    <Spinner />
    <p class="opacity-75">Esperando respuesta...</p>
  </div>
{/if}

{#if answer}
  <div class="mt-8">
    <p>Respuesta:</p>
    <p>{answer}</p>
  </div>
{/if}