const Mutations = {
  async createTastingSession(parent, args, ctx, info) {
    const tastingSession = await ctx.db.mutation.createTastingSession({
      data: {
        ...args.data
      }
    }, info);
    return tastingSession;
  },

  async updateTastingSession(parent, args, ctx, info) {
    const tastingSession = await ctx.db.mutation.updateTastingSession({
      data: {
        ...args.data
      },
      where: {
        id: args.where.id
      },
    }, info);
    return tastingSession;
  },

  async deleteTastingSession(parent, args, ctx, info) {
    const tastingSession = await ctx.db.mutation.deleteTastingSession({
      where: {
        id: args.where.id
      },
    }, info);
    return tastingSession;
  },

  async createWine(parent, args, ctx, info) {
    const wine = await ctx.db.mutation.createWine({
      data: {
        ...args.data
      }
    }, info);
    return wine;
  },

  async createWineTaster(parent, args, ctx, info) {
    const wineTaster = await ctx.db.mutation.createWineTaster({
      data: {
        ...args.data
      }
    }, info);
    return wineTaster;
  },

  async createReview(parent, args, ctx, info) {
    const review = await ctx.db.mutation.createReview({
      data: {
        ...args.data
      }
    }, info);
    return review;
  },

  async updateReview(parent, args, ctx, info) {
    const review = await ctx.db.mutation.updateReview({
      data: {
        ...args.data
      },
      where: {
        id: args.where.id
      },
    }, info);
    return review;
  }
};

module.exports = Mutations;