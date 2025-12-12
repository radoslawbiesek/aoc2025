import { existsSync, mkdirSync, writeFileSync } from "fs";

import { readInput } from "../utils.ts";

type Graph = Record<string, string[]>;

function removeEdge(graph: Graph, edge: string, replaceBy?: string) {
  for (const edges of Object.values(graph)) {
    const idx = edges.findIndex((v) => v === edge);
    if (idx > -1) {
      if (replaceBy) {
        // duplicates are leaved intentionally
        edges[idx] = replaceBy;
      } else {
        edges.splice(idx, 1);
      }
    }
  }
}

function removeNode(graph: Graph, node: string, replaceBy?: string) {
  delete graph[node];

  removeEdge(graph, node, replaceBy);
}

function replaceOneWayNodes(graph: Graph, start: string, end: string) {
  let replacedCount = 0;

  let replaced = false;
  do {
    replaced = false;
    for (const [node, edges] of Object.entries(graph)) {
      if (edges.length === 1 && node !== start && node !== end) {
        removeNode(graph, node, edges[0]);
        replaced = true;
        replacedCount++;
      }
    }
  } while (replaced);

  return replacedCount;
}

function removeUnusedEnds(graph: Graph, start: string, end: string) {
  let removedCount = 0;

  let removed = false;
  do {
    let removed = false;
    const nodes = new Set(Object.keys(graph));
    const edges = new Set(Object.values(graph).flat());

    for (const edge of edges) {
      if (!nodes.has(edge) && edge !== end) {
        removeEdge(graph, edge);
        removed = true;
        removedCount++;
        break;
      }
    }
  } while (removed);

  return removedCount;
}

function clearGraph(graph: Graph, start: string, end: string) {
  let replacedCount = 0;
  let removedCount = 0;

  do {
    replacedCount = replaceOneWayNodes(graph, start, end);
    removedCount = removeUnusedEnds(graph, start, end);
  } while (replacedCount > 0 || removedCount > 0);
}

function printGraph(graph: Graph, start: string, end: string) {
  if (!existsSync("graphs")) {
    mkdirSync("graphs");
  }

  writeFileSync(
    `graphs/graph-${start}-${end}-${Date.now()}-${Math.random()}`,
    Object.keys(graph)
      .map((key) => `${key}: ${graph[key].join(",")}`)
      .join("\n")
  );
}

function getDevicesGraph(filename: string, start: string, end: string): Graph {
  const input = readInput(filename);
  const graph: Graph = {};

  for (const line of input) {
    const [node, edgesString] = line.split(":");

    const edges = edgesString.split(" ").filter((v) => v.length > 0);

    graph[node] = edges;
  }

  printGraph(graph, start, end);

  clearGraph(graph, start, end);

  printGraph(graph, start, end);

  return graph;
}

function dfs(
  path: string[],
  end: string,
  graph: Graph,
  cache: Map<string, number> = new Map()
) {
  const current = path.at(-1)!;
  if (current === end) {
    return 1;
  }

  const outputs = graph[current];
  if (!outputs) {
    return 0;
  }

  let total = 0;
  for (const output of outputs) {
    if (path.includes(output)) {
      continue;
    }

    const cached = cache.get(output);
    if (cached) {
      total += cached;
      continue;
    }

    path.push(output);

    const result = dfs(path, end, graph, cache);
    cache.set(output, result);
    total += result;

    path.pop();
  }

  return total;
}

export function part1(filename: string) {
  const start = "you";
  const end = "out";
  const graph = getDevicesGraph(filename, start, end);

  return dfs([start], end, graph);
}

function calculatePath(filename: string, path: string[]) {
  let total = 1;

  for (let i = 0; i <= path.length - 2; i++) {
    const start = path[i];
    const end = path[i + 1];

    const result = dfs([start], end, getDevicesGraph(filename, start, end));

    console.log(start, "->", end, ":", result);

    total = total * result;
  }

  return total;
}

export function part2(filename: string) {
  return (
    calculatePath(filename, ["svr", "fft", "dac", "out"]) +
    calculatePath(filename, ["svr", "dac", "fft", "out"])
  );
}
