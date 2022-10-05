export class Event {
  constructor(data) {
    this.id = data.id //string
    this.creatorId = data.creatorId //Object Id
    this.name = data.name //string
    this.description = data.description //string
    this.coverImg = data.coverImg //string
    this.location = data.location //string
    this.capacity = data.capacity //number
    this.startDate = data.startDate //data
    this.isCanceled = data.isCanceled //boolean
    this.type = data.type //enum string: ['concert', 'convention', 'sport', 'digital']

    this.creator = data.creator //virtual
  }
}