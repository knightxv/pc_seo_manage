'use strict';

module.exports = app => {
  const newsTypeArr = app.typeEnum.news;

  const createPageArr = PageLength => {
    return (pageIndex, dataCount) => {
      const halfLength = Math.ceil(PageLength / 2);
      const pageArr = [];
      if (pageIndex < halfLength) {
        if (dataCount === 0) {
          return [];
        }
        for (let i = 0; i < dataCount; i++) {
          pageArr.push(i);
        }
        return pageArr;
      }
      if (pageIndex > dataCount - 1 - PageLength) {
        for (let i = 0; i < PageLength; i++) {
          pageArr.push((dataCount - PageLength + i));
        }
        return pageArr;
      }
      for (let i = 0; i < PageLength; i++) {
        pageArr.push(pageIndex - halfLength + 1 + i);
      }
      return pageArr;
    };
  };
  /* 创建分页显示数组
      @query : pageIndex, //当前在哪个page
      @query : dataCount, // 总的页数
  */
  const defaultPageLength = 5;
  const createPageArrFive = createPageArr(defaultPageLength);

  class NewsController extends app.Controller {
    async index(ctx) {
      const { newsTypeValue } = ctx.params;
      const { page = 0, size = 10 } = ctx.query;
      const sideTypeArr = newsTypeArr.map(newsInfo => ({
        label: newsInfo.label,
        href: `/news/${newsInfo.value}`,
      }));
      let sideIndex = 0; // 侧边栏选择的类型
      let selectType = newsTypeArr && newsTypeArr[0].type; // 选择的游戏type
      newsTypeArr.some((typeInfo, index) => {
        const isSame = typeInfo.value === newsTypeValue;
        if (isSame) {
          sideIndex = index;
          selectType = typeInfo.type;
        }
        return isSame;
      });
      const newsList = await ctx.service.news.selectNewsByNewsType({
        type: selectType,
        page,
        size,
      });
      const selectNewsCount = await ctx.service.news.getCount(selectType); // 新闻的总长度
      const selectNewsPageCount = Math.ceil(selectNewsCount / size);
      const paginationArr = createPageArrFive(page, selectNewsPageCount);
      await ctx.render('news.nj', {
        page,
        newsList,
        sideTypeArr,
        gameSideIndex: sideIndex,
        paginationArr,
      });
    }
    async newsDetail(ctx) {
      const { newsId } = ctx.params;
      const newsDetail = await ctx.service.news.find(+newsId);
      if (newsDetail) {
        const newsType = newsDetail.newsType;
        const beforeResults = await ctx.app.mysql
          .query('SELECT * FROM `news` WHERE `id` < ? AND `newsType` = ? LIMIT 0, 1;',
            [ +newsId, newsType ]
          );
        const beforeNews = beforeResults[0];
        const nextNewsResults = await ctx.app.mysql
          .query('SELECT * FROM `news` WHERE `id` > ? AND `newsType` = ? LIMIT 0, 1;',
            [ +newsId, newsType ]
          );
        const nextNews = nextNewsResults[0];
        // const beforeNews = await ctx.service.news.find(+newsId - 1);
        // const nextNews = await ctx.service.news.find(+newsId + 1);
        await ctx.render('newsDetail.nj', {
          news: newsDetail,
          beforeNews,
          nextNews,
        });
      } else {
        await ctx.render('newsDetail.nj', {
          news: null,
        });
      }
    }
  }
  return NewsController;
};
