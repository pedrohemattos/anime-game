<script setup>
  import axios from 'axios';
  import { reactive, ref } from 'vue';
  
  let animeTitlesAndImages = reactive([]);
  let firstRandomAnime = ref({});
  let secondRandomAnime = ref({});

  let spinActive = ref(false);

  async function getTopAnime() {
    try {
      const req = await axios.get('https://api.jikan.moe/v4/top/anime', { params: { type: 'tv', page: 1 } });
      let animes = req.data.data;
      console.log(animes)

      animeTitlesAndImages = animes.map(anime => {
        return {
          title: anime.title,
          image: anime.images.webp.large_image_url,
          score: anime.score,
          scoredBy: anime.scored_by,
          popularity: anime.popularity
        }
      });

      firstRandomAnime.value = await selectRandomAnime();
      secondRandomAnime.value = await selectRandomAnime();


    } catch (error) {
      console.log(error)
    }
  }

  getTopAnime()

  function selectRandomAnime() {
    const randomIndex = Math.floor(Math.random() * animeTitlesAndImages.length);
    const randomAnime = animeTitlesAndImages[randomIndex];
    return randomAnime;
  }

  function verifyChoice(selectedAnime, otherAnime) {
    spinActive.value = true;
    setTimeout(() => {
      if(selectedAnime.score >= otherAnime.score) {
        console.log('ganhou')
        spinActive.value = false;
      }else {
        console.log('perdeu')
        spinActive.value = false;
      }
    }, 801);
  }

</script>

<template>
  <main class="h-screen bg-slate-900">

    <div class="text-center pt-10 mb-8">
      <h1 class="font-kaushan text-4xl text-white mb-4">Which Anime is Higher Ranked?</h1>
      <span class="font-indie text-2xl text-white">Double click on the chosen one!</span>
    </div>

    <div class="flex w-2/5 mx-auto pa-4 relative">
      <div class="w-1/2">
        <img 
          :src="firstRandomAnime.image" 
          class="w-96 h-400 cursor-pointer"
          @click="teste"
          @dblclick="verifyChoice(firstRandomAnime, secondRandomAnime)"
        />
        <h1 class="font-poppins text-center text-2xl text-white">
          {{ firstRandomAnime.title }}
        </h1>
      </div>

      <div class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <img 
          src="./assets/versus.png" 
          class="w-24"
          :class="{'animate-spinVersus': spinActive}"
        />
      </div>

      <div class="w-1/2">
        <img 
          :src="secondRandomAnime.image" 
          class="w-96 h-400 cursor-pointer "
          @dblclick="verifyChoice(secondRandomAnime, firstRandomAnime)"
        />
        <h1 class="font-poppins text-center text-2xl text-white">
          {{ secondRandomAnime.title }}
        </h1>
      </div>

    </div>


  </main>
</template>
