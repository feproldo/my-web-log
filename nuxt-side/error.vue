<script setup>
    const error = useError();
</script>

<template>
    <main>
        <h1>{{ error.statusCode}}</h1>
        <button @click="$router.push('/')" v-if="error.statusCode == '404'">На главную</button>
    </main>
</template>

<style scoped lang="scss">
@use "~/public/scss/vars.scss";
    main {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        h1 {
            font-size: 128px;
        }
        button {
            border: 2px solid vars.$border;
            outline: 0;
            background-color: vars.$tip;
            padding: 8px 16px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            transition: .1s;
            &:active {
                transform: scale(0.95);
                transition: .1s;
            }
        }
    }
</style>