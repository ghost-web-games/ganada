/**
 * Vector.js v1.0.0
 * @author Anurag Hazra
 * @borrows p5.Vector
 * @param {number} x 
 * @param {number} y 
 */

export default class Vector {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x || 0;
    this.y = y || 0;
  }
  static dist(v1: Vector, v2: Vector) {
    return v1.dist(v2);
  }
  static distSq = function (v1: Vector, v2: Vector) {
    return v1.distSq(v2);
  }
  static sub = function (v1: Vector, v2: Vector) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  };
  static add = function (v1: Vector, v2: Vector) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  };
  static fromAngle = function (angle: number) {
    let v = new Vector(0, 0);
    v.x = Math.cos(angle);
    v.y = Math.sin(angle);
    return v;
  }
  static random2D = function (v: Vector) {
    return Vector.fromAngle(Math.random() * Math.PI * 180);
  }
  public add(x: any, y: any): Vector {
    if (arguments.length === 1) {
      this.x += x.x;
      this.y += x.y;
    } else if (arguments.length === 2) {
      this.x += x;
      this.y += y;
    }
    return this;
  }
  public sub(x: any, y: any) {
    if (arguments.length === 1) {
      this.x -= x.x;
      this.y -= x.y;
    } else if (arguments.length === 2) {
      this.x -= x;
      this.y -= y;
    }
    return this;
  }
  public mult(v: any) {
    if (typeof v === 'number') {
      this.x *= v;
      this.y *= v;
    } else {
      this.x *= v.x;
      this.y *= v.y;
    }
    return this;
  }
  public div(v: any) {
    if (typeof v === 'number') {
      this.x /= v;
      this.y /= v;
    } else {
      this.x /= v.x;
      this.y /= v.y;
    }
    return this;
  }
  public setAngle(angle: number) {
    var len = this.mag();
    this.x = Math.cos(angle) * len;
    this.y = Math.sin(angle) * len;
  }
  public mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  public magSq() {
    return (this.x * this.x + this.y * this.y);
  }
  public setXY(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }
  public setMag(value: number) {
    this.normalize();
    this.mult(value);
    return this;
  }
  public normalize() {
    let m = this.mag();
    if (m > 0) {
      this.div(m);
    }
    return this;
  }
  public limit(max: number) {
    if (this.mag() > max) {
      this.normalize();
      this.mult(max);
    }
    return this;
  }
  public heading() {
    return (-Math.atan2(-this.y, this.x));
  }
  public dist(v: Vector) {
    let dx = this.x - v.x;
    let dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  public distSq(v: Vector) {
    let dx = this.x - v.x;
    let dy = this.y - v.y;
    return (dx * dx + dy * dy);
  }
  public copy() {
    return new Vector(this.x, this.y);
  }
  public negative() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
  public array() {
    return [this.x, this.y];
  }
  public toString() {
    return "[" + this.x + ", " + this.y + "]";
  }
  public project(v: Vector) {
    var coeff = ((this.x * v.x) + (this.y * v.y)) / ((v.x * v.x) + (v.y * v.y));
    this.x = coeff * v.x;
    this.y = coeff * v.y;
    return this;
  }
  public rotate(a: number) {
    var b = this.heading() + a;
    var c = this.mag();
    this.x = Math.cos(b) * c;
    this.y = Math.sin(b) * c;
  }
}

