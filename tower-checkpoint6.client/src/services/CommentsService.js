import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js";


class CommentsService {
  async getAllComments() {
    try {
      const res = await api.get('api/comments')
      AppState.comments = res.data
    } catch (error) {
      logger.error('get all comments in service failed')
    }
  }


  async getCommentsByEventId(id, formData) {
    try {
      const res = await api.get(`api/events/${id}/comments`, formData)
      AppState.activeComment = new Comment(res.data)

      console.log('get comments by event id: ', res.data);
    } catch (error) {
      console.error('get comments by event id Failed')
    }
  }







  async createComment(commentData) {
    const res = await api.post(`api/comments`, commentData)
    const comment = res.data
    AppState.comments = [...AppState.comments, comment]

    console.log('creating comment in service:', res.data);
  }


  async removeComment(id) {
    const res = await api.delete(`api/comments/${id}`)
    AppState.comments = AppState.comments.filter(c => c.id != id)

    console.log('removing comment in service', res.data)
  }

}


export const commentsService = new CommentsService()