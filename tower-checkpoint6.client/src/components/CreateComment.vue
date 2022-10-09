<template>
  <div class="row justify-content-center">
    <div class="col-8 d-flex justify-content-center text-secondary p-2">
      <label for="comment" class="form-label"></label>
      <textarea class="form-control" id="comment" rows="3"></textarea>
    </div>
  </div>

  <div class="d-flex justify-content-end mt-5 mb-4">
    <button type="submit" class="commentBtn rounded selectable" @click="handleSubmit()">Post Comment</button>
  </div>
</template>


<script>
import { ref } from "vue"
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js";
import Pop from "../utils/Pop.js"


export default {
  setup() {
    const route = useRoute()

    const editable = ref({
      eventId: AppState.activeEvents.id || route.params.id
    });

    return {
      editable,
      async handleSubmit() {
        try {
          const commentData = editable.value
          let newComment = await commentsService.createComment(commentData)

          console.log('Sending comment form', newComment);

        } catch (error) {
          Pop.error(error, '[Submitting Comment Form]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>