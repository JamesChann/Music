import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Disc from 'components/disc/disc'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import RankDetail from 'components/rank-detail/rank-detail'
import Search from 'components/search/search'
import SingerDetail from 'components/singer-detail/singer-detail'
import DiscList from 'components/disc-list/disc-list'
import UserInfo from 'components/user-info/user-info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: RankDetail
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/disc-list',
      component: DiscList,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/user-info',
      component: UserInfo
    }
  ]
})
