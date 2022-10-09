<template>
  <div class="p-4 fs-2 text-light">
    <h2><strong>Tower</strong></h2>
  </div>

  <!-- SECTION: event details + delete button -->
  <div class="container d-flex gap-3 bg-grey p-5 rounded mb-5">
    <div class="col-5 rounded elevation-4 rounded">
      <img :src="event.coverImg" :alt="event.name" class="img-fluid rounded">
    </div>

    <div class="col-7">
      <div class="mb-3 d-flex justify-content-between">
        <h3>{{event?.name}}</h3>
        <p>Starting Date: {{new Date(event?.startDate).toLocaleDateString()}}</p>
      </div>

      <div class="mb-3 d-flex justify-content-between">
        <em>{{event?.location}}</em>
      </div>

      <div class="mb-3 pb-2">
        <strong>{{event?.description}}</strong>
      </div>

      <div class="d-flex justify-content-between">
        <p class="text-green"><strong>{{event?.capacity}} spots left</strong></p>
        <button class="text-dark bg-primary">ATTEND</button>
      </div>

      <div @click="cancelEvent(event.id)" v-if="event.creatorId == account.id" class="d-flex justify-content-end mt-3">
        <i class="fa-solid fa-trash-can selectable"></i>
      </div>
    </div>
  </div>






  <!-- SECTION: ticket holders pics -->
  <div class="container mt-5 mb-5">
    <div class="bg-dark rounded p-3">
      <!-- {{tickets.account.picture}} -->
      Attendees pics will go here
    </div>
  </div>





  <!-- SECTION: comments form -->
  <div class="container mb-5">
    <div class="bg-dark card d-flex justify-content-center p-3">
      <!-- <div class="row justify-content-center">
        <div class="col-8 d-flex justify-content-center text-secondary p-2">
          <label for="comment" class="form-label"></label>
          <textarea class="form-control" id="comment" rows="3"></textarea>
        </div>
      </div> -->

      <CreateComment />

      <!-- comment button -->
      <!-- <div class="d-flex justify-content-end mt-5 mb-4">
        <button type="submit" class="commentBtn rounded selectable" @click="createComment()">Post Comment</button>
      </div> -->
      <!-- commenters pic -->
      <div v-for="c in comments" :key="c.id" :comment="c"
        class="mt-5 pt-5 d-flex gap-5 justify-content-center align-items-center">

        <div>
          <img src="//thiscatdoesnotexist.com" alt="Commenters name here" class="comment-pic rounded">
        </div>

        <!-- comments -->
        <div>
          <h4>{{comment.creator.name}}</h4>
          <p>{{comment.body}}</p>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import EventCard from '../components/EventCard.vue';
import DeleteEvent from "../components/DeleteEvent.vue";
import { commentsService } from "../services/CommentsService.js";
import { api } from "../services/AxiosService.js";
import CreateComment from "../components/CreateComment.vue";



export default {
  props: {
    comment: {
      type: Comment,
      required: true
    }
  },



  setup() {
    const route = useRoute();
    const router = useRouter();





    async function getAllComments() {
      try {
        await commentsService.getAllComments()
      } catch (error) {
        Pop.error("Cannot find comments")
      }
    }


    async function getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.id);
      }
      catch (error) {
        Pop.error(error, "[GetComments: event details page]");
      }
    }


    async function getEventById() {
      try {
        await eventsService.getEventsById(route.params.id);
      }
      catch (error) {
        Pop.error("Sorry that event no longer exists", "[GettingEvent]");
        router.push({ name: "Home" });
      }
    }






    onMounted(() => {
      getEventById();
      getAllComments();
      getCommentsByEventId();
    });







    return {
      event: computed(() => AppState.activeEvents),
      account: computed(() => AppState.account),
      comment: computed(() => AppState.comments),






      async cancelEvent(id) {
        try {
          await Pop.confirm('Are you sure you want to delete this Event?')
          await eventsService.cancelEvent(id)
        } catch (error) {
          console.error(error, 'Deleting Post: Event Details page')
        }
      },



      // async createComment(id) {
      //   try {
      //     console.log('create comment in event details');
      //     const res = await api.post('api/comments', commentData)

      //     comment
      //       .push(new Comment(res.data))

      //   } catch (error) {
      //     console.error(error, 'creating comment: eventDetails page')
      //   }
      // },


      async createComment() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect()
          }
          await eventsService.createComment({
            albumId: AppState.activeAlbum.id || route.params.id
          })
          Pop.success('Thank you for your input.')
        } catch (error) {
          Pop.error(error, '[create comment: event details page]')
        }
      },

    };
  },
  components: { EventCard, DeleteEvent, CreateComment }
}
</script>





<style lang="scss" scoped>
.text-green {
  color: green;
}

.comment-pic {
  height: 4rem;
  width: 4rem;
}

.commentBtn {
  height: 2rem;
  width: 8rem;
}
</style>