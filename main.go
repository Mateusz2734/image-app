package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "image-app",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		OnStartup: app.startup,
		Windows: &windows.Options{
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
			// BackdropType:         windows.Acrylic,
		},
		DragAndDrop: &options.DragAndDrop{
			EnableFileDrop:     true,
			DisableWebViewDrop: true,
			CSSDropProperty:    "--wails-drop-target",
			CSSDropValue:       "drop",
		},
		Bind: []interface{}{
			app,
		},
		EnumBind: []interface{}{
			allFormats,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}

	// Extract test.py from embedded FS
	// data, err := fs.ReadFile(python, "py/test.py")
	// if err != nil {
	// 	fmt.Println("Error reading file:", err)
	// 	return
	// }

	// // Write test.py to a temporary file
	// tmpFile, err := ioutil.TempFile("", "test-*.py")
	// if err != nil {
	// 	fmt.Println("Error creating temp file:", err)
	// 	return
	// }
	// defer os.Remove(tmpFile.Name()) // Cleanup

	// if _, err := tmpFile.Write(data); err != nil {
	// 	fmt.Println("Error writing to temp file:", err)
	// 	return
	// }
	// tmpFile.Close()

	// // Define path to embedded Python
	// pythonPath := "./py/python.exe" // Adjust if needed

	// // Execute test.py using embedded Python
	// cmd := exec.Command(pythonPath, "./py/test.py")

	// // Set PYTHONPATH to include embedded site-packages
	// // cmd.Env = append(os.Environ(), "PYTHONPATH=./Lib/site-packages")

	// output, err := cmd.CombinedOutput()
	// if err != nil {
	// 	fmt.Println("Error executing Python script:", err)
	// }
	// fmt.Println("Python Output:\n", string(output))
}
