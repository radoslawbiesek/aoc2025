import { readInput } from "../utils.ts";

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static fromString(str: string) {
    const [x, y] = str.split(",").map(Number);

    return new Point(x, y);
  }
}

class Line {
  start: Point;
  end: Point;

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }

  get isVertical() {
    return this.start.y === this.end.y;
  }

  containsPoint(point: Point) {
    return (
      point.x >= Math.min(this.start.x, this.end.x) &&
      point.x <= Math.max(this.start.x, this.end.x) &&
      point.y >= Math.min(this.start.y, this.end.y) &&
      point.y <= Math.max(this.start.y, this.end.y)
    );
  }
}

class Rectangle {
  readonly corner1: Point;
  readonly corner2: Point;

  public readonly area: number;

  constructor(corner1: Point, corner2: Point) {
    this.corner1 = corner1;
    this.corner2 = corner2;

    this.area = this.calculateArea(corner1, corner2);
  }

  private calculateArea(corner1: Point, corner2: Point) {
    return (
      (Math.abs(corner1.x - corner2.x) + 1) *
      (Math.abs(corner1.y - corner2.y) + 1)
    );
  }

  *getPerimeterPoints() {
    const [minX, maxX] = [this.corner1.x, this.corner2.x].sort((a, b) => a - b);
    const [minY, maxY] = [this.corner1.y, this.corner2.y].sort((a, b) => a - b);

    yield this.corner1;
    yield this.corner2;
    yield new Point(this.corner1.x, this.corner2.y);
    yield new Point(this.corner2.x, this.corner1.y);

    for (let x = minX + 1; x <= maxX - 1; x++) {
      yield new Point(x, minY);
      yield new Point(x, maxY);
    }

    for (let y = minY + 1; y <= maxY - 1; y++) {
      yield new Point(minX, y);
      yield new Point(maxX, y);
    }
  }
}

class Polygon {
  readonly points: Point[];
  readonly lines: Line[];

  constructor(points: Point[]) {
    this.points = points;
    this.lines = this.getLines(points);
  }

  private getLines(points: Point[]): Line[] {
    const lines: Line[] = [];

    for (let i = 0; i <= points.length - 2; i++) {
      lines.push(new Line(points[i], points[i + 1]));
    }
    lines.push(new Line(points.at(-1)!, points[0]));

    return lines;
  }

  isInside(point: Point): boolean {
    let intersections = 0;
    for (const line of this.lines) {
      if (line.containsPoint(point)) {
        return true;
      }

      if (
        line.isVertical &&
        point.y < line.start.y &&
        point.x <= Math.max(line.start.x, line.end.x) &&
        point.x > Math.min(line.start.x, line.end.x)
      ) {
        intersections++;
      }
    }

    return intersections % 2 !== 0;
  }
}

export function part1(filename: string) {
  const input = readInput(filename);
  const redPoints = input.map(Point.fromString);

  let maxArea = 0;
  for (let i = 0; i <= redPoints.length - 2; i++) {
    for (let j = i + 1; j <= redPoints.length - 1; j++) {
      const rectangle = new Rectangle(redPoints[i], redPoints[j]);
      if (rectangle.area > maxArea) {
        maxArea = rectangle.area;
      }
    }
  }

  return maxArea;
}

export function part2(filename: string) {
  const input = readInput(filename);
  const redPoints = input.map(Point.fromString);
  const polygon = new Polygon(redPoints);

  let maxArea = 0;
  for (let i = 0; i <= redPoints.length - 2; i++) {
    for (let j = i + 1; j <= redPoints.length - 1; j++) {
      const rectangle = new Rectangle(redPoints[i], redPoints[j]);

      if (rectangle.area < maxArea) {
        continue;
      }

      let isInside = true;
      for (const point of rectangle.getPerimeterPoints()) {
        const isPointInside = polygon.isInside(point);

        if (!isPointInside) {
          isInside = false;
          break;
        }
      }
      if (isInside) {
        maxArea = rectangle.area;
      }
    }
  }

  return maxArea;
}
