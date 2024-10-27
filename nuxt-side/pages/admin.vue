<script setup>
import axios from 'axios';
import { server } from '~/public/utils';
var pass = ref();
var isLogin = ref(false);
var content = ref();
// var selectedFiles = ref([]);
var imgs = ref("");

var files = ref([])

var idd = ref()
function send() {
    axios.post(server+'login', { passwd: pass.value })
        .then(response => isLogin.value = response.data.res)
        .catch(error => console.error('Ошибка входа:', error));
}

// function handleFileChange(e) {
//     selectedFiles.value = e.target.files;
// }

// function uploadFiles() {
//     const formData = new FormData();
//     for (let i = 0; i < selectedFiles.value.length; i++) {
//         formData.append('files', selectedFiles.value[i]);
//     }

//     axios.post('http://localhost:3005/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//     })
//     .then(response => {
//         console.log('Файлы загружены:', response.data.files);
//         // Теперь можешь использовать URL файлов для создания поста
//     })
//     .catch(error => console.error('Ошибка загрузки файлов:', error));
// }

function deletee() {
    axios.post(server+'deletePost', { id: idd.value, passwd: pass.value })
        .then(response => {
            //console.log(response.data)
        })
        .catch(error => console.error('Ошибка входа:', error));
}
function imgsUpload(event) {
    imgs.value = event.target.files;
    //console.log("yes ", event.target.files)
}
function filesUpload(event) {
    files.value = event.target.files;
    //console.log("yes ", event.target.files)
}
var article = ref(null)
function createPost() {
    // var imgss = imgs.value.split("&&")
    // if(imgs.value !== "") {
    //     imgss.forEach(el => {
    //         imgreq.push({
    //             name: "picture",
    //             url: el
    //         })
    //     });
    //     // imgreq = []
    // }
    // else imgreq = []
    
    const formData = new FormData();
      for(var i = 0; i < imgs.value.length; i++){
        formData.append('imgs', imgs.value[i]);  
      }; 
      for(var i = 0; i < files.value.length; i++){
        formData.append('files', files.value[i]);  
      };   
      formData.append('data', JSON.stringify({
        author: { name: "feproldo", img: "/feproldo.png" },
        text: content.value,
        imgs: imgs,
        files: files,
        article: article.value,
        passwd: pass.value
    }))

    // var filereq = [];
    // var filee = filesUrl.value.split("&&")
    // var filenn = filesName.value.split("&&")
    // console.log(filesUrl.value)
    // console.log(filesName.value)
    // if(filesUrl.value !== "" && filesName.value !== "") {
    //     console.log(filenn.length != filee.length)
    //     console.log(filesUrl.value.length)
    //     console.log(filesName.value.length)
    //     if(filee.length != filenn.length) return;
    //     for(var i = 0; i < filee.length; i++) {
    //         filereq.push({
    //             name: filenn[i],
    //             url: filee[i]
    //         })
    //     }
    //     // imgreq = []
    // }
    // else filereq = []

    axios.post(server+'createPost', formData)
    .then(response => {console.log('Пост создан:', response.data); useRouter().push("/")})
    .catch(error => console.error('Ошибка создания поста:', error));
}
</script>

<template>
    <main>
        <div class="log__in" v-if="!isLogin">
            <input type="text" v-model="pass">
            <button @click="send">log-in</button>
        </div>
        <div class="post" v-else>
            <textarea placeholder="content" v-model="content" autocorrect="off" autocapitalize="off" spellcheck="false"/>
            <!-- <input type="text" placeholder="linkImg&&linkImg" v-model="imgs"> -->
            <!-- <input type="text" placeholder="linkFile&&linkFile" v-model="filesUrl">
            <input type="text" placeholder="linkName&&linkName" v-model="filesName"> -->
            <input type="text" placeholder="article" v-model="article">
            <div class="flex">
                <input type="file" id="files" name="files" @change="imgsUpload" multiple> <h5>imgs</h5>
            </div>
            <div class="flex">
                <input type="file" id="files" name="files" @change="filesUpload" multiple>
                <h5>Files</h5>
            </div>
            <button @click="createPost">Создать</button>
            <br><br>
            <input type="text" placeholder="id delete" v-model="idd">
            <button @click="deletee()">Удалить</button>
            
            <!-- <input type="file" id="files" name="files" multiple @change="e => handleFileChange(e)">
            <button @click="uploadFiles">Загрузить файлы на сервер</button> -->
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
            input,textarea {
                cursor: text;
            }
            button {
                cursor: pointer;
                border-radius: 5px;
            }
            .flex {
                display: flex;
                gap: 8px;
                align-items: center;
                h5 {
                    color: vars.$gray
                }
            }
        }
    }
</style>