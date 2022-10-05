export class Comment {
  constructor(data) {
    this.id = data.id //string
    this.creatorId = data.creatorId //Object Id
    this.eventId = data.eventId //Object Id
    this.body = data.body //string

    this.creator = data.creator //virtual

    //stretch goal
    this.isAttending = data.isAttending //boolean
  }
}