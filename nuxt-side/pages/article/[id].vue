<script setup>
import axios from 'axios';
import { server } from '~/public/utils';
import {marked} from 'marked';
var content = ref("")
var title = ref("")
var date = ref("")
axios.post(server+'article', { id: useRoute().params.id })
    .then(response => {
        content.value = marked(response.data.content);
        title.value = response.data.title;
        date = response.data.date;
    })
    .catch(error => {console.error('Ошибка входа:', error); useRouter().push("/")});
    function formatDate(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = String(date.getFullYear()).slice(-2);
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} - ${hours}:${minutes}`;
    }

    // particlesJS.load('particles-js', '/particles/particles.json', function() {

    // });
</script>

<template>
    <!-- <div id="particles-js"></div> -->
    <main>
        <h1>{{ title }}</h1>
        <div class="info">
            <h6>
                {{ formatDate(date || new Date()) }}
            </h6>
        </div>
        <div class="FFFcontentFFF" v-html="content"></div>
    </main>
</template>

<style scoped lang="scss">
@use "~/public/scss/vars.scss";
    main {
        
        width: 100vw;
        min-height: 100vh;
        padding: 32%;
        padding-top: 75px !important;
        padding-bottom: 0 !important;
        
        h1 {
            font-size: 48px;
        }
        .info {
            // padding-top: 8px;
            padding-bottom: 8px;
            border-bottom: 2px solid vars.$border;
            margin-bottom: 16px;
            text-align: end;
            background-color: vars.$background;
            z-index: 250;
            h6 {
                color: vars.$gray;
            }
        }
        .FFFcontentFFF {
            background-color: vars.$background;
            z-index: 5;
        }
    }
    @media screen and (max-width: 1000px) {
        main {
            padding: 16%;
        }
    }
    @media screen and (max-width: 500px) {
        main {
            padding: 8%;
        }
    }
</style>