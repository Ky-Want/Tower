import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js";
import Pop from "../utils/Pop.js";


class CommentsService {
  async getAllComments() {
    try {
      const res = await api.get('api/comments')
      AppState.comments = res.data
    } catch (error) {
      logger.error('get all comments in service failed')
      Pop.error('getting all comments')
    }
  }


  async getCommentsByEventId(id, formData) {
    try {
      const res = await api.get(`api/events/${id}/comments`, formData)
      AppState.comments = res.data.map(c => new Comment(c))

      console.log('get comments by event id: ', res.data);
    } catch (error) {
      console.error('get comments by event id Failed')
      Pop.error('getting comments by event id')
    }
  }







  async createComment(commentData) {
    try {
      const res = await api.post(`api/comments`, commentData)
      const comment = res.data
      AppState.comments = [...AppState.comments, comment]
    } catch (error) {
      logger.error('creating comment: comments service')
      Pop.error('creating comment in service failed')
    }
  }


  async removeComment(id) {
    try {
      const res = await api.delete(`api/comments/${id}`)
      AppState.comments = AppState.comments.filter(c => c.id != id)
    } catch (error) {
      logger.error('removing comment in service')
      Pop.error('removing comment in service failed')
    }
  }

}


export const commentsService = new CommentsService()