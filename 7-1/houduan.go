package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Book struct {
	ID     string `json:"id" gorm:"primaryKey"`
	Title  string `json:"title"`
	Author string `json:"author"`
	Stock  int    `json:"stock"`
}

var db *gorm.DB

// 初始化数据库连接
func initDB() {
	var err error
	db, err = gorm.Open(sqlite.Open("books.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// 自动迁移表结构
	db.AutoMigrate(&Book{})
}

// AddBook 添加新书
// @Summary 添加新书
// @Description 添加一本新书到库存
// @Tags 图书管理
// @Accept json
// @Produce json
// @Param book body Book true "图书信息"
// @Success 201 {object} Book "添加成功"
// @Failure 400 {object} object "请求参数错误"
// @Failure 409 {object} object "ID已存在"
// @Router /books [post]
func AddBook(c *gin.Context) {
	var newBook Book
	if err := c.ShouldBindJSON(&newBook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 检查ID是否已存在
	var existingBook Book
	result := db.First(&existingBook, "id = ?", newBook.ID)
	if result.Error == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Book with this ID already exists"})
		return
	}

	// 创建新书
	if result := db.Create(&newBook); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusCreated, newBook)
}

// DeleteBook 删除图书
// @Summary 删除图书
// @Description 根据ID删除图书
// @Tags 图书管理
// @Accept json
// @Produce json
// @Param id path string true "图书ID"
// @Success 200 {object} object "删除成功"
// @Failure 404 {object} object "图书不存在"
// @Router /books/{id} [delete]
func DeleteBook(c *gin.Context) {
	id := c.Param("id")

	// 检查图书是否存在
	var book Book
	result := db.First(&book, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	// 删除图书
	if result := db.Delete(&Book{}, "id = ?", id); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Book deleted successfully"})
}

// UpdateBook 更新图书信息
// @Summary 更新图书
// @Description 更新指定ID的图书信息
// @Tags 图书管理
// @Accept json
// @Produce json
// @Param id path string true "图书ID"
// @Param book body Book true "更新后的图书信息"
// @Success 200 {object} Book "更新成功"
// @Failure 400 {object} object "请求参数错误"
// @Failure 404 {object} object "图书不存在"
// @Router /books/{id} [put]
func UpdateBook(c *gin.Context) {
	id := c.Param("id")

	// 检查图书是否存在
	var existingBook Book
	result := db.First(&existingBook, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	var updatedBook Book
	if err := c.ShouldBindJSON(&updatedBook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 确保ID一致性
	updatedBook.ID = id

	// 更新图书
	if result := db.Save(&updatedBook); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, updatedBook)
}

// GetBookByID 查询单本图书
// @Summary 获取图书详情
// @Description 根据ID获取图书详细信息
// @Tags 图书查询
// @Accept json
// @Produce json
// @Param id path string true "图书ID"
// @Success 200 {object} Book "查询成功"
// @Failure 404 {object} object "图书不存在"
// @Router /books/{id} [get]
func GetBookByID(c *gin.Context) {
	id := c.Param("id")

	var book Book
	result := db.First(&book, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	c.JSON(http.StatusOK, book)
}

// GetAllBooks 获取所有图书
// @Summary 获取图书列表
// @Description 获取库存中所有图书列表
// @Tags 图书查询
// @Accept json
// @Produce json
// @Success 200 {array} Book "查询成功"
// @Router /books [get]
func GetAllBooks(c *gin.Context) {
	var books []Book
	result := db.Find(&books)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, books)
}

// @title 图书管理系统
// @version 1.0
// @description 实现对图书的增删改查的图书管理系统
// @host localhost:8080
// @BasePath /
func main() {
	// 初始化数据库
	initDB()

	r := gin.Default()

	// 初始化示例数据（只在第一次运行时创建）
	var count int64
	db.Model(&Book{}).Count(&count)
	if count == 0 {
		db.Create(&Book{ID: "1", Title: "Go语言编程", Author: "许式伟", Stock: 10})
		db.Create(&Book{ID: "2", Title: "Clean Code", Author: "Robert C. Martin", Stock: 5})
	}

	// 设置路由
	r.POST("/books", AddBook)
	r.DELETE("/books/:id", DeleteBook)
	r.PUT("/books/:id", UpdateBook)
	r.GET("/books/:id", GetBookByID)
	r.GET("/books", GetAllBooks)

	r.Run(":8080")
}
