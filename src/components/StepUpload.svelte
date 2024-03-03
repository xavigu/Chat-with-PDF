<script>
  import Dropzone from "svelte-file-dropzone";
  import { setAppStatusChatMode, setAppStatusError, setAppStatusLoading } from "../store";

  let files = {
    accepted: [],
    rejected: []
  };

  async function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];

    if (acceptedFiles.length > 0) {
      setAppStatusLoading();

      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('res', res)


      if(!res.ok) {
        setAppStatusError();
        return;
      };

      const {id, url, pages} = await res.json();
      console.log(id, url, pages);
      setAppStatusChatMode({id, url, pages});


    }
  }
</script>

{#if files.accepted.length === 0}
  <Dropzone 
    on:drop={handleFilesSelect}
    multiple = {false}
    accept = {'application/pdf'}
  > 
    Arrastra y suelta aqui tu PDF
  </Dropzone>
{/if}

<ol>
  {#each files.accepted as item}
    <li>{item.name}</li>
  {/each}
</ol>