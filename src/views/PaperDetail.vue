<template>
  <div>
    <h1>{{ paper.title }}</h1>
    <p><strong>发布日期</strong>{{ paper.year }}</p>
    <p>论文类别：{{ paper.category }}</p>
    <p>摘要内容：{{ paper.abstract }}</p>

    <div class="buttons">
      <button @click="loadCitedPapers">引用论文</button>
      <button v-if="isVip" @click="loadSameCategoryPapers">同类论文</button>
      <button v-if="isVip" @click="loadSimilarPapers">相似论文</button>
    </div>

    <!-- 引用论文内容展示区域 -->
    <div v-if="showCitedPapers" class="paper-list">
      <h3>引用论文</h3>
      <div class="paper-card" v-for="(paper, index) in citedPapers" :key="index">
        <router-link :to="`/paper/${paper.id}`">
          <div class="card">
            <h4>{{ paper.title }}</h4>
          </div>
        </router-link>
      </div>
    </div>

    <!-- 相似论文内容展示区域 -->
    <div v-if="showSimilarPapers" class="paper-list">
      <h3>相似论文</h3>
      <div class="paper-card" v-for="(paper, index) in similarPapers" :key="index">
        <router-link :to="`/paper/${paper.id}`">
          <div class="card">
            <h4>{{ paper.title }}</h4>
          </div>
        </router-link>
      </div>
    </div>

    <!-- 同类论文内容展示区域 -->
    <div v-if="showSameCategoryPapers" class="paper-list">
      <h3>同类论文</h3>
      <div class="paper-card" v-for="(paper, index) in sameCategoryPapers" :key="index">
        <router-link :to="`/paper/${paper.id}`">
          <div class="card">
            <h4>{{ paper.title }}</h4>
          </div>
        </router-link>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <p>加载中...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['id', 'userRole'],
  data() {
    return {
      paper: {
        title: '论文标题',
        year: 2023,
        category: '计算机科学',
        abstract: '论文摘要内容...',
      },
      citedPapers: [],
      similarPapers: [],
      sameCategoryPapers: [],
      loading: false,
      showCitedPapers: false,
      showSimilarPapers: false,
      showSameCategoryPapers: false,
    };
  },
  computed: {
    isVip() {
      return true; // 假设当前用户为 VIP 用户
    },
  },
  methods: {
    async fetchPaperDetail() {
      this.loading = true;
      try {
        const response = await axios.get(`http://127.0.0.1:5000/paper_details?paper_id=${this.id}`);
        this.paper = response.data;
        console.log('论文详情:', this.paper); // 打印论文详情
      } catch (error) {
        console.error('加载论文详情失败:', error);
      } finally {
        this.loading = false;
      }
    },

    async loadCitedPapers() {
      this.loading = true;
      this.showCitedPapers = true;
      this.showSimilarPapers = false;
      this.showSameCategoryPapers = false;

      try {
        const response = await axios.get(`http://127.0.0.1:5000/citations_by_index?paper_index=${this.id}&page=1&per_page=5`);
        this.citedPapers = response.data;
      } catch (error) {
        console.error('加载引用论文失败:', error);
      } finally {
        this.loading = false;
      }
    },

    async loadSimilarPapers() {
      if (!this.isVip) return;

      this.loading = true;
      this.showCitedPapers = false;
      this.showSimilarPapers = true;
      this.showSameCategoryPapers = false;

      try {
        // 获取保存在 localStorage 中的 token
        const token = localStorage.getItem('access_token');
        console.log(token);

        // 如果 token 存在，将其添加到请求头中
        const response = await axios.get(`http://127.0.0.1:5000/similar_papers?paper_id=${this.id}&k=5&page=1&per_page=5`, {
          headers: {
            'Authorization': `Bearer ${token}`  // 将 token 加入到请求头中
          }
        });

        this.similarPapers = response.data;
      } catch (error) {
        alert("请先升级为VIP用户");
        console.error('加载相似论文失败:', error);
      } finally {
        this.loading = false;
      }
    },

    async loadSameCategoryPapers() {
      this.loading = true;
      this.showCitedPapers = false;
      this.showSimilarPapers = false;
      this.showSameCategoryPapers = true;

      try {
        const response = await axios.get(`http://127.0.0.1:5000/search_by_category?category=${this.paper.category}&page=1&per_page=5`);
        this.sameCategoryPapers = response.data;
      } catch (error) {
        console.error('加载同类论文失败:', error);
      } finally {
        this.loading = false;
      }
    },
  },

  watch: {
    id(newId, oldId) {
      if (newId !== oldId) {
        this.fetchPaperDetail();  // 当 id 改变时重新加载数据
      }
    }
  },

  created() {
    // 初次加载数据
    this.fetchPaperDetail();
  }
};
</script>


<style scoped>
  /* 基本按钮样式 */
.buttons {
  display: flex;
  gap: 15px; /* 按钮之间的垂直间距 */
  margin-top: 20px;
}

button {
  background-color: #007bff; /* 设置按钮背景色 */
  color: white;  /* 设置文字颜色 */
  border: none;  /* 去掉按钮边框 */
  padding: 10px 20px;  /* 设置内边距 */
  font-size: 16px;  /* 设置字体大小 */
  border-radius: 5px;  /* 设置圆角 */
  cursor: pointer;  /* 鼠标悬停时显示为指针 */
  transition: background-color 0.3s, transform 0.3s;  /* 添加平滑的过渡效果 */
}

button:hover {
  background-color: #007bff;  /* 鼠标悬停时按钮颜色变化 */
  transform: scale(1.05);  /* 鼠标悬停时稍微放大按钮 */
}

button:disabled {
  background-color: #ccc;  /* 禁用状态时改变按钮颜色 */
  cursor: not-allowed;  /* 禁用时显示禁止符号 */
}
/* 基本卡片样式 */
.paper-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* 单列布局 */
  gap: 20px; /* 卡片之间的间距 */
  margin-top: 20px;
  width: 80%; /* 设置宽度为页面的 80% */
  margin-left: auto; /* 水平居中 */
  margin-right: auto; /* 水平居中 */
}

/* 卡片的样式 */
.paper-card {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out; /* 鼠标悬停时的过渡效果 */
}

.paper-card:hover {
  transform: translateY(-5px); /* 鼠标悬停时卡片微微上升 */
}

.card h4 {
  font-size: 18px;
  margin-bottom: 10px;
}

.card p {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.card strong {
  font-weight: bold;
}
</style>
