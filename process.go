package main

import (
	"fmt"
	"os/exec"
	"path"
)

func CompressFile(file string, quality Quality) error {
	ext := ToFormat(path.Ext(file)[1:])

	flags, err := getFlags(ext, quality)
	if err != nil {
		return err
	}

	args := append([]string{"-i", file}, flags...)
	args = append(args, "-y", NewExtension(file, ext))

	fmt.Println(args)
	return exec.Command("ffmpeg", args...).Run()
}

func ConvertFile(file string, format Format) error {
	return exec.Command("ffmpeg", "-i", file, "-y", NewExtension(file, format)).Run()
}

func getFlags(format Format, quality Quality) ([]string, error) {
	switch format {
	case BMP:
		return nil, fmt.Errorf("not possible to compress BMP files")
	case JPEG:
		switch quality {
		case HIGH:
			return []string{"-q:v", "5"}, nil
		case MEDIUM:
			return []string{"-q:v", "15"}, nil
		case LOW:
			return []string{"-q:v", "30"}, nil
		}
	}

	return nil, fmt.Errorf("not implemented yet: %s [%s]", string(format), quality)
}
