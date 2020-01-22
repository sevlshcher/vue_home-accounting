<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ 'Amount' | localize }}</th>
        <th>{{ 'Date' | localize }}</th>
        <th>{{ 'Category' | localize }}</th>
        <th>{{ 'Type' | localize }}</th>
        <th>{{ 'Open' | localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(rec, idx) of records" :key="rec.id">
        <td>{{ idx + 1}}</td>
        <td>{{ rec.amount | currency }}</td>
        <td>{{ rec.date | date('datetime')}}</td>
        <td>{{ rec.categoryName }}</td>
        <td>
          <span
            :class="[rec.typeClass]"
            class="white-text badge">{{ rec.typeText }}</span>
        </td>
        <td>
          <button
            v-tooltip="tooltip"
            class="btn-small btn"
            @click="$router.push('/detail/' + rec.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from '@/filters/localize.filter';

export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  computed: {
    tooltip() {
      return `${localizeFilter('View_Record')}`;
    }
  }
}
</script>