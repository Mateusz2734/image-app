package main

type Format string

const (
	JPEG   Format = "jpg"
	EBP    Format = "ebp"
	PNG    Format = "png"
	TIFF   Format = "tiff"
	GIF    Format = "gif"
	PDF    Format = "pdf"
	SVG    Format = "svg"
	MAGICK Format = "magick"
	HEIF   Format = "heif"
	AVIF   Format = "avif"
)

var allFormats = []struct {
	Value  Format
	TSName string
}{
	{JPEG, "JPEG"},
	{EBP, "EBP"},
	{PNG, "PNG"},
	{TIFF, "TIFF"},
	{GIF, "GIF"},
	{PDF, "PDF"},
	{SVG, "SVG"},
	{MAGICK, "MAGICK"},
	{HEIF, "HEIF"},
	{AVIF, "AVIF"},
}
