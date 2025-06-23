// 练习一：n以内所有质数
package main

import "fmt"

func Prime(n int) []int {
	var primes []int
	for i := 2; i <= n; i++ {
		for j := 2; j <= i; j++ {
			if i == j {
				fmt.Println("%d", i)
			}
			if i%j == 0 {
				break
			}
		}
	}
	return primes
}

func main() {
	var n int
	fmt.Scan(&n)
	Prime(n)
}
