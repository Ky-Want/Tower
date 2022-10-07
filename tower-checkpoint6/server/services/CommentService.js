import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";



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

  async getEventComments() {
    // need to access events
    // through events get comments?
  }







  // SECTION: deleting and creating comments
  async createComment(commentData) {
    const comment = await dbContext.Comment.create(commentData)
    return comment
  }

  async deleteComment(id, userInfo) {
    const comment = await this.getCommentById(id)

    if (comment.creatorId.toString() != userInfo.id) {
      throw new Forbidden('You may not delete comments that are not your own.')
    }

    await comment.save()
    return comment
  }

}


export const commentsService = new CommentService()