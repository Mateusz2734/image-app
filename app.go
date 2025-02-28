package main

import (
	"context"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func FileProcessingRequestListener(ctx context.Context) {
	runtime.EventsOn(ctx, "process-request", func(optionalData ...interface{}) {
		if len(optionalData) != 1 {
			return
		}

		if slice, ok := optionalData[0].([]interface{}); ok {
			var strSlice []string
			for _, v := range slice {
				if str, ok := v.(string); ok {
					strSlice = append(strSlice, str)
				} else {
					fmt.Println("Element is not a string")
					return
				}
			}
			fmt.Println("It's a []string:", strSlice)
			return
		}

		if s, ok := optionalData[0].([]string); ok {
			fmt.Println("It's a []string:", s)
		} else {
			fmt.Println("Not a []string")
		}
	})
}

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx

	FileProcessingRequestListener(ctx)
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
