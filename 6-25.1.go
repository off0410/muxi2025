package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func main() {
	// 注册路由处理函数
	http.HandleFunc("/book", bookHandler)
	http.HandleFunc("/comment", commentHandler)

	// 启动服务
	fmt.Println("服务端启动于 http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func bookHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "只支持GET请求", http.StatusMethodNotAllowed)
		return
	}

	// 获取查询书名
	title := r.URL.Query().Get("title")
	if title == "" {
		http.Error(w, "缺少书名参数", http.StatusBadRequest)
		return
	}

	response := fmt.Sprintf("您正在查询图书：《%s》", title)
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(response))
}

func commentHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "只支持POST请求", http.StatusMethodNotAllowed)
		return
	}

	contentType := r.Header.Get("Content-Type")
	if contentType != "application/json" {
		http.Error(w, "只支持JSON格式", http.StatusUnsupportedMediaType)
		return
	}

	type Comment struct {
		User    string `json:"user"`
		Comment string `json:"comment"`
	}

	var c Comment
	err := json.NewDecoder(r.Body).Decode(&c)
	if err != nil {
		http.Error(w, "无效的JSON格式", http.StatusBadRequest)
		return
	}

	if c.User == "" || c.Comment == "" {
		http.Error(w, "缺少必要字段", http.StatusBadRequest)
		return
	}

	response := map[string]string{
		"message": "评论提交成功",
		"user":    c.User,
		"comment": c.Comment,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
