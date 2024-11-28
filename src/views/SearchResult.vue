<template>
  <div>
    <h1>搜索结果</h1>
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
  props: ['query'],  // 从路由传递的查询参数
  data() {
    return {
      papers: [
        // 示例数据，实际情况根据查询结果返回
        { id: 1, title: '搜索论文1', author: '作者1', summary: '摘要内容1' },
        { id: 2, title: '搜索论文2', author: '作者2', summary: '摘要内容2' },
        { id: 3, title: '搜索论文3', author: '作者3', summary: '摘要内容3' },
        { id: 4, title: '搜索论文4', author: '作者4', summary: '摘要内容4' },
        { id: 5, title: '搜索论文5', author: '作者5', summary: '摘要内容5' },
        { id: 6, title: '搜索论文6', author: '作者6', summary: '摘要内容6' },
        { id: 7, title: '搜索论文7', author: '作者7', summary: '摘要内容7' },
        // 更多数据...
      ],
      currentPage: 1,
      papersPerPage: 5,  // 每页展示5篇论文
      totalPages: 5,     // 假设总共有5页
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
  watch: {
    query(newQuery) {
      // 每次查询变更时刷新结果
      this.searchPapers(newQuery);
    }
  },
  methods: {
    searchPapers(query) {
      // 根据查询内容获取数据，假设调用接口获取搜索结果
      console.log('搜索查询:', query);
    },
    onPageChanged(page) {
      this.currentPage = page;
      // 调用接口获取新的论文数据
    },
  },
};
</script>

<style scoped>
.paper-list {
  display: grid;
  grid-template-columns: repeat(1, 5fr); /* 每行 5 个卡片 */
  gap: 20px; /* 卡片之间的间距 */
}

.paper-card {
  background-color: #f9f9f9;
  padding-left: 50px; /* 右侧内边距，防止内容紧贴右边缘 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left; /* 使卡片内容左对齐 */
  height: 200px; /* 固定高度 */
}

.paper-card h3 {
  font-size: 18px;
  margin: 10px 0;
  text-align: left; /* 标题左对齐 */
  padding-right: 10px; /* 给标题加一些右边距 */
}

.paper-card p {
  font-size: 14px;
  color: #555;
  text-align: left; /* 摘要内容左对齐 */
  padding-right: 10px; /* 给段落内容加一些右边距 */
}

/* 移除 router-link 的下划线 */
router-link {
  text-decoration: none; /* 确保 router-link 没有下划线 */
}
</style>
