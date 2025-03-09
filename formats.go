package main

type Format string

const (
	JPEG Format = "jpg"
	PNG  Format = "png"
	WEBP Format = "webp"
	TIFF Format = "tiff"
	GIF  Format = "gif"
	BMP  Format = "bmp"
)

var allFormats = []struct {
	Value  Format
	TSName string
}{
	{JPEG, "JPEG"},
	{PNG, "PNG"},
	{TIFF, "TIFF"},
	{WEBP, "WEBP"},
	{GIF, "GIF"},
	{BMP, "BMP"},
}
