package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

const SecretKey = "12345"

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

// JWT 结构体
type Claims struct {
	UserID int `json:"user_id"`
	jwt.StandardClaims
}

var mockUsers = []User{
	{ID: 1, Username: "admin", Password: "admin123"},
	{ID: 2, Username: "user", Password: "user123"},
}

func main() {
	r := gin.Default()

	// 配置跨域中间件
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// 公开路由
	r.POST("/login", loginHandler)
	r.GET("/public", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "公开信息，无需认证"})
	})

	// 需要认证的路由组
	authGroup := r.Group("/")
	authGroup.Use(AuthMiddleware())
	{
		authGroup.GET("/protected", protectedHandler)
		authGroup.GET("/profile", profileHandler)
	}

	r.Run(":8080")
}

// 登录处理
func loginHandler(c *gin.Context) {
	var creds struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&creds); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求格式"})
		return
	}

	// 验证用户凭证（模拟）
	var user *User
	for _, u := range mockUsers {
		if u.Username == creds.Username && u.Password == creds.Password {
			user = &u
			break
		}
	}

	if user == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "用户名或密码错误"})
		return
	}

	// 生成JWT
	token, err := GenerateToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "无法生成令牌"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "登录成功",
		"token":   token,
		"user_id": user.ID,
	})
}

// 生成JWT Token
func GenerateToken(userID int) (string, error) {
	claims := Claims{
		UserID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * time.Hour).Unix(), // 有效期24小时
			Issuer:    "gin-jwt-demo",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(SecretKey))
}

// 认证中间件
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "缺少认证令牌"})
			c.Abort()
			return
		}

		// 解析令牌
		token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("无效的签名方法: %v", token.Header["alg"])
			}
			return []byte(SecretKey), nil
		})

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "无效令牌", "details": err.Error()})
			c.Abort()
			return
		}

		if claims, ok := token.Claims.(*Claims); ok && token.Valid {
			c.Set("user_id", claims.UserID) // 将用户ID存入上下文
			c.Next()
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "无效或过期的令牌"})
			c.Abort()
		}
	}
}

// 受保护的路由处理
func protectedHandler(c *gin.Context) {
	userID, _ := c.Get("user_id")
	c.JSON(http.StatusOK, gin.H{
		"message": "您已通过认证",
		"user_id": userID,
	})
}

// 用户资料路由
func profileHandler(c *gin.Context) {
	userID, _ := c.Get("user_id")

	// 模拟获取用户资料
	profile := gin.H{
		"user_id":  userID,
		"username": fmt.Sprintf("用户%d", userID),
		"email":    fmt.Sprintf("user%d@example.com", userID),
		"role":     "会员用户",
	}

	c.JSON(http.StatusOK, gin.H{"profile": profile})
}
