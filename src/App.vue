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
            @click="showLoginModal = true; currentForm = 'login'"
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

    <!-- 弹出登录或注册界面 -->
    <div v-if="showLoginModal" class="login-modal">
      <div class="login-modal-content">
        <h3>{{ currentForm === 'login' ? '登录' : '注册' }}</h3>

        <!-- 登录表单 -->
        <div v-if="currentForm === 'login'">
          <input
              v-model="email"
              type="email"
              placeholder="邮箱"
              class="input-field"
          />
          <input
              v-model="password"
              type="password"
              placeholder="密码"
              class="input-field"
          />
          <button @click="login" class="login-action-btn">登录</button>
          <p>
            没有账号？ <span @click="switchToRegister" class="switch-btn">注册</span>
          </p>
        </div>

        <!-- 注册表单 -->
        <div v-if="currentForm === 'register'">
          <input
              v-model="username"
              type="text"
              placeholder="昵称"
              class="input-field"
          />
          <input
              v-model="email"
              type="email"
              placeholder="邮箱"
              class="input-field"
          />
          <input
              v-model="password"
              type="password"
              placeholder="密码"
              class="input-field"
          />
          <button @click="register" class="login-action-btn">注册</button>
          <p>
            已有账号？ <span @click="switchToLogin" class="switch-btn">登录</span>
          </p>
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
import axios from 'axios'; // 引入 axios

export default {
  data() {
    return {
      searchQuery: "",  // 搜索框绑定的内容
      showLoginModal: false, // 控制登录模态框显示
      currentForm: 'login', // 控制当前表单是登录还是注册
      username: "",  // 用户名（注册时使用）
      email: "",     // 邮箱
      password: "",  // 密码
      isLoggedIn: false, // 用户登录状态
      isVIP: false,      // 用户VIP状态
      isMenuOpen: false, // 控制下拉菜单是否展开
      accessToken: "",   // 存储JWT访问令牌
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
        this.$router.push({name: 'SearchResult', query: {query: this.searchQuery}});
        console.log("跳转到搜索结果页面");
      }
    },
    async login() {
      console.log("登录中...");
      if (!this.email || !this.password) {
        alert("请输入邮箱和密码！");
        return;
      }

      try {
        // 发送登录请求
        const response = await axios.post('http://127.0.0.1:5000/user/login', {
          email: this.email,
          password: this.password

        })
        if (response.status === 200) {
          // 获取到 token 并保存
          this.isLoggedIn = true;
          this.username = "用户123"; // 模拟用户名
          this.showLoginModal = false;
          this.accessToken = response.data.access_token;
          localStorage.setItem('access_token', this.accessToken);  // 存储在浏览器的 localStorage 中
          console.log("Token:", this.accessToken)
          console.log("token:", localStorage.getItem("access_token"));
          this.isLoggedIn = true;
          this.username = "用户123"; // 模拟用户名，实际应该根据登录返回值设置
          this.showLoginModal = false;
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            alert("无效的邮箱或密码！");
          } else if (error.response.status === 400) {
            alert("缺少必要字段！");
          }
        } else {
          alert("发生错误，请稍后再试！");
        }
      }
      // this.isLoggedIn = true;
      // this.username = "用户123"; // 模拟用户名
      // this.showLoginModal = false;
    },
    logout() {
      console.log("退出登录...");
      this.isLoggedIn = false;
      this.isVIP = false;
      this.username = "";
      this.isMenuOpen = false; // 退出登录后关闭菜单
    },
    toggleMenu() {
      console.log("Menu toggled");
      this.isMenuOpen = !this.isMenuOpen;
    },
    async upgradeToVIP() {
      console.log("升级为VIP...");
      try {
        const response = await axios.post ('http://127.0.0.1:5000/user/upgrade_vip',{}) ;
        if (response.status === 200) {
          console.log("升级成功：");
        }
      }catch(error) {
        alert("发生错误，请稍后再试！");
      }
      this.isVIP = true; // 用户成为VIP
    },
    async register() {
      console.log("注册中...");
      if (!this.username || !this.email || !this.password) {
        alert("请填写完整的注册信息！");
        return;
      }

      try {
        const response = await axios.post('http://127.0.0.1:5000/user/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        if (response.status === 201) {
          console.log("注册成功：", response.data.message);
          alert("注册成功！");
          this.showLoginModal = false;
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            alert("缺少必要字段，请检查输入！");
          } else if (error.response.status === 409) {
            alert("用户名或邮箱已存在！");
          }
        } else {
          alert("发生错误，请稍后再试！");
        }
      }
    },
    switchToRegister() {
      this.currentForm = 'register';
    },
    switchToLogin() {
      this.currentForm = 'login';
    },
    goHome() {
      this.$router.push({name: 'HomePage'});
    },
  },
};
</script>

<style scoped>
/* 样式部分与之前保持一致，以下为简化版 */
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
  border: 1px solid #ccc;
}
/* 登录按钮样式 */
.login-btn {
  padding: 8px 16px; /* 与搜索按钮一致的内边距 */
  background-color: #007bff; /* 与搜索按钮一致的背景颜色 */
  color: white; /* 文字颜色 */
  border: none;
  border-radius: 8px; /* 圆角 */
  cursor: pointer;
}
.login-action-btn {
  width: 80%;
  padding: 10px;
  margin-top: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.switch-btn {
  color: #007bff;
  cursor: pointer;
}

.close-modal-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

</style>