package main

import "fmt"

func CompressFile(file string, quality Quality) error {
	fmt.Println(file, quality)
	return nil
}

func ConvertFile(file string, format Format) error {
	fmt.Println(file, format)
	return nil
}
