package main

type Format string

const (
	UNDEFINED Format = ""
	JPEG      Format = "jpg"
	PNG       Format = "png"
	WEBP      Format = "webp"
	TIFF      Format = "tiff"
	GIF       Format = "gif"
	BMP       Format = "bmp"
)

func ToFormat(formatStr string) Format {
	switch formatStr {
	case "jpg", "jpeg", "JPEG", "JPG":
		return JPEG
	case "png", "PNG":
		return PNG
	case "webp", "WEBP":
		return WEBP
	case "tiff", "TIFF":
		return TIFF
	case "gif", "GIF":
		return GIF
	case "bmp", "BMP":
		return BMP
	default:
		return UNDEFINED
	}
}

var allFormats = []struct {
	Value  Format
	TSName string
}{
	{UNDEFINED, "undefined"},
	{JPEG, "JPEG"},
	{PNG, "PNG"},
	{TIFF, "TIFF"},
	{WEBP, "WEBP"},
	{GIF, "GIF"},
	{BMP, "BMP"},
}

type Quality string

const (
	UNDEFINEDQ Quality = ""
	LOW        Quality = "low"
	MEDIUM     Quality = "medium"
	HIGH       Quality = "high"
)

func ToQuality(qualityStr string) Quality {
	switch qualityStr {
	case "low", "LOW":
		return LOW
	case "medium", "MEDIUM":
		return MEDIUM
	case "high", "HIGH":
		return HIGH
	default:
		return UNDEFINEDQ
	}
}

var allQualities = []struct {
	Value  Quality
	TSName string
}{
	{UNDEFINEDQ, "undefined"},
	{LOW, "LOW"},
	{MEDIUM, "MEDIUM"},
	{HIGH, "HIGH"},
}
