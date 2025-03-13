package main

import (
	"hash/fnv"
	"path"
	"strings"
)

func ValidateFiles(files []string) (valid []string, invalid []string) {
	invalidFiles := make([]string, 0, len(files))
	validFiles := make([]string, 0, len(files))

	for _, file := range files {
		ext := path.Ext(file)

		if ext == "" {
			invalidFiles = append(invalidFiles, file)
		} else if ToFormat(ext[1:]) == UNDEFINED {
			invalidFiles = append(invalidFiles, file)
		} else {
			validFiles = append(validFiles, file)
		}
	}

	return validFiles, invalidFiles
}

func NewExtension(file string, format Format) string {
	return strings.TrimSuffix(file, path.Ext(file)) + "." + string(format)
}

func FilenameHash(s string) uint32 {
	h := fnv.New32a()
	h.Write([]byte(s))
	return h.Sum32()
}
