# 构建阶段
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o book-manager

# 运行阶段
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/book-manager .
EXPOSE 8080
CMD ["./book-manager"]