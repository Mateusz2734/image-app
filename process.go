package main

import (
	"fmt"
	"os/exec"
)

func CompressFile(file string, quality Quality) error {
	fmt.Println(file, quality)
	return nil
}

func ConvertFile(file string, format Format) error {
	return exec.Command("ffmpeg", "-i", file, "-y", NewExtension(file, format)).Run()
}
