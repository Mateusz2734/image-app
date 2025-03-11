package main

import "path"

func ValidateFiles(files []string) (valid []string, invalid []string) {
	invalidFiles := make([]string, 0, len(files))
	validFiles := make([]string, 0, len(files))

	for _, file := range files {
		if ToFormat(path.Ext(file)[1:]) == UNDEFINED {
			invalidFiles = append(invalidFiles, file)
		}
	}

	return validFiles, invalidFiles
}
