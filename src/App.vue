<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <header>
      <div class="logo" @click="goHome">LinkedPaper</div>
      <div class="search-container">
        <!-- 搜索框 -->
        <input
            v-model="searchQuery"
            type="text"
            placeholder="输入关键词..."
            class="search-input"
        />
        <button @click="search" class="search-btn">搜索</button>
      </div>

      <!-- 登录/欢迎信息 -->
      <div class="login-container">
        <button
            v-if="!isLoggedIn"
            @click="showLoginModal = true; console.log('Modal should show: ', showLoginModal)"
            class="login-btn"
        >
          登录
        </button>
        <div v-else class="welcome-message">
          <span @click="toggleMenu" class="username">
            欢迎你，{{ username }}
          </span>
          <!-- 下拉菜单 -->
          <div v-if="isMenuOpen" class="dropdown-menu">
            <button
                v-if="!isVIP"
                @click="upgradeToVIP"
                class="vip-btn"
            >
              升级VIP
            </button>
            <button
                v-else
                class="vip-btn disabled"
                disabled
            >
              已成为VIP
            </button>
            <button @click="logout" class="logout-btn">登出</button>
          </div>
        </div>
      </div>
    </header>

    <!-- 弹出登录界面 -->
    <div v-if="showLoginModal" class="login-modal">
      <div class="login-modal-content">
        <h3>登录</h3>
        <input
            v-model="username"
            type="text"
            placeholder="账号"
            class="input-field"
        />
        <input
            v-model="password"
            type="password"
            placeholder="密码"
            class="input-field"
        />
        <div class="modal-actions">
          <button @click="login" class="login-action-btn">登录</button>
          <button @click="register" class="login-action-btn">注册</button>
        </div>
        <button @click="showLoginModal = false" class="close-modal-btn">X</button>
      </div>
    </div>

    <!-- 主内容区域 -->
    <main>
      <router-view></router-view>  <!-- 路由内容将被渲染在这里 -->
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",  // 搜索框绑定的内容
      showLoginModal: false,
      username: "",
      password: "",
      isLoggedIn: false, // 用户登录状态
      isVIP: false,      // 用户VIP状态
      isMenuOpen: false, // 控制下拉菜单是否展开
      papers: [
        { title: "论文1", author: "作者1", summary: "摘要1" },
        { title: "论文2", author: "作者2", summary: "摘要2" },
        { title: "论文3", author: "作者3", summary: "摘要3" },
      ],
    };
  },
  methods: {
    search() {
      console.log("搜索内容：", this.searchQuery);
      if (this.searchQuery.trim() !== "") {
        this.$router.push({ name: 'SearchResult', query: { query: this.searchQuery } });
        console.log("跳转到搜索结果页面");
      }
    },
    login() {
      console.log("登录中...");
      this.isLoggedIn = true; // 设置为已登录状态
      this.username = "用户123"; // 模拟用户名
      this.showLoginModal = false; // 关闭登录模态框
    },
    logout() {
      console.log("退出登录...");
      this.isLoggedIn = false;
      this.isVIP = false;
      this.username = "";
      this.isMenuOpen = false; // 退出登录后关闭菜单
    },
    toggleMenu() {
      console.log("Menu toggled");  // 用于调试
      this.isMenuOpen = !this.isMenuOpen;
    },
    upgradeToVIP() {
      console.log("升级为VIP...");
      this.isVIP = true; // 用户成为VIP
    },
    register() {
      console.log("跳转到注册页面...");
    },
    goHome() {
      this.$router.push({ name: 'HomePage' });
    },
  },
};
</script>

<style scoped>
/* 样式部分 */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
}

.logo {
  font-size: 20px;
  color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-left: 20px;
}

.search-input {
  width: 400px;
  padding: 8px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #6e6e6e;
  color: #ffffff;
}

.search-input::placeholder {
  color: #ffffff;
  font-style: italic;
}

.search-btn {
  margin-left: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

/* 登录模态框样式 */
.login-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明的背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 确保模态框在最上层 */
}

/* 登录模态框内容 */
.login-modal-content {
  position: relative; /* 确保模态框内容区域有相对定位 */
  background-color: white;
  padding: 20px;
  width: 300px;
  border-radius: 8px;
  text-align: center;
}

/* 输入框 */
.input-field {
  width: 75%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 8px;
}

/* 按钮容器 */
.modal-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

/* 登录、注册按钮 */
.login-action-btn {
  padding: 8px 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
}

/* 关闭按钮 */
.close-modal-btn {
  margin-top: 20px;
  cursor: pointer;
  background-color: #ff4d4d; /* 设置红色背景 */
  color: white; /* 设置文字颜色 */
  border: none;
  padding: 5px;
  border-radius: 8px;
  position: absolute;
  top: 10px;
  right: 10px;
}

.close-modal-btn:hover {
  background-color: #e60000; /* 鼠标悬停时的深红色 */
}

.login-btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.welcome-message {
  font-size: 16px;
  color: white;
}

.username {
  cursor: pointer;
  text-decoration: underline;
}

.dropdown-menu {
  position: absolute;
  background-color: white;
  top: 40px;
  right: 0;
  width: 180px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 10;
}

.vip-btn {
  width: 100%;
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
}

.vip-btn.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.logout-btn {
  width: 100%;
  padding: 8px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
