import router from "@/router/index.js";


export default {
    data() {
        return {
            SYSTEM_NAME: 'Digital Clubs'
        }
    },
    methods: {
        goTo(link) {
            router.push(link)
        },
        goBack() {
            router.go(-1)
        }
    }
}
