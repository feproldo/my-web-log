<script setup>
import axios from 'axios';
import { server } from '~/public/utils';
    var blogs = ref([
        // {
        //     author: {
        //         name: "feproldo",
        //         img: "/feproldo.png"
        //     },
        //     text: "Всем здоровья! Меня зовут Иван, на данный момент я обучаюсь в 9 классе и самостоятельно изучаю сферу IT. Знаю несколько языков программирования, а именно: javascript (typescript), c#, c++. Создание сайтов - это мое хобби. Сайты я создаю на фреймворке nuxt, который обожаю всем сердцем и считаю его лучшим фреймворком, который позволяет на полную совмещать javascript с html и css. Создаю сайты на заказ - пиши t.me/feproldo",
        //     files: [
        //         {
        //             name: "Русское_поле_экспериментов.docx",
        //             url: "/therms.docx",
        //             weight: "0.5 mb"
        //         },
        //         {
        //             name: "Он_увидел_солнце.mp3",
        //             url: "",
        //             weight: "1 tb"
        //         }
        //     ],
        //     imgs: [{
        //         name: "tanki-kal",
        //         url: "/Screenshot_10.png"
        //     }],
        //     rating: 0
        // }
    ])

    

    axios.get(server+"posts")
    .then(response => {
        console.log(response.data);
        blogs.value = response.data;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    import { ref, computed } from 'vue';
    // const searchQuery = ref('');

    const filteredPosts = computed(() => {
        if(activeTags.value.length == 0) return blogs.value;
        return blogs.value.filter(post => 
            post.tags.some(tag => activeTags.value.includes(tag)) // Проверяем пересечение тегов
        );
        // if (searchQuery.value === '') {
        //     return blogs.value;
        // }
        // return blogs.value.filter(post => {
        //     return post.title.includes(searchQuery.value) ||
        //         post.article.includes(searchQuery.value) ||
        //         post.titleArticle.includes(searchQuery.value);
        // });
    });


    function downloadFile(url, name) {
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function copyId(index) {
        prompt('_id', blogs.value[index]._id);
    }

    function slashNToBr(txt) {
        if(!txt) return
        return txt.replace(/\n/g, '<br>');
    }

// function getLocalStorage(key) {
//     const data = localStorage.getItem(key);
//     return data ? JSON.parse(data) : [];
// }

// function setLocalStorage(key, data) {
//     localStorage.setItem(key, JSON.stringify(data));
// }

// async function likePost(index) {
//     const act = 1;
//     const postId = blogs.value[index]._id;
//     let lidi = getLocalStorage('lidi--987iruiod@kfldp)-9kfkij');
//     if(lidi.includes(postId)) return
//     await lidi.push(postId);
//     await setLocalStorage('lidi--987iruiod@kfldp)-9kfkij', lidi)
//     buttonsDis.value = getLocalStorage('lidi--987iruiod@kfldp)-9kfkij')
//     updateLikesDislikes(postId, act);
//     blogs.value[index].rating++;
// }

// async function dislikePost(index) {
//     const act = -1;
//     const postId = blogs.value[index]._id;
//     let lidi = getLocalStorage('lidi--987iruiod@kfldp)-9kfkij');
//     ////console.log("before: "+lidi)
//     if(lidi.includes(postId)) return
//     await lidi.push(postId);
//     ////console.log("author: "+lidi)
//     await setLocalStorage('lidi--987iruiod@kfldp)-9kfkij', lidi);
//     buttonsDis.value = getLocalStorage('lidi--987iruiod@kfldp)-9kfkij')
//     updateLikesDislikes(postId, act);
//     blogs.value[index].rating--;
// }

// var buttonsDis = ref(getLocalStorage('lidi--987iruiod@kfldp)-9kfkij'))


// function likePost(index) {
//     const throttledUpdateLikesDislikes = debounce(updateLikesDislikes, 300);
//     var act = 0;
//     const postId = blogs.value[index]._id;

//     let likes = getLocalStorage('likes');
//     let dislikes = getLocalStorage('dislikes');

//     if (likes.includes(postId)) {
//         act--;
//         blogs.value[index].rating--;
//         likes = likes.filter(id => id !== postId);
//     } else {
//         likes.push(postId);
//         act++;
//         blogs.value[index].rating++;
//         if (dislikes.includes(postId)) {
//             act++;
//             blogs.value[index].rating++;
//             dislikes = dislikes.filter(id => id !== postId);
//         }
//     }

//     setLocalStorage('likes', likes);
//     setLocalStorage('dislikes', dislikes);
//     throttledUpdateLikesDislikes(postId, act);
// }

// function dislikePost(index) {
//     const throttledUpdateLikesDislikes = debounce(updateLikesDislikes, 300);
//     var act = 0;
//     const postId = blogs.value[index]._id;

//     let likes = getLocalStorage('likes');
//     let dislikes = getLocalStorage('dislikes');

//     if (dislikes.includes(postId)) {
//         act++;
//         blogs.value[index].rating++;
//         dislikes = dislikes.filter(id => id !== postId);
//     } else {
//         dislikes.push(postId);
//         act--;
//         blogs.value[index].rating--;
//         if (likes.includes(postId)) {
//             act--;
//             blogs.value[index].rating--;
//             likes = likes.filter(id => id !== postId);
//         }
//     }
//     setLocalStorage('likes', likes);
//     setLocalStorage('dislikes', dislikes);
//     throttledUpdateLikesDislikes(postId, act);
// }

// function updateLikesDislikes(postId, action) {
//     axios.post(server+'like', { 
//         postId: postId,
//         action: action 
//     })
//         .then(response => {})
//         .catch(error => //console.error('Ошибка входа:', error));
// }


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

var tagsRef = ref(null)
var tags = ref([
    {
        name: "Веб девлог",
        tag: 'weblog'
    },
    {
        name: 'Голосовое',
        tag: 'voice'
    },
    {
        name: "Game-devlog",
        tag: 'gamelog'
    },
    {
        name: 'nuxt / vue',
        tag: 'nuxt'
    },
    {
        name: 'node.js',
        tag: 'node'
    },
    {
        name: 'Monicord',
        tag: 'monicord'
    },
    {
        name: 'Другое',
        tag: 'other'
    }
])
var activeTags = ref(
    [
        
    ]
)
function chooseTag(tag) {
    if(activeTags.value.includes(tag)) {
        activeTags.value = activeTags.value.filter(el => el !== tag)
    }
    else {
        activeTags.value.push(tag);
    }
}
// var focusImg = ref({
//     isFocused: false,
//     src: ""
// })

// function focus(src) {
//     focusImg.value = {
//         isFocused: true,
//         src: src
//     }
// }
onMounted(() => {
    const blocks = document.querySelectorAll('.tags'); 
    blocks.forEach(block => {
        block.addEventListener('wheel', (event) => { 
            if (event.deltaY !== 0) { 
                event.preventDefault(); 
                // block.scrollBy({ left: event.deltaY > 0 ? block.offsetWidth : -block.offsetWidth, behavior: 'smooth' });
                block.scrollLeft += event.deltaY;
            } 
        });
    });
})
</script>

<template>
    <main>
        <!-- <AppFocusImg :src="focusImg.src" v-if="focusImg.isFocused" v-model="focusImg.isFocused"/> -->
        
        <div class="container">
            <div class="border" v-if="false"><h1>feproldo's web-log</h1></div>
            <div class="header">
                <!-- <div class="input">
                    <input type="text" placeholder="Поиск..." v-model="searchQuery">
                    <div class="icon">
                        <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'><g id="search_line" fill='none' fill-rule='evenodd'><path fill='#09244BFF' d='M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0'/></g></svg>
                    </div>
                </div> -->
                <div class="tags_container">
                    <div class="icon_left" @click="scrollLeft">
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><g id="left_fill" fill='none' fill-rule='evenodd'><path fill='#09244BFF' d='M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.122 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122L7.938 13.06Z'/></g></svg>
                    </div>
                    <div class="tags" :ref="tagsRef">
                        <div class="tag" v-for="(el, index) in tags" :key="index" :class="{active_tag: activeTags.includes(el.tag)}" @click="chooseTag(el.tag)">
                            {{ el.name }}
                        </div>
                    </div>
                    <div class="icon_right" @click="scrollRight">
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><g id="right_fill" fill='none' fill-rule='evenodd'><path fill='#09244BFF' d='M16.06 10.94a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 1 1-2.121-2.122L12.879 12 8.283 7.404a1.5 1.5 0 0 1 2.12-2.122l5.658 5.657Z'/></g></svg>
                    </div>
                </div>
                <div class="tip">
                    <p>
                        Листайте, наведясь на тэги
                    </p>
                </div>
            </div>
            <div class="blogs">
                <div class="blog" v-if="blogs.length == 0">
                    <div class="author">
                        <div class="icon">
                            <img src="/system.ico" alt="">
                        </div>
                        <h2>Система</h2>
                    </div>
                    <p>Постов пока-что нет.</p>
                </div>

                <div class="blog" :id="el._id" v-for="(el, index) in filteredPosts" :key="index">
                    <div class="author">
                        <div class="icon">
                            <img :src="el.author.img" alt="">
                        </div>
                        <h2>{{ el.author.name }}</h2>
                    </div>
                    <p v-html="slashNToBr(el.text)"></p>

                    <div class="imgs" v-if="el.imgs.length !== 0">
                        <div class="img" v-for="(img, index) in el.imgs" :key="index">
                            <img :src="server+img.url.substring(1)" alt="тут должна быть картинка, но её нет" @click="focus(img.url)">
                        </div>
                    </div>

                    <div class="files" v-if="el.files.length !== 0">
                        <div class="file" v-for="(file, index) in el.files" :key="index" @click="downloadFile(server+file.url.substring(1), file.name)">
                            <div class="icon">
                                <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'><g id="file_download_fill" fill='none' fill-rule='evenodd'><path fill='#FFFFFFFF' d='M12 2v6.5a1.5 1.5 0 0 0 1.5 1.5H20v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 9a1 1 0 0 0-1 1v2.708l-.414-.414a1 1 0 0 0-1.414 1.414l2.12 2.122a1 1 0 0 0 1.415 0l2.121-2.122a1 1 0 1 0-1.414-1.414l-.414.414V12a1 1 0 0 0-1-1m2-8.957a2 2 0 0 1 1 .543L19.414 7a2 2 0 0 1 .543 1H14Z'/></g></svg>
                            </div>
                            <div class="text">
                                <h2>{{ file.name }}</h2>
                                <h5>{{ file.weight }}</h5>
                            </div>
                        </div>
                    </div>

                    <div class="rate">
                        <!-- <button @click="likePost(index)" v-if="!buttonsDis.includes(blogs[index]._id)"><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><g id="thumb_up_2_fill" fill='none'><path fill='#FFFFFFFF' d='M15 8h2.405a4 4 0 0 1 3.936 4.716l-.91 5A4 4 0 0 1 16.497 21H8V9l1.821-5.788c.296-.69 1.06-1.316 2.024-1.13C13.374 2.375 15 3.566 15 5.5zM6 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3z'/></g></svg></button>
                        <span>{{ el.rating }}</span>
                        <button @click="dislikePost(index)" v-if="!buttonsDis.includes(blogs[index]._id)"><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><g id="thumb_down_2_fill" fill='none'><path fill='#FFFFFFFF' d='M15 16h2.405a4 4 0 0 0 3.936-4.716l-.91-5A4 4 0 0 0 16.497 3H8v12l1.821 5.788c.296.69 1.06 1.316 2.024 1.131C13.374 21.625 15 20.433 15 18.5zm-9-1a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z'/></g></svg></button> -->
                        <h4 v-if="el.article != null" @click="$router.push('article/'+el.article)">Открыть статью</h4>
                        <h5>{{ formatDate(el.date || new Date()) }}</h5>
                    </div>
                    <div class="copyId">
                        <button @click="copyId(index)"><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'><g id="copy_2_fill" fill='none' fill-rule='evenodd'><path fill='#151525' d='M9 2a2 2 0 0 0-2 2v2h2V4h11v11h-2v2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM4 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z'/></g></svg></button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
@use "~/public/scss/vars.scss";
    main {
        --width: 550px;
        padding: 100px 32px 32px 32px;
        width: 100vw;
        min-height: 100vh;
        z-index: 250;
        .container {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 16px;
            z-index: 2;
            .header {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                .input {
                    display: flex;
                    border: 2px solid vars.$border;
                    height: 50px;
                    align-items: center;
                    width: var(--width);
                    border-radius: 8px;
                    .icon {
                        width: 50px;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        svg {
                            path {
                                fill: vars.$down
                            }
                        }
                    }
                    input {
                        height: 100%;
                        padding-left: 16px;
                        flex: 1;
                        border: 0;
                        background-color: transparent;
                        outline: 0;
                        font-size: 24px;
                        &::placeholder {
                            color: vars.$down
                        }
                    }
                }
                .tags_container {
                    width: var(--width);
                    display: flex;
                    position: relative;
                    align-items: center;
                    .icon_left {
                        position: absolute;
                        left: -32px;
                        cursor: pointer;
                        svg {
                            path {
                                fill: vars.$down;
                            }
                        }
                    }
                    .icon_right {
                        position: absolute;
                        right: -32px;
                        cursor: pointer;
                        svg {
                            path {
                                fill: vars.$down;
                            }
                        }
                    }
                    .tags {
                        white-space: nowrap;
                        height: fit-content;
                        width: 100%;
                        margin-top: 8px;
                        overflow-x: scroll;
                        scroll-behavior: none;
                        .tag {
                            display: inline-block;
                            background-color: vars.$background;
                            padding: 8px;
                            border: 2px solid vars.$border;
                            border-radius: 16px;
                            cursor: pointer;
                            margin-right: 8px;
                            transition: .2s;
                            &:hover {
                                background-color: vars.$code;
                                transition: .2s;
                            }
                        }
                        .active_tag {
                            background-color: vars.$border;
                            transition: .2s;
                        }
                    }
                    
                }
                .tip {
                    width: var(--width);
                    margin-top: 4px;
                    p {
                        font-size: 12px;
                        text-align: center;
                        color: vars.$down-hover;
                    }
                }
            }
            .border {
                width: var(--width);
                text-align: center;
                border: 2px solid vars.$border;
                padding: 16px;
                border-radius: 10px;
            }
            .blogs {
                width: var(--width);
                display: flex;
                flex-direction: column-reverse;
                gap: 32px;
                position: relative;
                .blog {
                    padding: 16px 16px 16px 16px;
                    width: 100%;
                    border: 2px solid vars.$border;
                    border-radius: 10px;
                    position: relative;
                    background-color: vars.$background;
                    .author {
                        display: flex;
                        width: 100%;
                        height: 40px;
                        align-items: center;
                        margin-bottom: 16px;
                        .icon {
                            height: 100%;
                            img {
                                border-radius: 50%;
                                height: 100%;
                                aspect-ratio: 1 / 1;
                            }
                        }
                        h2 {
                            font-size: 16px;
                            font-weight: 500;
                            margin-left: 8px;
                        }
                    }
                    p {
                        line-height: 20px;
                        word-spacing: 3px;
                        
                    }
                    .imgs {
                        margin-top: 16px;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        width: 100%;
                        .img {
                            cursor: pointer;
                            // border: 2px solid vars.$border;
                            border-radius: 10px;
                            display: flex;
                            img {
                                max-height: 350px;
                                max-width: 100%;
                            }
                        }
                    }
                    .files {
                        margin-top: 16px;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        width: 100%;
                        .file {
                            cursor: pointer;
                            border: 2px solid vars.$border;
                            border-radius: 10px;
                            height: 64px;
                            display: flex;
                            align-items: center;
                            padding-left: 16px;
                            .text {
                                margin-left: 8px;
                                h2 {
                                    font-size: 16px;
                                    color: vars.$gray;
                                    transition: .25s;
                                }
                                h5 {
                                    font-size: 12px;
                                    color: vars.$dark-gray;
                                    transition: .25s;
                                }
                            }
                            .icon {
                                svg {
                                    path {
                                        fill: vars.$gray;
                                        transition: .25s;
                                    }
                                }
                            }
                            &:hover {
                                .icon {
                                    svg {
                                        path {
                                            fill: vars.$color;
                                            transition: .25s;
                                        }
                                    }
                                }
                                h2 {
                                    color: vars.$color;
                                    transition: .25s;
                                }
                                h5 {
                                    color: vars.$gray;
                                    transition: .25s;
                                }
                                
                            }
                        }
                    }
                    .rate {
                        margin-top: 16px;
                        padding-top: 16px;
                        border-top: 2px solid vars.$border;
                        display: flex;
                        gap: 8px;
                        align-items: center;
                        button {
                            cursor: pointer;
                            background-color: transparent;
                            border: 0;
                            svg {
                                path {
                                    fill: vars.$gray; transition: .25s;
                                }
                            }
                            &:hover {
                                svg {path {fill: vars.$color; transition: .25s;}}
                            }
                            
                        }
                        .blue {
                            svg {
                                path {
                                    fill: vars.$link;
                                }
                            }
                        }
                        span {
                            color: vars.$gray;
                        }
                        h5 {
                            position: absolute;
                            right: 16px;
                            color: vars.$gray;
                        }
                        h4 {
                            cursor: pointer;
                            color: vars.$gray;
                            font-size: 12px;
                        }
                    }
                }
                .copyId {
                    position: absolute;
                    right: 16px;
                    top: 16px;
                    button {
                        border: 0;
                        background-color: transparent;
                        cursor: pointer;
                    }
                }
            }
            
        }
        @media screen and (max-width: 625px) {
            --width: 100%;
            & {
                padding: 100px 6px 6px 6px;
            }
        }
        @media screen and (max-width: 420px) {
            .title {
                .border {
                    h1 {
                        font-size: 16px
                    }
                }
            }
        }
    }
</style>