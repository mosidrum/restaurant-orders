const foods = [
  "Pizza",
  "Burger",
  "Pasta",
  "Sushi",
  "Salad",
  "Tacos",
  "Steak",
  "Soup",
  "Sandwich",
  "Fries",
  "Rice",
  "Chicken",
  "Shrimp",
  "Lobster",
  "Crab",
  "Salmon",
  "Tuna",
  "Pork",
  "Beef",
  "Lamb",
  "Duck",
  "Turkey",
  "Bacon",
  "Sausage",
  "Ham",
  "Meatballs",
];

export const getRandomItems = (): string[] =>
  foods
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 3) + 1);
