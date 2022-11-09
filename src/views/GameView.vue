<template>
  <div :style="{ 'background-color': theme.bgColor, color: theme.textColor }">
    <img :src="headImg" class="w-full" />
    <div class="m-4">A downloadable game for Window</div>
    <div>
      <div class="my_button" style="background-color: #fa5c5c">
        Download Now
        <!-- <b-icon-download
          class="inline-block text-lg align-text-top"
        ></b-icon-download> -->
      </div>
      <span class="ml-3 text-stone-500 text-sm">Name your own price</span>
    </div>

    <div class="h-52 mt-5">
      <iframe class="h-full w-full" frameborder="0" :src="videoSrc"></iframe>
    </div>

    <div class="mt-5 h-48 flex overflow-x-auto">
      <img v-for="(value, index) in imgs" :key="index" :src="value" />
    </div>

    <div v-html="html"></div>

    <div class="m-4 mt-6 text-2xl font-bold">Download</div>
    <div>
      <div class="my_button" style="background-color: #fa5c5c">
        Download Now
      </div>
      <span class="ml-3">Name your own price</span>
    </div>
    <div class="ml-4 mt-6">
      Click download now to get access to the following files:
    </div>

    <div class="ml-4 mt-4 font-bold">
      [BETA] roto_win_v1.2.5.zip 39 MB
      <b-icon-windows
        class="inline-block text-lg align-text-top"
      ></b-icon-windows>
    </div>

    <div class="m-4 mt-6 text-2xl font-bold">Comments</div>
    <comment-test-view class="m-4" :initpid="pid"></comment-test-view>
  </div>
  <bottom-bar :items="bottomItems"></bottom-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommentTestView from "@/views/CommentView.vue";
import BottomBar from "@/components/common/BottomBar.vue";

export default defineComponent({
  name: "GameVIew",
  components: { CommentTestView, BottomBar },
  data() {
    return {
      pid: 100,
      theme: {
        bgColor: "#E8E1BC",
        textColor: "#2f5b71",
      },
      headImg:
        "https://xiaonenglife.oss-cn-hangzhou.aliyuncs.com/static/pic/2022/11/20221109232741_head.png",
      videoSrc: "https://www.youtube.com/embed/zGGTLStyKX0",
      imgs: [
        "https://xiaonenglife.oss-cn-hangzhou.aliyuncs.com/static/pic/2022/11/20221109233251_1.png",
        "https://xiaonenglife.oss-cn-hangzhou.aliyuncs.com/static/pic/2022/11/20221109233256_4.png",
        "https://xiaonenglife.oss-cn-hangzhou.aliyuncs.com/static/pic/2022/11/20221109233253_2.png",
        "https://xiaonenglife.oss-cn-hangzhou.aliyuncs.com/static/pic/2022/11/20221109233255_3.png",
        "https://xiaonenglife.oss-cn-hangzhou.aliyuncs.com/static/pic/2022/11/20221109233253_2.png",
      ],
      html: `
      description
      `,
      bottomItems: [
        { text: "Studio Name", icon: "b-icon-house-heart", routerName: "home" },
        { text: "Follow", icon: "b-icon-person-circle", routerName: "about" },
        { text: "Collection", icon: "b-icon-collection", routerName: "about" },
        { text: "Comments", icon: "b-icon-chat-dots", routerName: "about" },
      ],
    };
  },
  created() {
    if (typeof this.$route.params.pid == "string")
      this.pid = parseInt(this.$route.params.pid);
    else this.pid = parseInt(this.$route.params.pid[0]);
    this.axios
      .get("/post/query", {
        params: {
          pid: this.pid,
        },
      })
      .then((response) => {
        if (!response.data) {
          console.log("无数据");
          return;
        }
        let data = response.data[0];
        console.log(data);
        this.theme.bgColor = data.bgcolor;
        this.theme.textColor = data.textcolor;
        this.headImg = data.headimg;
        this.imgs = JSON.parse(data.imgs);
        this.videoSrc = data.videosrc;
        this.html = data.html;
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
</script>

<style scoped>
.my_button {
  @apply w-32
          h-10
          pt-2.5
          text-center
          ml-4
          border border-rose-500
          text-sm text-white
          inline-block
          font-bold
          rounded-md;
}
</style>