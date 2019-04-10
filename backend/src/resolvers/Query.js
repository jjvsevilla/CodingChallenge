const { forwardTo } = require('prisma-binding');

const Query = {
  wines: forwardTo('db'),
  reviews: forwardTo('db'),
  tastingSessions: forwardTo('db'),
  tastingSession: forwardTo('db'),
  wineTasters: forwardTo('db')
};

module.exports = Query;