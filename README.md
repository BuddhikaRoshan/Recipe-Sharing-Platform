# 🍽️ Recipe Platform

A responsive web application for discovering, saving, and sharing recipes. Developed as part of the Practical Assessment for the Intern – Front End (React) position at Treinetic (Pvt) Ltd. This project demonstrates proficiency in React.js, state management with Redux, and UI implementation using Material UI components.

## ✨ Features

- **🔍 Browse Recipes:** Discover a variety of recipes with details including ingredients, instructions, cooking time, and ratings.
- **🔎 Search & Filter:** Easily find recipes by title and filter by dietary restrictions (vegetarian, vegan, gluten-free, etc.).
- **❤️ Favorites:** Save your favorite recipes for quick access.
- **➕ Add New Recipes:** Logged-in users can contribute their own recipes to the platform.
- **✏️ Edit & Delete Recipes:** Users can manage the recipes they have added.
- **⏲️ Cooking Timer:** A built-in timer to help you follow cooking times accurately.
- **🌓 Dark Mode:** Toggle between light and dark themes for comfortable browsing.
- **🔗 Social Sharing:** Share recipes with friends via Facebook and Twitter.
- **🖨️ Print-Friendly Versions:** Generate printer-friendly recipe cards.
- **⭐ Recipe Rating & Reviews:** Rate recipes and leave comments.

## 🛠️ Technologies Used

- **Frontend:**
  - [⚛️ React](https://react.dev/): A JavaScript library for building user interfaces.
  - [🔄 Redux](https://redux.js.org/): A predictable state container for JavaScript apps.
  - [🔄 Redux Thunk](https://redux-toolkit.js.org/api/createAsyncThunk): Middleware for handling asynchronous Redux actions.
  - [🎨 Material UI (MUI)](https://mui.com/): A comprehensive suite of UI components following Google's Material Design.
  - [🧭 React Router](https://reactrouter.com/): A library for declarative routing in React applications.
  - [📱 React Share](https://github.com/nygardk/react-share): Social sharing buttons for React.
  - [🔄 React Query](https://tanstack.com/query/latest): Data fetching and caching library.
  - [📝 Formik](https://formik.org/): Form management for React.
  - [✅ Yup](https://github.com/jquense/yup): Schema validation for forms.
  - [🧪 React Testing Library](https://testing-library.com/docs/react-testing-library/intro/): Testing utilities for React components.

- **Other:**
  - [🟢 Node.js](https://nodejs.org/): JavaScript runtime environment.
  - [📦 npm](https://www.npmjs.com/) or [🧶 yarn](https://yarnpkg.com/): Package managers.
  - [🔍 ESLint](https://eslint.org/): Code linting tool.
  - [✨ Prettier](https://prettier.io/): Code formatting tool.
  - [✅ Jest](https://jestjs.io/): JavaScript testing framework.

## 🚀 Getting Started

Follow these steps to get the Recipe Platform up and running on your local machine.

### 📋 Prerequisites

- **Node.js** (version >= 16): Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm** (usually comes with Node.js) or **yarn**: Choose your preferred package manager.

### 💻 Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd recipe-platform
    ```
    *(Replace `<repository_url>` with the actual URL of your project repository)*

2.  **Install dependencies using npm:**
    ```bash
    npm install
    ```
    **OR install dependencies using yarn:**
    ```bash
    yarn install
    ```


## ▶️ Running the Application

1.  **Start the development server:**
    ```bash
    npm start
    ```
    **OR using yarn:**
    ```bash
    yarn start
    ```

2.  **Open your browser:** Navigate to `http://localhost:3000` (or the port specified in your terminal). The Recipe Platform should now be running in your development environment.

3.  **Run tests:**
    ```bash
    npm test
    ```
    **OR using yarn:**
    ```bash
    yarn test
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```
    **OR using yarn:**
    ```bash
    yarn build
    ```

## 📁 Project Structure

```
recipe-platform/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.js
│   │   ├── UI/
│   │   │   ├── CookingTimer.js
│   │   │   ├── Loading.js
│   │   ├──RecipeDetails  
│   ├── data/
│   │   │   ├── substitutions.js
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── Favorites/
│   │   │   └── Favorites.js
│   │   ├── Home/
│   │   │   └── Home.js
│   │   ├── NewRecipe/
│   │   │   ├── NewRecipe.js
│   │   └── RecipeDetail/
│   │       └── RecipeDetail.js
│   ├── redux/
│   │   ├── actions/
│   │   │   ├── authActions.js
│   │   │   ├── favoritesActions.js
│   │   │   ├── recipeActions.js
│   │   ├── reducers/
│   │   │   ├── authReducer.js
│   │   │   ├── favoritesReducer.js
│   │   │   ├── index.js
│   │   │   ├── recipeReducer.js
│   │   ├── actionTypes.js
│   │   └── store.js
│   ├── services/
│   │   ├── api.js
│   │   ├── mockAPI.js
│   ├── theme/
│   │   ├── ThemeContext.js
│   ├── App.css
│   ├── App.js
│   └── AppTests.js
│   ├── index.js
│   ├── logo.svg
│   └── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
```

## 🔄 Redux State Management

The application utilizes Redux for managing global state. Here's a brief overview of the Redux structure:

- **Actions:** Define events that can be dispatched to the store (e.g., `login`, `logout`, `fetchRecipes`, `addToFavorites`).
- **Reducers:** Specify how the application's state changes in response to dispatched actions.
  - `authReducer`: Manages user authentication state (`isAuthenticated`, `user`, `loading`, `error`).
  - `recipeReducer`: Manages the state related to recipes (`recipes`, `loading`, `error`, `createSuccess`, `updateSuccess`).
  - `favoritesReducer`: Manages the list of favorite recipe IDs.
  - `mealPlanReducer`: Manages the state for weekly meal planning.
- **Store:** Holds the complete state of the application and dispatches actions to update the state.
- **Redux Thunk:** Used for handling asynchronous operations within actions (e.g., API calls).

## 🎨 Theming

The application uses Material UI's theming capabilities to provide a consistent and customizable look and feel, including a dark mode toggle. The theme configuration is located in the `src/theme` directory:

- `ThemeContext.js`: Provides the context for toggling between light and dark modes.

Users can toggle between light and dark themes via a switch in the application header, and their preference is saved to local storage for persistence across sessions.

## ⚡ Performance Optimization

- **🔄 React.memo and useMemo**: Implemented to prevent unnecessary re-renders of components.
- **📦 Code Splitting**: Used with React.lazy and Suspense to split code into smaller chunks for improved loading times.
- **🖼️ Image Optimization**: Images are lazy-loaded and properly sized to minimize bandwidth usage.
- **🔍 Redux Selectors**: Used to efficiently extract specific pieces of state without triggering unnecessary re-renders.

## ♿ Accessibility

The application is built with accessibility in mind, including:

- Proper semantic HTML elements
- ARIA attributes where necessary
- Keyboard navigation support
- High contrast colors in both light and dark themes
- Screen reader compatibility


## 👥 Contributing

Contributions to the Recipe Platform are welcome! If you have suggestions, bug reports, or would like to add new features, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b fix/your-bug-fix`.
3.  Make your changes and commit them: `git commit -m "Add your descriptive commit message"`.
4.  Push your changes to your fork: `git push origin feature/your-feature-name`.
5.  Create a pull request to the main repository.

Please ensure your code follows the project's coding style and conventions. Run linting and tests before submitting your PR:

```bash
npm run lint
npm test
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
