<template>
  <div>
    <h1>推荐阅读</h1>
    <div class="paper-list">
      <div v-for="(paper, index) in papers" :key="index" class="paper-card">
        <router-link :to="`/paper/${paper.id}`">
          <div class="card">
            <h3>{{ paper.title }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      papers: [
        {id: "39864",title: "Kf Cs Compressive Sensing on Kalman Filtered Residual"},
        {id: "27969",title: "Ls Cs Residual Ls Cs Compressive Sensing on Least Squares Residual"},
        {id: "49240",title: "Stability over Time of Modified Cs and Ls Cs for Recursive Causal Sparse Reconstruction"},
        {id: "149301",title: "Support Predicted Modified Cs for Recursive Robust Principal Components Pursuit"},
        {id: "3520",title: "Noise Folding Based on General Complete Perturbation in Compressed Sensing"},
        {id: "163922",title: "The Tension Between Openness and Prudence in Ai Research"},
        {id: "93837",title: "Ai Ethics in Industry a Research Framework"},
        {id: "67583",title: "Founding the Domain of Ai Forensics"},
        {id: "66261",title: "Responsible Ai by Design in Practice"},
        {id: "146904",title: "Ten Ai Stepping Stones for Cybersecurity"},

        ],
    };
  }
};
</script>

<style scoped>
/* 设置纸张列表的布局为2列，每列宽度为1fr，且增加合理间距 */
.paper-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 两列均分宽度 */
  gap: 30px; /* 增加列和行之间的间距 */
  margin-top: 20px;
  padding: 0 20px; /* 添加左右内边距 */
}

/* 调整每个纸张卡片的样式 */
.paper-card {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  height: auto; /* 允许卡片根据内容自动调整高度 */
  width: 90%; /* 让卡片占满整个网格 */
  transition: transform 0.3s ease; /* 增加过渡效果 */
}

.paper-card:hover {
  transform: scale(1.05); /* 鼠标悬停时放大卡片 */
}

/* 调整标题样式 */
.paper-card h3 {
  font-size: 18px; /* 稍大的字体 */
  margin: 10px 0;
  text-align: left;
}

/* 调整摘要样式 */
.paper-card p {
  font-size: 14px; /* 适中的字体大小 */
  color: #555;
  margin-top: 8px; /* 给摘要一点间隙 */
}

router-link {
  text-decoration: none; /* 移除下划线 */
}
</style>
