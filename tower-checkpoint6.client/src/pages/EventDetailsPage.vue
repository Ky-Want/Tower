<template>
  <div v-if="event">


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
          <div v-if="event?.capacity <= 0" class="text-dark bg-danger rounded p-1 px-2">
            At Capacity
          </div>

          <div v-if="event?.capacity >= 1" class="text-green">
            {{event?.capacity}} spots left
          </div>

          <div v-else="event?.isCanceled == true" class="text-dark bg-danger rounded p-1 px-2">
            Canceled
          </div>

          <button class="text-dark bg-primary">ATTEND</button>
        </div>

        <div @click="cancelEvent(event.id)" v-if="event.creatorId == account.id"
          class="d-flex justify-content-end mt-3">
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
      <form @submit.prevent="handleSubmit()" class="bg-dark card d-flex justify-content-center p-3">
        <div class="row justify-content-center">
          <div class="col-8 d-flex justify-content-center text-secondary p-2">
            <label for="comment" class="form-label"></label>
            <textarea v-model="editable.body" class="form-control" id="comment" rows="3"></textarea>
          </div>
        </div>

        <div class="d-flex justify-content-end mt-5 mb-4">
          <button type="submit" class="commentBtn rounded selectable">Post Comment</button>
        </div>

        <div v-for="c in comments" :key="c.id" class="mt-5 pt-5 d-flex gap-5 justify-content-center align-items-center">

          <div>
            <img :src="c.creator?.picture" :alt="c.creator?.name" class="comment-pic rounded">
          </div>

          <div>
            <h4>{{c.creator?.name}}</h4>
            <i class="fa-solid fa-trash-can selectable" @click="deleteComment(c.id)"></i>
            <p>{{c?.body}}</p>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div v-else>
    loading event....
  </div>
</template>



<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { AppState } from '../AppState.js';
import { ref } from 'vue';
import Pop from "../utils/Pop.js";

import { eventsService } from "../services/EventsService.js";
import { commentsService } from "../services/CommentsService.js";

import { Ticket } from "../models/Ticket.js";



export default {

  setup() {
    const route = useRoute();
    const router = useRouter();
    const editable = ref({});

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
        Pop.error("Sorry that event no longer exists", "[GettingEventById]");
        router.push({ name: "Home" });
      }
    }



    onMounted(() => {
      getEventById();
      getCommentsByEventId();
    });


    return {
      editable,
      event: computed(() => AppState.activeEvents),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),

      async handleSubmit() {
        try {
          // if (!AppState.account.id) {
          //   return AuthService.loginWithRedirect()
          // }

          const commentData = editable.value
          commentData.eventId = route.params.id
          await commentsService.createComment(commentData)
          editable.value = {}

          console.log('Sending comment form', commentData);
        } catch (error) {
          Pop.error(error, '[Submitting Comment Form]')
        }
      },


      async addTicket(ticketData) {
        const res = await api.post('/api/tickets', ticketData)
        AppState.tickets.push(new Ticket(res.data))

        console.log('creating ticket: Event details Page, '); //Don't call functions in the log
      },

      async cancelEvent(id) {
        try {
          if (await Pop.confirm('Are you sure you want to delete this Event?')) {
            await eventsService.cancelEvent(id)
          }
        } catch (error) {
          console.error(error, 'Deleting Post: Event Details page')
        }
      },


      async deleteComment(id) {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete this comment?')
          if (!yes) { return }
          await commentsService.removeComment(id)
        } catch (error) {
          console.error(error, 'Deleting comment: event details page')
        }
      }

    }
  }
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