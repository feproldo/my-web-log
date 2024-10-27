<script setup>
    function open(url) {
        window.open(url, '_blank')
    }
</script>

<template>
    <header>
        <div class="flex">
            <div class="left">
                <div class="logo">
                    <img src="/feproldo.png" alt="" @click="$router.push('/')">
                    <h3>feproldo's web-log</h3>
                </div>
            </div>
            <div class="center" v-if="false">
                <NuxtLink to="">Главная</NuxtLink>
                <NuxtLink to="">Последнее</NuxtLink>
                <NuxtLink to="">Обо мне</NuxtLink>
            </div>  
            <!-- <div class="right">
                <button @click="open('https://discord.com/users/955851148433178674')"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" fill="#5865F2"></path></svg></button>
                <button @click="open('https://t.me/feproldo')"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" fill="#34ABDF"></path></svg></button>
                <button @click="open('https://feproldo.ru')"><svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'><g id="web_fill" fill='none'><path fill='#FFFFFF' d='M19 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 6H5v7a1 1 0 0 0 .883.993L6 18h12a1 1 0 0 0 .993-.883L19 17zM6 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2m3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2m3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2'/></g></svg></button>
            </div> -->
        </div>
    </header>
</template>

<style scoped lang="scss">
@use "~/public/scss/vars.scss";
    $height: 75px;
    header {
        position: fixed;
        width: 100vw;
        height: $height;
        top: 0;
        left: 0;
        background-color: vars.$background;
        z-index: 999;
        .flex {
            padding: 0px 32px;
            height: $height;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            position: relative;
            .left, .right, .center {
                height: $height;
            }
            .left {
                .logo {
                    height: $height;
                    
                    display: flex;
                    gap: 16px;
                    align-items: center;
                    img {
                        border-radius: 5px;
                        height: $height;
                        cursor: pointer;
                        &:active {
                            transform: scale(0.9);
                            transition: .1s;
                        }
                    }
                    
                }
            }
            .right {
                position: absolute;
                right: 32px;
                top: 0;
                gap: 16px;
                display: flex;
                align-items: center;
                button {
                    border: 0;
                    outline: 0;
                    background-color: transparent;
                    cursor: pointer;
                }
            }
            .center {
                display: flex;
                justify-content: space-between;
                align-items: center;
                a {
                    cursor: pointer;
                    position: relative;
                    user-select: none;
                    &::after {
                        content: "";
                        position: absolute;
                        bottom: 0px;
                        left: 0;
                        width: 0px;
                        height: 1.5px;
                        background-color: white;
                        transition: .25s;
                    }
                    &:hover::after {
                        width: 100%;
                        transition: .25s;
                    }
                    
                }
            }
            @media screen and (max-width: 850px) {
                .center {
                    display: none
                }
                & {
                    grid-template-columns: 1fr 1fr;
                }
            }
        }
    }
</style>