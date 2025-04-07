import { v4 as uuidv4 } from 'uuid';

// Mock user data (in-memory for now)
const users = [
  { id: 'user1-id', username: 'FoodieFun', email: 'foodie@example.com', password: 'password123' },
  { id: 'user2-id', username: 'HealthyChef', email: 'healthy@example.com', password: 'securepass' },
  { id: 'user3-id', username: 'BakingPro', email: 'baking@example.com', password: 'sweettooth' },
];

// Find user by username or email and password
const findUser = (identifier, password) =>
  users.find((user) => (user.username === identifier || user.email === identifier) && user.password === password);

// Get user by ID
const getUserById = (userId) => {
  return users.find((user) => user.id === userId);
};

// Mock recipe data
let recipes = [
    {
      id: uuidv4(),
      title: 'Delicious Pasta',
      description: 'A classic pasta dish.',
      ingredients: ['Pasta', 'Tomato sauce', 'Cheese'],
      instructions: 'Boil pasta until al dente. Add tomato sauce. Sprinkle cheese.',
      cookingTime: '30 mins',
      rating: 4.5,
      image: 'https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg',
      createdBy: 'user1-id',
      dietaryRestrictions: [],
    },
    {
      id: uuidv4(),
      title: 'Vegan Lentil Soup',
      description: 'A hearty and nutritious vegan soup.',
      ingredients: ['Lentils', 'Carrots', 'Celery', 'Onion', 'Vegetable broth'],
      instructions: 'Sauté veggies. Add lentils and broth. Simmer until tender.',
      cookingTime: '45 mins',
      rating: 4.8,
      image: 'https://img.freepik.com/free-photo/top-view-lentil-soup-with-salt-tomatoes-dark-bread-loaves-dark-surface_179666-35288.jpg',
      createdBy: 'user2-id',
      dietaryRestrictions: ['vegan', 'vegetarian'],
    },
    {
      id: uuidv4(),
      title: 'Gluten-Free Pancakes',
      description: 'Fluffy gluten-free pancakes.',
      ingredients: ['Gluten-free flour', 'Eggs', 'Milk', 'Baking powder'],
      instructions: 'Mix ingredients. Cook on a griddle.',
      cookingTime: '20 mins',
      rating: 4.3,
      image: 'https://img.freepik.com/free-photo/carbohydrate-breakfast-pancakes-crepes-wafers_114579-43328.jpg?uid=R121736837&ga=GA1.1.967792358.1721062604&semt=ais_hybrid&w=740',
      createdBy: 'user1-id',
      dietaryRestrictions: ['gluten-free', 'vegetarian'],
    },
    {
      id: uuidv4(),
      title: 'Chocolate Cake',
      description: 'A rich and decadent chocolate cake.',
      ingredients: ['Flour', 'Sugar', 'Cocoa powder', 'Eggs', 'Butter', 'Milk'],
      instructions: 'Mix ingredients. Bake. Cool. Frost. Enjoy!',
      cookingTime: '60 mins',
      rating: 4.9,
      image: 'https://img.freepik.com/free-photo/closeup-tasty-chocolate-cake-with-chocolate-chunks-baking-sheet_1220-6329.jpg',
      createdBy: 'user3-id',
      dietaryRestrictions: [],
    },
    {
      id: uuidv4(),
      title: 'Avocado Toast',
      description: 'Simple and delicious breakfast toast.',
      ingredients: ['Bread', 'Avocado', 'Salt', 'Pepper', 'Lemon juice'],
      instructions: 'Toast bread. Mash avocado with seasoning. Spread and enjoy.',
      cookingTime: '10 mins',
      rating: 4.6,
      image: 'https://img.freepik.com/free-photo/healthy-toast-with-avocado-egg-white-plate_1220-5896.jpg',
      createdBy: 'user2-id',
      dietaryRestrictions: ['vegetarian'],
    },
    {
      id: uuidv4(),
      title: 'Chicken Biryani',
      description: 'Spiced chicken layered with fragrant rice.',
      ingredients: ['Chicken', 'Rice', 'Spices', 'Yogurt', 'Onions'],
      instructions: 'Marinate chicken. Cook rice. Layer and steam.',
      cookingTime: '90 mins',
      rating: 4.7,
      image: 'https://img.freepik.com/free-photo/flat-lay-rice-with-saffron-meat_23-2148825093.jpg',
      createdBy: 'user3-id',
      dietaryRestrictions: [],
    },

    {
      id: uuidv4(),
      title: 'Grilled Cheese Sandwich',
      description: 'Crispy outside, melty cheese inside.',
      ingredients: ['Bread', 'Butter', 'Cheddar cheese'],
      instructions: 'Butter bread. Grill with cheese until golden.',
      cookingTime: '10 mins',
      rating: 4.2,
      image: 'https://img.freepik.com/free-photo/crispy-sandwiches-with-cheese-board_114579-2840.jpg',
      createdBy: 'user2-id',
      dietaryRestrictions: ['vegetarian'],
    },
    {
      id: uuidv4(),
      title: 'Beef Tacos',
      description: 'Spicy beef in crunchy taco shells.',
      ingredients: ['Ground beef', 'Taco shells', 'Lettuce', 'Cheese', 'Salsa'],
      instructions: 'Cook beef with spices. Fill shells. Add toppings.',
      cookingTime: '25 mins',
      rating: 4.5,
      image: 'https://img.freepik.com/free-photo/mexican-tacos-with-meat-vegetables-cheese-salsa-wooden-table_2829-19947.jpg',
      createdBy: 'user3-id',
      dietaryRestrictions: [],
    },
    {
      id: uuidv4(),
      title: 'Quinoa Salad',
      description: 'Light and healthy protein-packed salad.',
      ingredients: ['Quinoa', 'Cucumber', 'Tomatoes', 'Feta', 'Olive oil'],
      instructions: 'Cook quinoa. Mix with chopped veggies and dressing.',
      cookingTime: '20 mins',
      rating: 4.6,
      image: 'https://img.freepik.com/free-photo/fresh-vegetable-salad-with-quinoa-tomatoes-cucumber-arugula-plate_2829-19044.jpg',
      createdBy: 'user1-id',
      dietaryRestrictions: ['vegetarian', 'gluten-free'],
    },
  
  
];

