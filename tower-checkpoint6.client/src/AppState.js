import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /**@type {import('./models/TowerEvent.js/index.js').TowerEvent[]} */
  events: [],
  /**@type {import('./models/TowerEvent.js/index.js').TowerEvent} */
  activeEvents: {},
  /**@type {import('./models/Ticket.js/index.js').Ticket[]} */
  myTickets: [],
  /**@type {import('./models/Ticket.js/index.js').Ticket[]} */
  tickets: [],
  /**@type {import('./models/Comment.js/index.js').Comment[]} */
  comments: []
})
