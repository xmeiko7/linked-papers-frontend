<!-- views/HomePage.vue -->
<template>
  <div>
    <h1>所有论文</h1>
    <div class="paper-list">
      <div v-for="(paper, index) in paginatedPapers" :key="index" class="paper-card">
        <router-link :to="`/paper/${paper.id}`">
          <div class="card">
            <h3>{{ paper.title }}</h3>
            <p><strong>作者：</strong>{{ paper.author }}</p>
            <p>{{ paper.summary }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <pagination :page="currentPage" :total-pages="totalPages" @page-changed="onPageChanged" />
  </div>
</template>


<script>
import Pagination from '../components/PaginationTool.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      papers: [
        { id: 1, title: '论文1', author: '作者1', summary: '摘要内容1' },
        { id: 2, title: '论文2', author: '作者2', summary: '摘要内容2' },
        { id: 3, title: '论文3', author: '作者3', summary: '摘要内容3' },
        { id: 4, title: '论文4', author: '作者4', summary: '摘要内容4' },
        { id: 5, title: '论文5', author: '作者5', summary: '摘要内容5' },
        { id: 6, title: '论文6', author: '作者6', summary: '摘要内容6' },
        { id: 7, title: '论文7', author: '作者7', summary: '摘要内容7' },
        { id: 8, title: '论文8', author: '作者8', summary: '摘要内容8' },
        { id: 9, title: '论文9', author: '作者9', summary: '摘要内容9' },
        { id: 10, title: '论文10', author: '作者10', summary: '摘要内容10' },
        { id: 11, title: '论文11', author: '作者11', summary: '摘要内容11' },
        { id: 12, title: '论文12', author: '作者12', summary: '摘要内容12' },
        // 更多数据...
      ],
      currentPage: 1,
      papersPerPage: 5,  // 每页展示5篇论文
      totalPages: 3,     // 假设总共有3页
    };
  },
  computed: {
    paginatedPapers() {
      // 计算当前页应展示的论文数据
      const start = (this.currentPage - 1) * this.papersPerPage;
      const end = start + this.papersPerPage;
      return this.papers.slice(start, end);
    },
  },
  methods: {
    onPageChanged(page) {
      this.currentPage = page;
      // 如果有接口，可以在此时获取新数据
    },
  },
};
</script>

<style scoped>


.paper-card {
  background-color: #f9f9f9;
  padding-left: 50px; /* 右侧内边距，防止内容紧贴右边缘 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left; /* 使卡片内容右对齐 */
  justify-content: space-between; /* 保证文本内容有间距 */
  height: 200px; /* 设置固定高度 */

}

.paper-card h3 {
  font-size: 18px;
  margin: 10px 0;
  text-align: left; /* 标题右对齐 */
  padding-right: 10px; /* 给标题加一些右边距 */
}

.paper-card p {
  font-size: 14px;
  color: #555;
  text-align: left; /* 摘要内容右对齐 */
  padding-right: 10px; /* 给段落内容加一些右边距 */
}

/* 移除 router-link 的下划线 */
router-link {
  text-decoration: none; /* 确保 router-link 没有下划线 */
}

/* 或者，如果你想直接移除所有 <a> 标签的下划线 */
</style>
