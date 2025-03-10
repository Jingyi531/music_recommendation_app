async function searchRecipes() {
    const query = document.getElementById("query").value;
    const diet = document.getElementById("diet").value;
    const ingredients = document.getElementById("ingredients").value;
    const maxReadyTime = document.getElementById("maxReadyTime").value;
  
    if (!query || !diet || !ingredients) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const response = await fetch(
      `http://localhost:9000/api/recipes/complexSearch?query=${query}&diet=${diet}&includeIngredients=${ingredients}&maxReadyTime=${maxReadyTime}`
    );
    const recipes = await response.json();
  
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = recipes
      .map(
        (recipe) => `
        <div class="recipe">
          <h2>${recipe.title}</h2>
          <img src="${recipe.image}" alt="${recipe.title}" width="200">
        </div>
      `
      )
      .join("");
  }