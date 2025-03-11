package main

import (
	"path"
	"strings"
)

func ValidateFiles(files []string) (valid []string, invalid []string) {
	invalidFiles := make([]string, 0, len(files))
	validFiles := make([]string, 0, len(files))

	for _, file := range files {
		if ToFormat(path.Ext(file)[1:]) == UNDEFINED {
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
