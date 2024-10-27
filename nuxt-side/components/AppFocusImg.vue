<script setup>
import { toggleModal } from '~/public/toogleModal';
import { locker } from '~/public/utils';


const props = defineProps(['src'])
var src = ref(props.src)
locker(true)
const modal = new toggleModal(500, "open", "close")
modal.turn(true)

const emit = defineEmits(['update:modelValue'])
watch(modal.isActive, (newValue, oldValue) => {
    emit('update:modelValue', newValue)
});

function close() {
    locker(false);
    modal.turn(false);
    
}

// onMounted(() => {
//     const imageElement = document.querySelector('.zoomable-image');
//     wheelzoom(imageElement);
// });


</script>

<template>
    <div class="overlay" :class="modal.classCurrent.value" @click="close">
        <div class="crosshair" @click="close">
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'><title>close_fill</title><g id="close_fill" fill='none' fill-rule='evenodd'><path fill='#FF6252' d='m12 14.122 5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879 6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z'/></g></svg>
        </div>
        <main>
            <img :src="src" class="zoomable-image">
        </main>
    </div>
</template>

<style lang="scss" scoped>
    .overlay {
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        backdrop-filter: blur(0px);
        .crosshair {
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
        }
        main {
            img {
                max-height: 50vh;
                max-width: 50vw;
            }
            @media (max-width: 1000px) {
                img {
                    max-width: 75vw;
                    max-height: 75vh;
                }
            }
            @media (max-width: 750px) {
                img {
                    max-width: 85vw;
                    max-height: 85vh;
                }
            }
            @media (max-width: 625px) {
                img {
                    max-width: 100vw;
                    max-height: 100vh;
                }
            }
        }
    }
    .open {
        animation: open .5s forwards linear;
    }
    .close {
        animation: closea .5s forwards linear;
    }
    @keyframes open {
        from {
            backdrop-filter: blur(0px);
            opacity: 0;
        }
        to {
            backdrop-filter: blur(5px);
            opacity: 1;
        }
    }
    @keyframes closea {
        from {
            backdrop-filter: blur(5px);
            opacity: 1;
        }
        to {
            backdrop-filter: blur(0px);
            opacity: 0;
        }
    }
    
</style>