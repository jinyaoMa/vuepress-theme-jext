<template>
  <ul v-if="Object.keys(options).length > 0">
    <li v-for="(item, name) in options" :key="name">
      <div
        class="j-counter-list-item"
        :style="{
          paddingLeft: `calc(${gap} * ${item.level})`,
        }"
      >
        <router-link
          :to="item.path"
          :title="name"
          :class="{
            'link-active': $route.path.startsWith(item.path.replace(/\/$/, '')),
          }"
          >{{ name }}</router-link
        >
        <sup
          :style="{
            color: countColor,
          }"
        >
          {{ item.count }}
        </sup>
      </div>
      <j-counter-list-item
        :options="item.children"
        :gap="gap"
        :countColor="countColor"
      ></j-counter-list-item>
    </li>
  </ul>
</template>

<script>
export default {
  name: "j-counter-list-item",
  props: {
    options: {
      type: Object,
      required: true,
    },
    gap: {
      type: String,
      required: true,
    },
    countColor: {
      type: String,
      required: true,
    },
  },
};
</script>