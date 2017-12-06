'use strict';

module.exports = options => {
  return async function auth(ctx, next) {
    // 验证session
    const isNeedAuth = ctx.url.indexOf('login') === -1 && /\/api\/manage\/.+/.test(ctx.url);
    if (isNeedAuth && !ctx.session.isAuthSuccess) {
        ctx.helper.setRes(false, { code: 2 });
    } else {
        await next();
    }
  };
};
