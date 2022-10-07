import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";
import { eventsService } from "./EventsService.js";


class CommentService {
  // SECTION: getting comments
  async getCommentById(id) {
    const comment = dbContext.Comment.findById(id).populate('creator', 'name picture')

    if (!comment) {
      throw new BadRequest('Invalid or Bad Comment Id')
    }
  }

  async getAllComments(query) {
    const comments = await dbContext.Comment.find(({
      // get if not attached to a canceled event
      ...query
    }))
  }

  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comment.find({ eventId })
      .populate('creator', 'name picture')
      .populate('event')
    return comments
  }










  // SECTION: deleting and creating comments
  async createComment(commentData) {
    const comment = await dbContext.Comment.create(commentData)
    await comment.populate('event')
    await comment.populate('creator', 'name picture')
    return comment
  }



  async deleteComment(id, userId) {
    const comment = await dbContext.Comment.findById(id)

    // @ts-ignore
    if (comment.creatorId.toString() != userId) {
      throw new BadRequest('You may not delete comments that are not your own.')
    }

    await comment.remove()
    return 'Delete successful'
  }

}


export const commentsService = new CommentService()