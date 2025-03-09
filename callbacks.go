package main

import (
	"encoding/json"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func checkData(optionalData ...interface{}) (string, error) {
	if len(optionalData) != 1 {
		return "", fmt.Errorf("expected exactly one argument")
	}

	data, ok := optionalData[0].(string)
	if !ok {
		return "", fmt.Errorf("expected a string as input")
	}

	return data, nil
}

func (a *App) processRequestCallback(optionalData ...interface{}) {
	data, err := checkData(optionalData...)
	if err != nil {
		fmt.Println("Error:", err)
		runtime.EventsEmit(a.ctx, "error", "Internal error.")
		return
	}

	var req []string
	if err := json.Unmarshal([]byte(data), &req); err != nil {
		fmt.Println("Error unmarshalling payload:", err)
		runtime.EventsEmit(a.ctx, "error", "Internal error.")
		return
	}

	fmt.Printf("Payload: %+v\n", req)
	// TODO implement image processing
}

type CompressRequest struct {
	Quality int      `json:"quality"`
	Files   []string `json:"files"`
}

func (a *App) compressRequestCallback(optionalData ...interface{}) {
	data, err := checkData(optionalData...)
	if err != nil {
		fmt.Println("Error:", err)
		runtime.EventsEmit(a.ctx, "error", "Internal error.")
		return
	}

	var req CompressRequest
	if err := json.Unmarshal([]byte(data), &req); err != nil {
		fmt.Println("Error unmarshalling payload:", err)
		runtime.EventsEmit(a.ctx, "error", "Internal error.")
		return
	}

	fmt.Printf("Payload: %+v\n", req)
	// TODO implement image compression
}
