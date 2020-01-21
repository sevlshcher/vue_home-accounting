<template>
  <ul
    :class="{open: value}"
    class="sidenav app-sidenav">

    <router-link
      tag="li"
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path"
      :class="{active:$route.path === item.path}">

      <a href="#" class="waves-effect waves-orange pointer">{{item.title}}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter';

export default {
  props: ['value'],
  data: () => ({
    menuItems: [
      {
        title: localizeFilter('Menu_Bill'),
        path: "/"
      },
      {
        title: localizeFilter('Menu_History'),
        path: "/history"
      },
      {
        title: localizeFilter('Menu_Planning'),
        path: "/planning"
      },
      {
        title: localizeFilter('Menu_New_Record'),
        path: "/record"
      },
      {
        title: localizeFilter('Menu_Categories'),
        path: "/categories"
      }
    ]
  })
}
</script>