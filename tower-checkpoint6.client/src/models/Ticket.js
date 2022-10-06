export class Ticket {
  constructor(data) {
    this.id = data.id //string
    this.profile = data.profile
    this.eventId = data.eventId //Object Id
    this.accountId = data.accountId //Object Id

    this.account = data.account //virtual
    this.towerEvent = data.towerEvent //virtual
  }
}