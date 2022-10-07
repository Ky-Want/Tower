import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentService.js";
import BaseController from "../utils/BaseController.js";


export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .get('', this.getAllComments)
      .get('/:id', this.getCommentById)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:id', this.removeComment)
  }



  // SECTION: getting comments
  async getCommentById(req, res, next) {
    try {
      const comment = await commentsService.getCommentById(req.params.id)
      res.send(comment)
    } catch (error) {

    }
  }

  async getAllComments(req, res, next) {
    try {
      const comments = await commentsService.getAllComments(req.query)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEventId(req, res, next) {
    try {
      const eventComments = await commentsService.getCommentsByEventId()
    } catch (error) {
      next(error)
    }
  }







  // SECTION: creating and removing comments
  async removeComment(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.id, req.userInfo.id)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

}