<template>
  <div class="relative">
    <div ref="all" class="flex items-center justify-between">
      <div
        ref="left"
        class="h-16 w-16 rounded-lg opacity-0"
        style="box-shadow: 0px 0px 16px 5px rgba(219,129,230,0.5)"
      ></div>

      <div ref="line" class="h-64 w-2 rounded-full opacity-0 transition-colors duration-1000"></div>

      <div
        ref="right"
        class="h-16 w-16 rounded-lg opacity-0"
        style="box-shadow: 0px 0px 16px 5px rgba(0,177,255,0.5)"
      ></div>
    </div>

    <div class="absolute inset-0 flex items-center justify-center">
      <div
        ref="circle"
        class="h-140 w-140 rounded-full opacity-0"
        style="box-shadow: inset 16px 0px 16px 0px rgba(219,129,230,0.3), inset -16px 0px 16px 5px rgba(0,177,255,0.3)"
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
    const circleTimeline = this.circleTimeline();

    setInterval(() => {
      lineTimeline.restart();
      leftTimeline.restart();
      rightTimeline.restart();
      allTimeline.restart();
      circleTimeline.restart();
    }, 15000);
  },

  methods: {
    lineTimeline() {
      const lineTimeline = anime.timeline({
        targets: this.$refs.line
      });

      lineTimeline
        // Phase 1
        .add({
          background: "#ffffff",
          "box-shadow": "0px 0px 16px 5px #f7fafc",
          easing: "linear",
          duration: 1
        })
        .add({
          opacity: 1,
          easing: "linear",
          duration: 999
        })
        .add({
          scaleX: 0.5,
          scaleY: 2,
          easing: "easeOutSine",
          duration: 1000
        })
        // Phase 2
        .add({
          rotate: 90,
          scaleY: 0.5,
          background:
            "linear-gradient(0deg, rgba(219,129,230,0.5) 0%, rgba(129,230,217,0.5) 50%, rgba(0,177,255,0.5) 100%)",
          "border-radius": "0rem",
          "box-shadow": "0px 0px 0px 0px #f7fafc",
          easing: "linear",
          duration: 1000,
          delay: 1000
        })
        // Phase 3
        .add({
          scaleX: 4.37,
          easing: "easeOutQuint",
          duration: 1000
        })
        .add({
          scaleX: 3.12,
          easing: "linear",
          duration: 2000
        });

      return lineTimeline;
    },

    leftTimeline() {
      const leftTimeline = anime.timeline({
        targets: this.$refs.left
      });

      leftTimeline
        // Phase 1
        .add({
          opacity: 1,
          translateX: "15rem",
          easing: "easeOutQuint",
          duration: 1000
        })
        .add({
          translateX: "30rem",
          easing: "easeOutSine",
          duration: 1000
        })
        // Phase 3
        .add({
          translateX: "5rem",
          easing: "easeOutQuint",
          duration: 1000,
          delay: 2000
        })
        .add({
          translateX: "15rem",
          easing: "linear",
          duration: 2000
        });

      return leftTimeline;
    },

    rightTimeline() {
      const rightTimeline = anime.timeline({
        targets: this.$refs.right
      });

      rightTimeline
        // Phase 1
        .add({
          opacity: 1,
          translateX: "-15rem",
          easing: "easeOutQuint",
          duration: 1000
        })
        .add({
          translateX: "-30rem",
          easing: "easeOutSine",
          duration: 1000
        })
        // Phase 3
        .add({
          translateX: "-5rem",
          easing: "easeOutQuint",
          duration: 1000,
          delay: 2000
        })
        .add({
          translateX: "-15rem",
          easing: "linear",
          duration: 2000
        });

      return rightTimeline;
    },

    allTimeline() {
      const allTimeline = anime.timeline({
        targets: this.$refs.all
      });

      allTimeline
        // Phase 2
        .add({
          rotate: "1turn",
          scale: 0,
          easing: "cubicBezier(0.2, 0.55, 1, 0)",
          duration: 1000,
          delay: 2000
        })
        // Phase 3
        .add({
          scale: 1,
          easing: "easeOutQuint",
          duration: 1000,
          delay: 1000
        })
        // Phase 4
        .add({
          rotate: "2turn",
          scale: 0.6,
          easing: "cubicBezier(0.2, 0.55, 1, 0)",
          duration: 1000,
          delay: 2000
        })
        .add({
          rotate: "4turn",
          opacity: 0,
          easing: "cubicBezier(0.2, 0.55, 1, 0)",
          duration: 2000
        });

      return allTimeline;
    },

    circleTimeline() {
      const circleTimeline = anime.timeline({
        targets: this.$refs.circle
      });

      circleTimeline
        // Phase 4
        .add({
          opacity: 1,
          rotate: "2turn",
          easing: "cubicBezier(0.2, 0.55, 1, 0)",
          duration: 2000,
          delay: 8000
        })
        .add({
          rotate: "3turn",
          easing: "easeOutSine",
          duration: 4000
        });

      return circleTimeline;
    }
  }
};
</script>
