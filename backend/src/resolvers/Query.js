const { forwardTo } = require('prisma-binding');

const Query = {
  wines: forwardTo('db'),
  reviews: forwardTo('db'),
  tastingSessions: forwardTo('db'),
  tastingSession: forwardTo('db'),
  wineTasters: forwardTo('db')

  // async wines(parent, args, ctx, info) {
  //   const wines = await ctx.db.query.wines();
  //   console.log('wines', JSON.stringify(wines))
  //   return wines;
  // },

  // async reviews(parent, args, ctx, info) {
  //   const reviews = await ctx.db.query.reviews();
  //   return reviews;
  // },

  // async tastingSessions(parent, args, ctx, info) {
  //   const tastingSessions = await ctx.db.query.tastingSessions();
  //   return tastingSessions;
  // },

  // async wineTasters(parent, args, ctx, info) {
  //   const wineTasters = await ctx.db.query.wineTasters();
  //   return wineTasters;
  // }
};

module.exports = Query;