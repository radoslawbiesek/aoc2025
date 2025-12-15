package main

import (
	"fmt"
	"os"
	"strings"
)

type Graph map[string][]string

func getLines() []string {
	if len(os.Args) < 2 {
		panic("Filename is required")
	}
	path := os.Args[1]

	data, err := os.ReadFile(path)

	if err != nil {
		panic(err)
	}

	content := string(data)
	lines := strings.Split(content, "\n")

	return lines
}

func getGraph() *Graph {
	graph := Graph{}
	lineStrings := getLines()
	for _, lineStr := range lineStrings {
		parts := strings.Split(lineStr, ": ")

		vertex := parts[0]
		edges := strings.Split(parts[1], " ")

		graph[vertex] = edges
	}

	return &graph
}

func dfs(path []string, end string, graph *Graph, seen map[string]int) int {
	current := path[len(path)-1]
	if current == end {
		return 1
	}

	seenEdge, ok := seen[current]
	if ok == true {
		return seenEdge
	}

	edges := (*graph)[current]
	if len(edges) == 0 {
		return 0
	}

	total := 0
	for _, edge := range edges {
		result := dfs(append(path, edge), end, graph, seen)

		seen[edge] = result

		total += result
	}

	return total
}

func calculatePath(path []string, graph *Graph) int {
	total := 1
	for i := 0; i <= len(path)-2; i++ {
		start := path[i]
		end := path[i+1]

		result := dfs([]string{start}, end, graph, make(map[string]int))
		fmt.Println(start, "->", end, ":", result)

		total = total * result
	}

	return total
}

func main() {
	graph := getGraph()

	total := calculatePath([]string{"svr", "fft", "dac", "out"}, graph) + calculatePath([]string{"svr", "dac", "fft", "out"}, graph)

	fmt.Println(total)
}
