import { readInput } from "../utils.ts";

class DistanceCalculator {
  private readonly cache = new Map<string, number>();
  private sorted: [string, string][] = [];

  calculate(a: string, b: string): number {
    const key = this.generateKey(a, b);
    const cached = this.cache.get(key);
    if (cached) {
      return cached;
    }

    const [aX, aY, aZ] = this.getCords(a);
    const [bX, bY, bZ] = this.getCords(b);

    const calculated = Math.sqrt(
      Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2) + Math.pow(aZ - bZ, 2)
    );

    this.cache.set(key, calculated);

    return calculated;
  }

  getLowestDistancesConnections(n: number) {
    this.sort();

    return this.sorted.slice(0, n);
  }

  getNthLowestDistanceConnection(n: number) {
    this.sort();

    return this.sorted[n];
  }

  getCords(str: string): [x: number, y: number, z: number] {
    return str.split(",").map(Number) as [number, number, number];
  }

  private sort() {
    if (this.sorted.length !== this.cache.size) {
      this.sorted = [...this.cache]
        .sort((a, b) => a[1] - b[1])
        .map((entry) => this.splitKey(entry[0]));
    }
  }

  private generateKey(a: string, b: string) {
    return [a, b].sort().join("-");
  }

  private splitKey(key: string): [string, string] {
    return key.split("-") as [string, string];
  }
}

class Circuits {
  circuits: Set<string>[] = [];

  get() {
    return this.circuits;
  }

  addConnections(connections: [string, string][]) {
    const newCircuits = connections.map((connection) => {
      const circuit = new Set<string>();
      circuit.add(connection[0]);
      circuit.add(connection[1]);

      return circuit;
    });

    this.circuits.push(...newCircuits);
    this.groupCircuits();
  }

  private groupCircuits() {
    let merged = false;
    do {
      merged = false;
      for (let i = 0; i <= this.circuits.length - 2; i++) {
        for (let j = i + 1; j <= this.circuits.length - 1; j++) {
          if (this.setOverlaps(this.circuits[i], this.circuits[j])) {
            this.mergeSets(this.circuits[i], this.circuits[j]);
            this.circuits.splice(j, 1);

            merged = true;
          }
        }
      }
    } while (merged);
  }

  private setOverlaps(set1: Set<string>, set2: Set<string>): boolean {
    for (const el of set1) {
      if (set2.has(el)) {
        return true;
      }
    }

    return false;
  }

  private mergeSets(set1: Set<string>, set2: Set<string>) {
    for (const el of set2) {
      set1.add(el);
    }
  }
}

function calculateAllDistances(
  input: string[],
  distanceCalculator: DistanceCalculator
) {
  for (let i = 0; i <= input.length - 1; i++) {
    for (let j = i + 1; j <= input.length - 1; j++) {
      if (input[i] === input[j]) {
        continue;
      }

      distanceCalculator.calculate(input[i], input[j]);
    }
  }

  return distanceCalculator;
}

export function part1(filename: string, maxConnections: number) {
  const input = readInput(filename);
  const distanceCalculator = new DistanceCalculator();
  calculateAllDistances(input, distanceCalculator);

  const connections =
    distanceCalculator.getLowestDistancesConnections(maxConnections);

  const circuits = new Circuits();
  circuits.addConnections(connections);

  return circuits
    .get()
    .sort((a, b) => b.size - a.size)
    .slice(0, 3)
    .reduce((acc, c) => acc * c.size, 1);
}

export function part2(filename: string) {
  const input = readInput(filename);
  const distanceCalculator = new DistanceCalculator();
  calculateAllDistances(input, distanceCalculator);

  const circuits = new Circuits();
  const minimumConnections = input.length - 1;
  let initialConnections = distanceCalculator.getLowestDistancesConnections(
    input.length - 1
  );
  circuits.addConnections(initialConnections);

  let currentConnections = minimumConnections;
  while (true) {
    currentConnections++;

    const lastConnection =
      distanceCalculator.getNthLowestDistanceConnection(currentConnections);
    circuits.addConnections([lastConnection]);

    if (
      circuits.get().length === 1 &&
      circuits.get()[0].size === input.length
    ) {
      const [a, b] = lastConnection;
      const [aX] = distanceCalculator.getCords(a);
      const [bX] = distanceCalculator.getCords(b);

      return +aX * +bX;
    }
  }
}
