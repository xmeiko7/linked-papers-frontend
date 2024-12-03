<template>
  <div>
    <h1>搜索结果</h1>
    <div class="paper-list">
      <div v-for="(paper, index) in paginatedPapers" :key="index" class="paper-card">
        <router-link :to="`/paper/${paper.id}`">
          <div class="card">
            <h3>{{ paper.title }}</h3>
          </div>
        </router-link>
      </div>
    </div>
    <!-- 分页组件 -->
    <pagination :page="currentPage" :total-pages="totalPages" @page-changed="onPageChanged" />
  </div>
</template>

<script>
import Pagination from '../components/PaginationTool.vue';
import axios from 'axios';

export default {
  components: {
    Pagination,
  },
  props: ['query'],  // 从路由传递的查询参数
  data() {
    return {
      papers: [],         // 存放搜索结果
      currentPage: 1,     // 当前页
      papersPerPage: 10,   // 每页显示的论文数量
      totalPages: 5,      // 总页数，初始值为 1
    };
  },
  computed: {
    paginatedPapers() {
      if (!this.papers || this.papers.length === 0) {
        return []; // 返回空数组
      }
      // const startIndex = (this.currentPage - 1) * this.papersPerPage;
      return this.papers.slice(0,10); // 根据当前页和每页数量来分页
    }
  },

  watch: {
    query(newQuery) {
      // 每次查询变更时刷新结果
      this.searchPapers(newQuery);
    }
  },
  methods: {
    async searchPapers(query) {
      console.log('当前查询:', query);  // 检查 query 的值
      if (!query.trim()) {
        this.papers = [];
        this.totalPages = 1;  // 清空时总页数设为 1
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:5000/search', {
          params: {
            keyword: query,
            page: this.currentPage,  // 当前页
            per_page: this.papersPerPage,  // 每页数量
          }
        });
        // 更新数据
        this.papers = response.data;  // 假设返回的数据包含一个 'papers' 数组
        console.log(this.papers);

      } catch (error) {
        console.error('搜索请求失败:', error);
        this.papers = [];
        this.totalPages = 1;  // 出现错误时设置总页数为 1
      }

    },
    onPageChanged(page) {
      this.currentPage = page; // 更新当前页
      this.searchPapers(this.query);  // 重新查询数据
    },
  },
  created() {
    // 初始化时进行查询
    this.searchPapers(this.query);
  }
};
</script>

<style scoped>
.paper-list {
  display: grid;
  grid-template-columns: repeat(2, 5fr); /* 每行 5 个卡片 */
  gap: 20px; /* 卡片之间的间距 */
}

.paper-card {
  background-color: #f9f9f9;
  padding-left: 50px; /* 右侧内边距，防止内容紧贴右边缘 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left; /* 使卡片内容左对齐 */
  height: 100px; /* 固定高度 */
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