// Mock API for Authentication
export const mockAuthAPI = {
  login: async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = findUser(credentials.identifier, credentials.password);
        if (user) {
          resolve({ id: user.id, username: user.username, email: user.email });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  signup: async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (users.some((user) => user.username === userData.username || user.email === userData.email)) {
          reject(new Error('Username or email already exists'));
          return;
        }
        const newUser = { id: uuidv4(), ...userData };
        users.push(newUser);
        resolve({ id: newUser.id, username: newUser.username, email: newUser.email });
      }, 500);
    });
  },
};

// Mock API for Recipes
export const mockRecipeAPI = {
  getAllRecipes: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(recipes);
      }, 300);
    });
  },

  getRecipeById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const recipe = recipes.find((r) => r.id === id);
        if (recipe) {
          const creator = getUserById(recipe.createdBy);
          resolve({ ...recipe, creatorUsername: creator ? creator.username : 'Unknown' });
        } else {
          reject(new Error('Recipe not found'));
        }
      }, 300);
    });
  },

  createRecipe: async (recipeData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser) {
          reject(new Error('User not authenticated'));
          return;
        }
        const createdBy = currentUser.id;
        if (!recipeData.title || recipeData.title.trim() === '') {
          reject(new Error('Title is required'));
          return;
        }
        if (!recipeData.ingredients || recipeData.ingredients.length === 0 || recipeData.ingredients.some(ing => ing.trim() === '')) {
          reject(new Error('Ingredients must not be empty'));
          return;
        }
        const newRecipe = { id: uuidv4(), ...recipeData, createdBy };
        recipes = [...recipes, newRecipe];
        resolve(newRecipe);
      }, 500);
    });
  },

  updateRecipe: async (id, recipeData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = recipes.findIndex((r) => r.id === id);
        if (index !== -1) {
          const currentUser = JSON.parse(localStorage.getItem('user'));
          const recipeToUpdate = recipes[index];
          if (!currentUser || recipeToUpdate.createdBy !== currentUser.id) {
            reject(new Error('Unauthorized to update this recipe'));
            return;
          }
          if (!recipeData.title || recipeData.title.trim() === '') {
            reject(new Error('Title is required'));
            return;
          }
          if (!recipeData.ingredients || recipeData.ingredients.length === 0 || recipeData.ingredients.some(ing => ing.trim() === '')) {
            reject(new Error('Ingredients must not be empty'));
            return;
          }
          const updatedRecipe = { ...recipeToUpdate, ...recipeData, id };
          recipes[index] = updatedRecipe;
          resolve(updatedRecipe);
        } else {
          reject(new Error('Recipe not found'));
        }
      }, 500);
    });
  },

  deleteRecipe: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = recipes.findIndex((r) => r.id === id);
        if (index !== -1) {
          const currentUser = JSON.parse(localStorage.getItem('user'));
          const recipeToDelete = recipes[index];
          if (!currentUser || recipeToDelete.createdBy !== currentUser.id) {
            reject(new Error('Unauthorized to delete this recipe'));
            return;
          }
          recipes = recipes.filter((r) => r.id !== id);
          resolve();
        } else {
          reject(new Error('Recipe not found'));
        }
      }, 500);
    });
  },
};
