import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentService.js";
import BaseController from "../utils/BaseController.js";


export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .get('', this.getAllComments)
      .get('/:id', this.getCommentById)

      // .get('api/events/:id/comments', this.getEventComments)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:id', this.removeComment)
  }



  // SECTION: creating and removing comments
  async removeComment(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.id, req.userInfo)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await commentsService.createComment(req.body)
      res.send(event)
    } catch (error) {
      next(error)
    }
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

  async getEventComments(req, res, next) {
    try {
      const eventComments = await commentsService.getEventComments()
    } catch (error) {
      next(error)
    }
  }

}