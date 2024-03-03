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

    const question = event.target.question.value;

    // el error del catch es si hay un error en la api y el de !res.ok es si hay un error en la respuesta del fetch
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          question,
        })
      });
  
      if (!res.ok) {
        console.error('Error asking the question');
        return;
      };
  
      const { answer: apiAnswer } = await res.json();
      answer = apiAnswer;
      
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
  <Spinner />
{/if}

{#if answer}
  <div class="mt-8">
    <p>Respuesta:</p>
    <p>{answer}</p>
  </div>
{/if}