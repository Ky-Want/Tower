<template>
  <div class="container mb-5">
    <!-- comment form -->
    <div class="bg-dark card d-flex justify-content-center p-3">
      <div class="row justify-content-center">
        <div class="col-8 d-flex justify-content-center text-secondary p-2">
          <label for="comment" class="form-label"></label>
          <textarea class="form-control" id="comment" rows="3"></textarea>
        </div>
      </div>

      <!-- comment button -->
      <div class="d-flex justify-content-end mt-5 mb-4">
        <button type="submit" class="commentBtn rounded selectable" @click="createComment()">Post Comment</button>
      </div>


      <!-- commenters pic -->
      <div class="mt-5 pt-5 d-flex gap-5 justify-content-center align-items-center">
        <div><img src="//thiscatdoesnotexist.com" alt="Commenters name here" class="comment-pic rounded"></div>

        <!-- comments -->
        <div>
          <h4>Name</h4>
          <p>Individuals comment goes here</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.comment-pic {
  height: 4rem;
  width: 4rem;
}

.commentBtn {
  height: 2rem;
  width: 8rem;
}
</style>