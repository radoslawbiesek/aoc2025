import { readInput } from "../utils.ts";

type Graph = Record<string, string[]>;

function getGraph(filename: string): Graph {
  const input = readInput(filename);
  const graph: Graph = {};

  for (const line of input) {
    const [node, edgesString] = line.split(": ");

    const edges = edgesString.split(" ").filter((v) => v.length > 0);

    graph[node] = edges;
  }

  return graph;
}

function dfs(
  path: string[],
  end: string,
  graph: Graph,
  seen: Map<string, number>
) {
  const current = path[path.length - 1];
  if (current === end) {
    return 1;
  }

  const seenEdge = seen.get(current);
  if (typeof seenEdge !== "undefined") {
    return seenEdge;
  }

  const edges = graph[current];
  if (!edges) {
    return 0;
  }

  let total = 0;
  for (const edge of edges) {
    path.push(edge);
    const result = dfs(path, end, graph, seen);
    path.pop();

    seen.set(edge, result);

    total += result;
  }

  return total;
}

export function part1(filename: string) {
  const start = "you";
  const end = "out";
  const graph = getGraph(filename);

  return dfs([start], end, graph, new Map<string, number>());
}

function calculatePath(path: string[], filename: string) {
  let total = 1;
  for (let i = 0; i <= path.length - 2; i++) {
    const start = path[i];
    const end = path[i + 1];

    const graph = getGraph(filename);

    const result = dfs([start], end, graph, new Map<string, number>());
    console.log(start, "->", end, ":", result);

    total = total * result;
  }

  return total;
}

export function part2(filename: string) {
  const graph = getGraph(filename);
  return (
    calculatePath(["svr", "fft", "dac", "out"], filename) +
    calculatePath(["svr", "dac", "fft", "out"], filename)
  );
}
