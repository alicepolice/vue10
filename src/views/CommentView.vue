

<template>
  <div v-if="debug" class="m-2">
    <div class="text-3xl font-bold">[DEBUG] Query Comments</div>
    <input
      id="pid"
      class="input_text"
      type="text"
      placeholder="输入帖子id查找评论"
      v-model="pid"
    />
    <input
      type="button"
      value="查询"
      class="input_button"
      @click="queryComment"
    />
  </div>
  <div v-if="debug" class="m-2">
    <div class="text-3xl font-bold">[DEBUG] Insert Comments</div>
    <input
      id="uid"
      class="input_text"
      type="text"
      placeholder="当前用户uid"
      v-model="uid"
    />
    <input
      type="button"
      value="添加"
      class="input_button"
      @click="insertComment"
    />
    <div></div>
    <input
      id="pid"
      class="input_text"
      type="text"
      placeholder="当前帖子pid"
      v-model="pid"
    />
    <div></div>
    <textarea
      id="text"
      class="input_text w-full h-20"
      rows="3"
      cols="40"
      placeholder="Write your comment"
      v-model="text"
    />
  </div>
  <div class="m-4 border-stone-500">
    <textarea
      id="text"
      class="input_text h-20 w-full"
      rows="3"
      cols="40"
      placeholder="Write your comment..."
      v-model="text"
    />
  </div>

  <input
    type="button"
    value="Post comment"
    class="
      w-32
      h-10
      text-center
      ml-4
      text-sm text-white
      inline-block
      font-bold
      rounded-md
    "
    style="background-color: #fa5c5c"
    @click="insertComment"
  />
  <comment-area
    :comments="comments"
    :uid="uid"
    @delete-comment="deleteComment"
  ></comment-area>
</template>

<script>
import CommentArea from '@/components/common/CommentArea.vue';
export default {
  components: { CommentArea },
  name: 'CommentTestView',
  props: ["debug", "initpid"],
  data: function () {
    return {
      pid: 0,
      uid: 1003, // TODO VUEX 保存用户UUID
      text: "",
      comments: [
        // {
        //   id: 1,
        //   uid: 1001,
        //   name: "西红柿炒芹菜",
        //   text: "真的很不错啊。SQLite 是一个开源的嵌入式关系数据库，实现自包容、零配置、支持事务的 SQL 数据库引擎。",
        //   date: 1665912139673,
        //   img: require("@/assets/avater/hamster.jpg")
        // }
      ]
    }
  },
  methods: {

    insertComment() {
      const params = new URLSearchParams();
      params.append('uid', this.uid)
      params.append('pid', this.pid)
      params.append('text', this.text)
      this.axios.post("comment/insert",
        params
      ).then(response => {
        console.log(response.data)
        this.comments.unshift(
          response.data
        )
        console.log(this.comments)
      }).catch(err => {
        console.log(err)
      })
    },
    deleteComment(id) {
      const params = new URLSearchParams();
      params.append('id', id)
      this.axios.post("comment/delete", params).then(response => {
        console.log(response.data)
        this.comments = this.comments.filter(elem => {
          return elem.id != id
        })
      }).catch(err => {
        console.log(err)
      })
    },
    queryComment() {
      this.axios.get("comment/query", {
        params: {
          pid: this.pid
        }
      }).then(response => {
        if (!response.data) {
          this.comments = []
          return
        }
        this.comments = response.data
        this.comments.reverse()
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.pid = this.initpid;
    this.queryComment();
    let old = localStorage.getItem(`comment_${this.pid}`)
    if (old) {
      this.text = old
    }
  },
  watch: {
    text() {
      localStorage.setItem(`comment_${this.pid}`, this.text)
    }
  }
}
</script>

<style scoped>
.input_text {
  @apply mt-2
        inline-block
        bg-white
        focus:outline-none focus:ring focus:border-blue-200
        py-1.5
        pl-3
        border border-stone-400
        text-sm;
}
.input_button {
  @apply border border-rose-400
        text-sm
        font-bold
        text-rose-500
        rounded-sm
        px-4
        py-1
        mt-2
        ml-4
        active:bg-rose-400 active:text-white;
}
</style>