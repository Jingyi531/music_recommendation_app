const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "../frontend/index.html"), "utf8");

describe("Recipe App UI", () => {
  let dom, document;

  beforeEach(() => {
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  it("should have input fields for query, diet, and ingredients", () => {
    const queryInput = document.getElementById("query");
    const dietInput = document.getElementById("diet");
    const ingredientsInput = document.getElementById("ingredients");
    expect(queryInput).not.toBeNull();
    expect(dietInput).not.toBeNull();
    expect(ingredientsInput).not.toBeNull();
  });

  it("should have a search button", () => {
    const button = document.querySelector("button");
    expect(button.textContent).toBe("Search");
  });
});