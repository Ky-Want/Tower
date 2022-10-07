import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js";


class CommentsService {
  async getAllComments() {
    try {
      const res = await api.get('api/comments')
      AppState.comments = res.data

      console.log('comments in service: ', res.data);
    } catch (error) {
      logger.error('get all comments in service failed')
    }
  }


  async getCommentById(id) {
    const res = await api.get(`api/comments/${id}`)
    AppState.activeComment = new Comment(res.data)
  }


  async deleteComment(id) {
    const res = await api.delete(`api/comments/${id}`)
    AppState.comments = AppState.comments.filter(c = c.id != id)

    return res.data
  }


  async createComment(commentData) {
    const res = await api.post('/api/comments', commentData)
    AppState.comments.push(new Comment(res.data))

    console.log('creating comment in service:');

    return res.data
  }

}


export const commentsService = new CommentsService()