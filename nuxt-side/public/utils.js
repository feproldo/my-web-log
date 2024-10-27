export var lockedBody = ref(false)
var isLocked = computed(() => ({
    locked: lockedBody.value,
}))

export function locker(arg) {
    lockedBody.value = arg
    useHead({
        bodyAttrs: {
            class: isLocked
        }
    })
}
const config = useRuntimeConfig()
export const server = config.app.buildId == 'dev' ? "http://192.168.31.152:3005/" : "https://blogapi.feproldo.ru/";