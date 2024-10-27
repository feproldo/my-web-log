<script setup>
import axios from 'axios';
import { server } from '~/public/utils';

var pass = ref();
var isLogin = ref(false);
var content = ref("")
var title = ref("")
var id = ref("")

function send() {
    axios.post(server+'login', { passwd: pass.value })
        .then(response => isLogin.value = response.data.res)
        .catch(error => console.error('Ошибка входа:', error));
}
var imgs = ref([]);
function imgsUpload(event) {
    imgs.value = event.target.files;
}
// function filesUpload(event) {
//     files.value = event.target.files;
// }
    
    // const formData = new FormData();
    //   for(var i = 0; i < imgs.value.length; i++){
    //     formData.append('imgs', imgs.value[i]);  
    //   }; 
    //   for(var i = 0; i < files.value.length; i++){
    //     formData.append('files', files.value[i]);  
    //   };   
    //   formData.append('data', JSON.stringify({
    //     author: { name: "feproldo", img: "/feproldo.png" },
    //     text: content.value,
    //     imgs: imgs,
    //     files: files,
    //     passwd: pass.value
    // }))

    function createArticle(params) {
        const formData = new FormData();
        for(var i = 0; i < imgs.value.length; i++){
            formData.append('imgs', imgs.value[i]);  
        }; 
        // console.log(imgs.value)
        formData.append('data', JSON.stringify({
            content: content.value,
            id: id.value,
            title: title.value,
            passwd: pass.value
        }))
        axios.post(server+'createArticle', formData)
        .then(response => {console.log('Пост создан:', response.data); useRouter().push("/")})
        .catch(error => console.error('Ошибка создания поста:', error));
    }
    var isHelp = ref();
    var helpClass = computed(() => {
        if(isHelp.value) return "help"
        else return "nohelp"
    })

    var deleteId = ref();
    function deletee() {
    axios.post(server+'deleteArticle', { id: deleteId.value, passwd: pass.value })
        .then(response => {
            //console.log(response.data)
        })
        .catch(error => console.error('Ошибка входа:', error));
    }
</script>

<template>
    <main>
        <div class="log__in" v-if="!isLogin">
            <input type="text" v-model="pass">
            <button @click="send">log-in</button>
        </div>
        <div class="post" v-else>
            <input type="text" placeholder="Title" v-model="title">
            <input type="text" placeholder="id" v-model="id">
            <textarea name="" id="" placeholder="Enter markdown text here" v-model="content"></textarea>
            <input type="file" multiple @change="imgsUpload">
            <button @click="createArticle">Отправить</button>
            <h5 @click="isHelp = !isHelp" style="cursor: pointer;">help</h5>
            <div :class="helpClass" class="helpDiv">
                <pre># Заголовок 1 уровня
## Заголовок 2 уровня
### Заголовок 3 уровня
#### Заголовок 4 уровня
##### Заголовок 5 уровня
###### Заголовок 6 уровня
+ ненумерованный список
- ненумерованный список
* ненумерованный список
1. нумерованный
> Цитата
> продолжение
*italic*
`однострочный код`
```несколько строчный код```

![картинка](imgIndex.feproldo)
[ссылка](https://example.com/)</pre>
            </div>
            <input type="text" v-model="deleteId" placeholder="id to delete">
            <button @click="deletee">delete</button>
        </div>
    </main>
</template>

<style scoped lang="scss">
@use "~/public/scss/vars.scss";
    main {
        min-height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        .log__in {
            display: flex;
            gap: 8px;
            input,
            button {
                border: 2px solid vars.$border;
                outline: 0;
                background-color: vars.$tip;
                padding: 8px 16px;
                font-size: 16px;
                border-radius: 5px;
            }
            input {
                cursor: text;
            }
            button {
                cursor: pointer;
                border-radius: 5px;
            }
        }
        .post {
            padding: 16px;
            gap: 8px;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            border: 2px solid vars.$border;
            max-width: 100vw;
            input,textarea,
            button {
                border: 2px solid vars.$border;
                outline: 0;
                background-color: vars.$tip;
                padding: 8px 16px;
                font-size: 16px;
                border-radius: 5px;
                max-width: 100%;
            }
            button {cursor: pointer;}
            .help {
                transition: .5s;
                height: 500px;
                padding: 8px;
            }
            .nohelp {
                transition: .5s;
                padding: 0;
                border: 0;
                height: 0;
            }
            .helpDiv {
                transition: .5s;
                width: 100%;
                overflow:hidden;
            }
        }
    }
</style>