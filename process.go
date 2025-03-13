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

	tmpFile := fmt.Sprintf("/tmp/temp_%d.%s", FilenameHash(file), string(ext))

	args := append([]string{"-i", file}, flags...)
	args = append(args, "-y", tmpFile)

	if err := exec.Command("ffmpeg", args...).Run(); err != nil {
		return err
	}

	return exec.Command("mv", "-f", tmpFile, file).Run()
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
	case PNG:
		switch quality {
		case HIGH:
			return []string{"-compression_level", "3"}, nil
		case MEDIUM:
			return []string{"-compression_level", "6"}, nil
		case LOW:
			return []string{"-compression_level", "9"}, nil
		}
	case WEBP:
		switch quality {
		case HIGH:
			return []string{}, nil
		case MEDIUM:
			return []string{}, nil
		case LOW:
			return []string{}, nil
		}

	}

	return nil, fmt.Errorf("not implemented yet: %s [%s]", string(format), quality)
}
