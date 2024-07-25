function category() {
  document.getElementById("display2").style.display = "none";
  document.getElementById("display3").style.display = "none";
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let dis = document.getElementById("display");
      dis.innerHTML = "";
      data.categories.forEach((element) => {
        let new_div = document.createElement("div");
        new_div.className = "recipe";

        let new_img = document.createElement("img");
        new_img.src = element.strCategoryThumb;

        let new_txt = document.createElement("h1");
        new_txt.className = "category-title";
        new_txt.innerHTML = element.strCategory;

        let new_txt2 = document.createElement("h3");
        new_txt2.className = "category-description";
        new_txt2.innerHTML = element.strCategoryDescription;

        let new_btn = document.createElement("button");
        new_btn.className = "get-meal-btn";
        new_btn.innerHTML = "Get Meals";
        new_btn.dataset.category = element.strCategory;

        new_btn.addEventListener("click", () => {
          meal(element.strCategory);
        });

        new_div.append(new_img);
        new_div.append(new_txt);
        new_div.append(new_txt2);
        new_div.append(new_btn);
        dis.append(new_div);

        dis.style.display = "grid";
        dis.style.gridTemplateColumns = "1fr 1fr 1fr";
        dis.style.rowGap = "30px";
        dis.style.columnGap = "30px";
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
category();

function meal(cate) {
  const url2 = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
    cate
  )}`;
  document.getElementById("display").style.display = "none";
  document.getElementById("display3").style.display = "none";
  let dis = document.getElementById("display2");
  dis.innerHTML = "";

  fetch(url2)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.meals.forEach((element) => {
        let new_div = document.createElement("div");
        new_div.className = "meal";

        let new_img = document.createElement("img");
        new_img.src = element.strMealThumb;

        let new_txt = document.createElement("h1");
        new_txt.className = "Meal-title";
        new_txt.innerHTML = element.strMeal;

        let new_btn = document.createElement("button");
        new_btn.className = "get-recipe-btn";
        new_btn.innerHTML = "Get Recipes";
        new_btn.dataset.category = element.strMeal;

        new_btn.addEventListener("click", () => {
          recipe(element.idMeal);
        });

        new_div.append(new_img);
        new_div.append(new_txt);
        new_div.append(new_btn);
        dis.append(new_div);

        dis.style.display = "grid";
        dis.style.gridTemplateColumns = "1fr 1fr 1fr";
        dis.style.rowGap = "30px";
        dis.style.columnGap = "30px";
      });

      let new_btn2 = document.createElement("button");
      new_btn2.className = "back-btn";
      new_btn2.innerHTML = "Back to Categories";
      new_btn2.addEventListener("click", () => {
        category();
      });
      dis.append(new_btn2);

      dis.style.display = "grid";
    })
    .catch((error) => {
      console.log(error);
    });
}

function recipe(meal_id) {
  document.getElementById("display2").style.display = "none";
  const url3 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
    meal_id
  )}`;

  fetch(url3)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let obj = data.meals[0];
      let dis = document.getElementById("display3");
      dis.innerHTML = "";

      let heading = document.createElement("h1");
      let div0 = document.createElement("div");
      let div1 = document.createElement("div");
      let div2 = document.createElement("div");

      heading.textContent = `${obj.strMeal}`;

      for (let i = 1; i <= 20; i++) {
        let ingredient = obj[`strIngredient${i}`];
        let measure = obj[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
          let ingredientTxt = document.createElement("h3");
          ingredientTxt.textContent = `Ingredient ${i}: ${ingredient}`;
          div1.append(ingredientTxt);
        }

        if (measure && measure.trim() !== "") {
          let measureTxt = document.createElement("h3");
          measureTxt.textContent = `Ingredient Measure ${i}: ${measure}`;
          div2.append(measureTxt);
        }
      }

      div0.append(div1);
      div0.append(div2);
      dis.append(heading);
      dis.append(div0);

      div0.style.display = "flex";
      div0.style.justifyContent = "space-between";

      let new_btn2 = document.createElement("button");
      new_btn2.className = "back-btn";
      new_btn2.id = "btnnnn";
      new_btn2.innerHTML = "Back to Meals";
      new_btn2.addEventListener("click", () => {
        document.getElementById("display3").style.display = "none";
        document.getElementById("display2").style.display = "grid";
      });
      dis.append(new_btn2);

      dis.style.display = "block";
    })
    .catch((error) => {
      console.log(error);
    });
}
