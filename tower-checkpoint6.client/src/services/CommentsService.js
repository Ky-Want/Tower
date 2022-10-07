import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js";


class CommentsService {
  async getAllComments() {
    try {
      const res = await api.get('/comments')
      AppState.
    } catch (error) {

    }
  }

  //   try {
  //   const res = await api.get('/account')
  //   AppState.account = res.data
  // } catch (err) {
  //   logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
  // }


  async getCommentById() {

  }
}


export const commentsService = new CommentsService()