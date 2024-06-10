<template>
<div ref="lottieContainer"></div>
</template>
    
<script>
import lottie from 'lottie-web';
import animationData from '../lottie/lottie3.json'

export default {
mounted() {
    this.initLottie();
},
methods: {
    initLottie() {
    lottie.loadAnimation({
        container: this.$refs.lottieContainer,
        renderer: 'svg', // Choose the renderer: svg, canvas, html
        loop: true, // Set loop true/false
        autoplay: true, // Set autoplay true/false
        animationData: animationData // Pass your animation data
    });
    }
}
}
</script>
    
<style scoped>
/* Add any necessary styling here */
</style>
      