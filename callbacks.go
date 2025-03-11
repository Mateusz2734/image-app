package main

import (
	"context"
	"encoding/json"
	"fmt"
	"sync/atomic"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type ProcessRequest struct {
	Format Format   `json:"format"`
	Files  []string `json:"files"`
}

type CompressRequest struct {
	Quality Quality  `json:"quality"`
	Files   []string `json:"files"`
}

func (a *App) processRequestCallback(optionalData ...interface{}) {
	req, ok := processRequest[ProcessRequest](a.ctx, optionalData...)
	if !ok {
		return
	}

	req.Format = ToFormat(string(req.Format))
	if req.Format == UNDEFINED {
		fmt.Println("Error: invalid format")
		runtime.EventsEmit(a.ctx, "error", "Invalid format.")
		return
	}

	valid, invalid := ValidateFiles(req.Files)
	if len(invalid) > 0 {
		errMsg := fmt.Sprintf("invalid files: %v", invalid)
		fmt.Println(errMsg)
		runtime.EventsEmit(a.ctx, "error", errMsg)
		return
	}

	errCount := a.processFilesConcurrently(valid, func(file string) error {
		return ConvertFile(file, req.Format)
	})

	successCount := len(valid) - errCount
	runtime.EventsEmit(a.ctx, "info", fmt.Sprintf("%d out of %d files compressed successfully.", successCount, len(req.Files)))
}

func (a *App) compressRequestCallback(optionalData ...interface{}) {
	req, ok := processRequest[CompressRequest](a.ctx, optionalData...)
	if !ok {
		return
	}

	req.Quality = ToQuality(string(req.Quality))
	if req.Quality == UNDEFINEDQ {
		fmt.Println("Error: invalid quality")
		runtime.EventsEmit(a.ctx, "error", "Invalid quality.")
		return
	}

	valid, invalid := ValidateFiles(req.Files)
	if len(invalid) > 0 {
		errMsg := fmt.Sprintf("invalid files: %v", invalid)
		fmt.Println(errMsg)
		runtime.EventsEmit(a.ctx, "error", errMsg)
		return
	}

	errCount := a.processFilesConcurrently(valid, func(file string) error {
		return CompressFile(file, req.Quality)
	})

	successCount := len(valid) - errCount
	runtime.EventsEmit(a.ctx, "info", fmt.Sprintf("%d out of %d files compressed successfully.", successCount, len(req.Files)))
}

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

func processRequest[T any](ctx context.Context, optionalData ...interface{}) (T, bool) {
	var result T
	data, err := checkData(optionalData...)
	if err != nil {
		fmt.Println("Error:", err)
		runtime.EventsEmit(ctx, "error", "Internal error.")
		return result, false
	}
	if err := json.Unmarshal([]byte(data), &result); err != nil {
		fmt.Println("Error unmarshalling payload:", err)
		runtime.EventsEmit(ctx, "error", "Internal error.")
		return result, false
	}
	return result, true
}

func (a *App) processFilesConcurrently(files []string, process func(file string) error) int {
	var errCount int32

	a.wg.Wait()
	a.wg.Add(len(files))
	for _, file := range files {
		go func(file string) {
			defer a.wg.Done()
			if err := process(file); err != nil {
				errMsg := fmt.Sprintf("error processing file %s: %v", file, err)
				fmt.Println(errMsg)
				runtime.EventsEmit(a.ctx, "error", errMsg)
				atomic.AddInt32(&errCount, 1)
			}
		}(file)
	}
	a.wg.Wait()
	return int(errCount)
}
