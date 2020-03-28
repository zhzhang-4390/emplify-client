<template>
  <div class="relative">
    <div ref="all" class="flex items-center justify-between">
      <div
        ref="left"
        class="h-16 w-16 rounded-lg opacity-0"
        style="box-shadow: 0px 0px 1rem 5px rgba(219,129,230,0.5)"
      ></div>

      <div
        ref="line"
        class="h-124 w-1 rounded-full opacity-0"
        :style="{ 'background': lineChangeColor ? 'linear-gradient(0deg, rgba(219,129,230,0.5) 0%, rgba(129,230,217,0.5) 50%, rgba(0,177,255,0.5) 100%)' : 'rgba(255, 255, 255, 0)', 'box-shadow': lineChangeColor ? 'none' : '0px 0px 1rem 5px #f7fafc' }"
      ></div>

      <div
        ref="right"
        class="h-16 w-16 rounded-lg opacity-0"
        style="box-shadow: 0px 0px 1rem 5px rgba(0,177,255,0.5)"
      ></div>
    </div>

    <div class="absolute inset-0 flex items-center justify-center">
      <div
        ref="inner"
        class="absolute h-16 w-16 rounded-lg transform scale-0"
        style="box-shadow: 0px 0px 1rem 5px rgba(219,129,230,0.5)"
      ></div>

      <div
        ref="outer"
        class="absolute h-16 w-16 rounded-lg transform scale-0"
        style="box-shadow: 0px 0px 1rem 5px rgba(0,177,255,0.5)"
      ></div>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";

export default {
  data() {
    return {
      lineChangeColor: false
    };
  },

  mounted() {
    const lineTimeline = this.lineTimeline();
    const leftTimeline = this.leftTimeline();
    const rightTimeline = this.rightTimeline();
    const allTimeline = this.allTimeline();
    const innerTimeline = this.innerTimeline();
    const outerTimeline = this.outerTimeline();

    setInterval(() => {
      lineTimeline.restart();
      leftTimeline.restart();
      rightTimeline.restart();
      allTimeline.restart();
      innerTimeline.restart();
      outerTimeline.restart();
    }, 20000);

    setTimeout(() => {
      this.lineChangeColor = true;
      setInterval(() => (this.lineChangeColor = true), 20000);
    }, 6000);

    setInterval(() => (this.lineChangeColor = false), 20000);
  },

  methods: {
    lineTimeline() {
      const lineTimeline = anime.timeline({
        targets: this.$refs.line
      });

      lineTimeline
        .add({
          opacity: 1,
          easing: "linear",
          duration: 500,
          delay: 1500
        })
        .add({
          rotate: 90,
          easing: "linear",
          duration: 1000,
          delay: 4000
        });

      return lineTimeline;
    },

    leftTimeline() {
      const leftTimeline = anime.timeline({
        targets: this.$refs.left
      });

      leftTimeline
        .add({
          opacity: 1,
          translateX: "18.75rem",
          easing: "easeInOutQuint",
          duration: 2000
        })
        .add({
          translateX: "12.5rem",
          easing: "easeOutSine",
          duration: 1000
        })
        .add({
          translateX: "6.25rem",
          delay: 3000
        });

      return leftTimeline;
    },

    rightTimeline() {
      const rightTimeline = anime.timeline({
        targets: this.$refs.right
      });

      rightTimeline
        .add({
          opacity: 1,
          translateX: "-18.75rem",
          easing: "easeInOutQuint",
          duration: 2000
        })
        .add({
          translateX: "-12.5rem",
          easing: "easeOutSine",
          duration: 1000
        })
        .add({
          translateX: "-6.25rem",
          delay: 3000
        });

      return rightTimeline;
    },

    allTimeline() {
      const allTimeline = anime.timeline({
        targets: this.$refs.all
      });

      allTimeline
        .add({
          rotate: "5turn",
          scale: 0,
          easing: "easeInQuint",
          duration: 3000,
          delay: 3000
        })
        .add({
          scale: 1,
          easing: "easeOutQuint",
          duration: 3000,
          delay: 1000
        })
        .add({
          rotate: "10turn",
          scale: 0,
          easing: "easeInQuint",
          duration: 3000
        });

      return allTimeline;
    },

    innerTimeline() {
      const innerTimeline = anime.timeline({
        targets: this.$refs.inner
      });

      innerTimeline.add({
        scale: [0, 2],
        easing: "easeOutQuint",
        duration: 3000,
        delay: 13000
      });

      return innerTimeline;
    },

    outerTimeline() {
      const outerTimeline = anime.timeline({
        targets: this.$refs.outer
      });

      outerTimeline.add({
        scale: [0, 4],
        easing: "easeOutQuint",
        duration: 3000,
        delay: 13000
      });

      return outerTimeline;
    }
  }
};
</script>
