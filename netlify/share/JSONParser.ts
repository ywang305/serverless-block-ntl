export class JSONParser {
  static parse(str: string): Object {
    try {
      const obj = JSON.parse(str);
      if (obj && typeof obj === "object") {
        return obj;
      }
    } catch (e) {}
    return null;
  }
}
