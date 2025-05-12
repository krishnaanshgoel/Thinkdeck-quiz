.PHONY: build run test clean

build:
    go build -o bin/server cmd/main/main.go

run:
    go run cmd/main/main.go

test:
    go test ./...

clean:
    rm -rf bin/

deps:
    go mod tidy

lint:
    golangci-lint run

migrate:
    go run cmd/main/main.go migrate
