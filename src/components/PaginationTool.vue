<!-- src/components/PaginationTool.vue -->
<!-- PaginationTool.vue -->
<template>
  <div class="pagination">
    <button :disabled="page === 1" @click="changePage(1)">首页</button>
    <button :disabled="page === 1" @click="changePage(page - 1)">上一页</button>
    <span>第 {{ page }} 页</span>
    <button :disabled="page === totalPages" @click="changePage(page + 1)">下一页</button>
    <button :disabled="page === totalPages" @click="changePage(totalPages)">尾页</button>
  </div>
</template>

<script>
export default {
  props: {
    page: Number,
    totalPages: Number,
  },
  methods: {
    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.$emit('page-changed', newPage);
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
button {
  padding: 5px 10px;
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
