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
export default {
  props: ['value'],
  data: () => ({
    menuItems: [
      {
        title: "Счёт",
        path: "/"
      },
      {
        title: "История",
        path: "/history"
      },
      {
        title: "Планирование",
        path: "/planning"
      },
      {
        title: "Новая запись",
        path: "/record"
      },
      {
        title: "Категории",
        path: "/categories"
      }
    ]
  })
}
</script>