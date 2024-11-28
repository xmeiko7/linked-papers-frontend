<template>
  <div>
    <h1>{{ paper.title }}</h1>
    <p><strong>作者：</strong>{{ paper.author }}</p>
    <p>论文类别：{{ paper.category }}</p>
    <p>摘要内容：{{ paper.summary }}</p>

    <div class="buttons">
      <button @click="loadCitedPapers">引用论文</button>
      <button v-if="isVip" @click="loadSimilarPapers">相似论文</button>
      <button v-if="isVip" @click="loadSameCategoryPapers">同类论文</button>
    </div>

    <!-- 引用论文内容展示区域 -->
    <div v-if="showCitedPapers" class="paper-list">
      <h3>引用论文</h3>
      <ul>
        <li v-for="(paper, index) in citedPapers" :key="index">{{ paper.title }}</li>
      </ul>
    </div>

    <!-- 相似论文内容展示区域 -->
    <div v-if="showSimilarPapers" class="paper-list">
      <h3>相似论文</h3>
      <ul>
        <li v-for="(paper, index) in similarPapers" :key="index">{{ paper.title }}</li>
      </ul>
    </div>

    <!-- 同类论文内容展示区域 -->
    <div v-if="showSameCategoryPapers" class="paper-list">
      <h3>同类论文</h3>
      <ul>
        <li v-for="(paper, index) in sameCategoryPapers" :key="index">{{ paper.title }}</li>
      </ul>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <p>加载中...</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'userRole'], // 新增 userRole 属性来区分用户角色
  data() {
    return {
      paper: {
        title: '论文标题',
        author: '作者姓名',
        category: '计算机科学',
        summary: '论文摘要内容...',
      },
      citedPapers: [], // 引用论文列表
      similarPapers: [], // 相似论文列表
      sameCategoryPapers: [], // 同类论文列表
      loading: false, // 加载状态
      showCitedPapers: false, // 是否显示引用论文
      showSimilarPapers: false, // 是否显示相似论文
      showSameCategoryPapers: false, // 是否显示同类论文
    };
  },
  computed: {
    isVip() {
      // return this.userRole === 'VIP'; // 判断当前用户是否为 VIP 用户
      return true; // 假设当前用户为 VIP 用户
    },
  },
  methods: {
    async loadCitedPapers() {
      this.loading = true;
      this.showCitedPapers = true;
      this.showSimilarPapers = false;
      this.showSameCategoryPapers = false;

      try {
        // 模拟 API 请求：获取引用论文的数据
        const response = await fetch(`https://api.example.com/citedPapers/${this.id}`);
        this.citedPapers = await response.json();
      } catch (error) {
        console.error('加载引用论文失败:', error);
      } finally {
        this.loading = false;
      }
    },

    async loadSimilarPapers() {
      if (!this.isVip) return; // 如果不是 VIP 用户，直接返回

      this.loading = true;
      this.showCitedPapers = false;
      this.showSimilarPapers = true;
      this.showSameCategoryPapers = false;

      try {
        // 模拟 API 请求：获取相似论文的数据
        const response = await fetch(`https://api.example.com/similarPapers/${this.id}`);
        this.similarPapers = await response.json();
      } catch (error) {
        console.error('加载相似论文失败:', error);
      } finally {
        this.loading = false;
      }
    },

    async loadSameCategoryPapers() {
      if (!this.isVip) return; // 如果不是 VIP 用户，直接返回

      this.loading = true;
      this.showCitedPapers = false;
      this.showSimilarPapers = false;
      this.showSameCategoryPapers = true;

      try {
        // 模拟 API 请求：获取同类论文的数据
        const response = await fetch(`https://api.example.com/sameCategoryPapers/${this.id}`);
        this.sameCategoryPapers = await response.json();
      } catch (error) {
        console.error('加载同类论文失败:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  font-weight: bold;
}

p {
  font-size: 16px;
}

.buttons button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 10px;
}

.paper-list {
  margin-top: 20px;
}

.paper-list ul {
  list-style-type: none;
  padding: 0;
}

.paper-list li {
  margin: 5px 0;
}

.loading {
  margin-top: 20px;
  font-size: 16px;
  color: #888;
}
</style>
