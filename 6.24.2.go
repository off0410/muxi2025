package main

import (
	"fmt"
	"sync"
)

func printLetters(letterChan <-chan struct{}, numChan chan<- struct{}) {
	for i := 0; i < 26; i++ {
		<-letterChan // 等待数字协程完成，接收信号
		fmt.Print(string('A' + i))
		numChan <- struct{}{}
	}
}

func printNumbers(numChan <-chan struct{}, letterChan chan<- struct{}) {
	for i := 1; i <= 26; i++ {
		<-numChan // 等待字母协程完成，接收信号
		fmt.Print(i)
		letterChan <- struct{}{}
	}
}

func main() {
	var wg sync.WaitGroup
	wg.Add(2)

	letterChan := make(chan struct{})
	numChan := make(chan struct{})

	go func() {
		defer wg.Done()
		printLetters(letterChan, numChan)
	}()

	go func() {
		defer wg.Done()
		printNumbers(numChan, letterChan)
	}()

	letterChan <- struct{}{}

	wg.Wait()
	fmt.Println()
}
