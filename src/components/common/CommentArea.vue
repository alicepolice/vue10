<template>
  <div class="m-4">
    <!-- <div class="text-3xl font-bold">Comments</div> -->
    <template v-if="comments.length == 0">当前pid帖子没有评论</template>
    <template v-else v-for="(value, index) in comments" :key="index">
      <div class="border border-stone-300 p-1">
        <div>
          <img
            src="@/assets/avater/hamster.jpg"
            class="inline-block w-12 h-12 align-top"
          />
          <div class="inline-block ml-2">
            <div class="font-bold text-stone-700">{{ value.name }}</div>
            <div class="text-stone-400 text-sm">
              {{ dateConvert(value.date) }}
            </div>
          </div>
        </div>
        <div class="mt-2 text-black">{{ value.text }}</div>
        <div class="float-right">
          <span class="m-1 text-rose-500">回复</span>
          <span class="m-1 text-rose-500" @click="deleteComment(value.id)"
            >删除</span
          >
          <!-- v-if="value.id == uid"-->
        </div>
        <div class="clear-both"></div>
      </div>
      <div class="mt-2" v-if="index != comments.length - 1"></div>
    </template>
    <div class="pt-12"></div>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";

interface Comment {
  date: number;
  text: string;
  id: number;
  name: string;
}

export default defineComponent({
  name: "CommentArea",
  props: {
    comments: {
      type: Array as PropType<Comment[]>,
      required: true,
    },
    uid: {
      type: Number,
      required: false,
    },
  },
  methods: {
    dateConvert(date: number): string {
      return new Date(date).toUTCString();
    },
    deleteComment(id: number) {
      this.$emit("delete-comment", id);
    },
  },
});
</script>