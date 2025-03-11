package main

import (
	"testing"
)

func TestValidateFiles(t *testing.T) {
	cases := []struct {
		files      []string
		numValid   int
		numInvalid int
	}{
		{[]string{"file.jpg", "file.png", "file.webp"}, 3, 0},
		{[]string{"file.jpeg", "file.gif", "file.gif"}, 3, 0},
		{[]string{"file", "file.txt"}, 0, 2},
		{[]string{"file.bmp", "file.tiff"}, 2, 0},
	}

	for _, c := range cases {
		valid, invalid := ValidateFiles(c.files)
		if len(valid) != c.numValid {
			t.Errorf("Expected %d valid files, got %d", c.numValid, len(valid))
		}
		if len(invalid) != c.numInvalid {
			t.Errorf("Expected %d invalid files, got %d", c.numInvalid, len(invalid))
		}
	}
}

func TestNewExtension(t *testing.T) {
	cases := []struct {
		file   string
		format Format
		result string
	}{
		{"file.txt", JPEG, "file.jpg"},
		{"file.txt", PNG, "file.png"},
		{"file.txt", WEBP, "file.webp"},
		{"file.txt", TIFF, "file.tiff"},
		{"file.txt", GIF, "file.gif"},
		{"file.txt", BMP, "file.bmp"},
		{"file", PNG, "file.png"},
	}

	for _, c := range cases {
		result := NewExtension(c.file, c.format)
		if result != c.result {
			t.Errorf("Expected %s, got %s", c.result, result)
		}
	}
}
