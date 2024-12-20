# Web Engineering Coding Playground Template

This repository is designed as the foundation for coding playgrounds in the Web Engineering course. It offers a structured space for experimenting with and mastering various web development technologies and practices.
The project is based on [this](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting) repository from MDN.

The project introduces a lot of code smells for you to tackle.
**Lets get coding!**

## Submission Details and Deadlines

- Coding playgrounds are **individual** work
- There will be 2 serparate submissions:
  - [Base Playgrounds](#base-coding-playgrounds): Submission Deadline **03.11.2024**
  - [Extended Playgrounds](#extended-coding-playgrounds): Submission Deadline **16.01.2025**
- The playgrounds will be guided through in our sessions - still there will be distance work!
- Use this base template to create your project repository.
- Each playground is linked in the corresponding course section.
- You can find the submissions at the bottom of the Moodle course.

## Features

- Wonderful UI-design :heart_eyes:
- Loads bear data using [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) :bear:
  - Original Wikipedia Page can be found [here](https://en.wikipedia.org/wiki/List_of_ursids)
- Worst JS coding practices :cold_sweat:
- No Build and Dependency Management at all :fire:

# Base Coding Playgrounds

## K.O. Criteria

- No JS Frameworks allowed to solve the base coding playgrounds (e.g. Vue.js, Angular, React, Svelte,...) - don't panic we will come to them!
- No CSS Libraries allowed (e.g. Bootstrap, Material, Tailwind, ...)

## Submission

Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:

> GitHub: leonardo1710
>
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 1. JS Playground (10 Pts.)

The provided base project template contains some bugs and bad JS coding practices for you to fix in your first playground. Take a look into the component files and get a grasp of the inner workings of the provided project.

> **ATTENTION: After finishing the JS Playground please create a commit or branch and link it below. Otherwise it is not possible to grade your 1. submission, since we will switch to TypeScript afterwards!**
>
> **This is my JS Playground commit/branch:** <[playground1](https://github.com/ClarissaTreml/WebEngineering_Playground/tree/playground1)>

**Tasks:**
Fix application code and answer the questions:

- (2) Adapt the code to use `async/await` instead of the `then()`-callback hell and refactor the functions to use arrow function syntax instead of `function()`-syntax.
- (2) Add proper error handling to the code using `try/catch` and provide useful error messages to the users. Additionally, check the image URL availability before rendering the images in HTML. Provide placeholder images if the given URL does not exist.
- (1) Extract the range value from the provided Wikitext (response from the API). Examine the provided Wikitext format inside `extractBears` function.
- (1) Split the code into separate modules with regards to clean separation of concerns.
- (1) Eliminate all other bad coding practices you can find.
- (3) Answer the following questions and provide some examples inside the `Readme.md` file.

> **What bad coding practices did you find? Why is it a bad practice and how did you fix it?**

## Code Review: Identified Bad Coding Practices and Fixes

### 1. **Direct DOM Manipulation Outside Functions**

**Bad Practice**: Accessing and manipulating DOM elements directly outside of functions
or event listeners can lead to errors if the elements are not available when the script runs.

```javascript
// Bad practice: DOM elements accessed outside a function or event listener
const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.querySelector('.comment-wrapper');
```

**Fix**: We encapsulated DOM queries within functions like toggleComments and
addComment in commentSection.js and ensured these functions only run after
the DOM is fully loaded by initializing them inside a DOMContentLoaded event in main.js.

```javascript
// Good practice: Initialize DOM elements inside the function and run it after DOMContentLoaded
export const toggleComments = () => {
  const showHideBtn = document.querySelector('.show-hide');
  const commentWrapper = document.querySelector('.comment-wrapper');
  if (!showHideBtn || !commentWrapper) return;
  // ...
};
```

### 2. **Ignoring Returned Promises**

**Bad Practice**: Ignoring promises returned by async functions can lead to unhandled rejections and unexpected behavior.

```javascript
// Bad practice: Ignoring a promise returned by an async function
getBearData();
```

**Fix**: We used await in main.js to handle the promise returned by getBearData,
ensuring that any asynchronous tasks complete before moving forward.
This also allows for easier error handling using try/catch.

```javascript
// Good practice: Use await to handle the promise
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await getBearData();
  } catch (error) {
    console.error('Error loading bear data:', error);
  }
});
```

### 3. **Using `.then()` Instead of `async/await`**

**Bad Practice**: Using .then() chaining instead of async/await can make the code
harder to read and maintain, especially when dealing with multiple asynchronous operations.

```javascript
// Bad practice: Using .then() to handle asynchronous operations
fetchImageUrl(fileName).then((imageUrl) => {
  // handle imageUrl
});
```

**Fix**: We refactored code in fetchingData.js and extractingBears.js to use async/await
instead of .then(). This improves readability by handling asynchronous code in a more linear fashion.

```javascript
// Good practice: Using async/await for asynchronous operations
const imageUrl = await fetchImageUrl(fileName);
```

### 4. **Inline Style Manipulation**

**Bad Practice**: Directly setting inline styles in JavaScript can make the code harder to maintain and override with CSS.

```javascript
// Bad practice: Setting inline styles in JavaScript
commentWrapper.style.display = 'none';
```

**Fix**:
We used CSS classes in style.css to control the visibility of elements,
toggling classes in JavaScript instead of setting styles directly.

```javascript
// Good practice: Use CSS classes and toggle them in JavaScript
commentWrapper.classList.add('hidden'); // Define .hidden { display: none; } in CSS
```

### 5. **Replacing `.onclick` and `.onsubmit` with `addEventListener`**

**Bad Practice**: Using `.onclick` and `.onsubmit` directly limits each element to a single event handler,
which can cause issues if additional event listeners are needed in the future. It also lacks modularity and flexibility.

```javascript
// Bad practice: Using .onclick directly, which limits to a single event handler
showHideBtn.onclick = () => {
  const showHideText = showHideBtn.textContent;
  // Logic for toggling comments
};
```

**Fix**: Use addEventListener instead, which allows for multiple event listeners on the same element,
improving modularity and maintainability.

```javascript
// Good practice: Using addEventListener for better modularity and flexibility
showHideBtn.addEventListener('click', () => {
  const showHideText = showHideBtn.textContent;
  // Logic for toggling comments
});
```

### 6. **Removing `<font>` Tags and Using CSS for Font Styling**

**Bad Practice**: Using `<font>` tags with `size` attributes in HTML is outdated
and makes it difficult to maintain a consistent design. Inline styling should
generally be avoided in favor of CSS classes, which are easier to update and
provide better separation of concerns.

```html
<!-- Bad Practice: Using <font> tags for styling -->
<font size="7">Welcome to our wildlife website</font>
<font size="6">Add comment</font>
<font size="5">Types of bear</font>
```

**Fix**: Replace <font> tags with semantic elements (like <span>) and
use CSS classes for font sizes. This keeps the HTML clean and
allows for centralized styling in style.css.

```html
<!-- Good Practice: Use CSS classes for styling -->
<span class="font-size-7">Welcome to our wildlife website</span>
<span class="font-size-6">Add comment</span>
<span class="font-size-5">Types of bear</span>
```

### 7. **Adding `alt` Attributes to Images**

**Bad Practice**: Not including `alt` attributes on images can make
the website less accessible. Screen readers rely on alt text to describe
images to users who are visually impaired, and search engines also
use this text to understand image content.

```html
<!-- Bad Practice: Images without alt attributes -->
<img src="src/media/wild-bear.jpg" />
<img src="src/media/urban-bear.jpg" />
```

**Fix**: Provide descriptive alt attributes to help screen readers and
improve accessibility. Descriptions should accurately represent the content of the images.

```html
<!-- Good Practice: Images with descriptive alt attributes -->
<img src="src/media/wild-bear.jpg" alt="image of a wild bear" />
<img src="src/media/urban-bear.jpg" alt="image of an urban bear" />
```

```JS
console.log('Make use of markdown codesnippets to show and explain good/bad practices!')
```

## 2. Dependency- and Build Management Playground (10 Pts.)

Build the application with `npm` and a build and a dependency management tool of your choice (e.g. [Vite](https://vitejs.dev/), [Webpack](https://webpack.js.org/), or others).

Here are some additional resources: [Package Management and Bundling](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2-Package-Management,-Build-Management-and-Modules), [Vite Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.1-Vite-Web-Application-Setup), [Webpack Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.2-Webpack-Web-Application-Setup).

**Tasks:**

- (1) Integrate `npm` and a build management tool into your project.
- (2) Configure your project to use Typescript as your primary development language and adapt the code and file extensions respectively.
- (2) Use ESLint and Prettier inside your project - rulesets can be found below.
- (1) Keep your builds clear and add dependencies to the right build (e.g. do not add dev dependencies inside the production build and vice versa).
- (1) Define the following tasks within `npm scripts`:
  - `dev`: starts the development server
  - `build`: runs the typescript compiler and bundles your application - bundling depends on your chosen build tool (e.g. Vite, Webpack) but typically bundles multiple files into one, applies optimizations like minification and obfuscation and outputs final results to a `dist` or `build` directory.
  - `lint`: runs ESLint on all `.js` and `.ts` files in your projects `/src` directory
  - `lint:fix`: runs and also fixes all issues found by ESLint
  - `format`: formats all `.js` and `.ts` files in your projects `/src` directory
  - `format:check`: checks if the files in the `/src` directory are formatted according to Prettier's rules.
- (1) Configure a pre-commit hook that lints and formats your code using [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged). A tutorial can be found [here](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9).
- (2) Answer the question at the end of this section inside `Readme.md` file:

**ESLint Configurations**

Use ESLint configs [standard-with-typescript](https://www.npmjs.com/package/eslint-config-standard-with-typescript) and [TypeScript ESLint Plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).
Your `.eslintrc` file should have the following extensions:

```.eslintrc.yml
...
extends:
  - standard-with-typescript
  - plugin:@typescript-eslint/recommended
  - plugin:prettier/recommended
  - prettier
...
```

**Prettier Configurations**

Apply the following ruleset for Prettier:

```.prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 80
}
```

> **What improvements in your codebase were introduced by using TS instead of JS? Name at least 3 and explain why.**

**By migrating from JavaScript to TypeScript, the following improvements were introduced:**

**Static Type Checking**:
TypeScript identifies type-related errors at compile-time,
which reduces runtime errors and makes the code more robust.

**Improved Code Readability and Maintainability**:
Type annotations and TypeScript’s type system make the code
self-documenting and easier to understand, especially in large projects.

**Enhanced IDE Support and Autocompletion**:
TypeScript provides richer support in IDEs, including autocompletion
and parameter hints, boosting developer productivity and
reducing errors.

## 3. CI/CD Pipeline Playground (5 Pts.)

Implementation of a CI/CD pipeline to automate the development and deployment process – write automated tests.

Here are some additional resources: [GitHub Actions Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/3.2-CI-CD-Pipeline-with-Github-Pages-and-Github-Actions) and [GitHub Actions Docs](https://docs.github.com/en/actions).

**Tasks:**

- (1.5) Write at least 2 meaningful unit tests (use [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/)) for your project and configure the following tasks in `npm scripts`:
  - `test`: runs all files that include `.test.` or `.spec.`, e.g.: `example.test.ts`
  - `test:coverage`: runs tests like `test` but also creates a test coverage report
- (1) Configure **2 Workflows** in GitHub Actions, one for development and one for deployment:
  - Create a `development` branch inside your repository
  - (1) Development Workflow should at least test and lint your code when developers push to branch `development`
  - (1) Deployment Workflow is triggered when developers push into `main` branch. It should at least test, lint and build your source code. Afterwards the build artifacts of your application should be automatically deployed to Github Pages (or another hosting provider of your choice).
- (0.5) Reuse existing workflows or jobs whenever possible!

## 4. Accessibility Playground (5 Pts.)

You might have noticed that the base project has a number of accessibility issues - your task is to explore the existing site and fix them.
Use the tools presented in our accessibility workshop to test the accessibility in your project.

**(0.5) Color**

Test the current color contrast (text/background), report the results of the test, and then fix them by changing the assigned colors.

Tools:
- Developer Tools - Accessibility
- Lighthouse Report
- Wave - web accessibility evaluation tool

  One of the first findings of the Lighthouse Report was that the Background and foreground colours do not have a sufficient contrast ratio. The Wave Tool reported 38 contrast errors. After searching for other "green webpages" I inserted the desired background color into the contrast checker of Wave and played around until finding the suitable foreground color. Adequate contrast of text is necessary for all users, especially users with low vision.

**(0.5) Semantic HTML**

Report on what happens when you try to navigate the page using a screen reader. Fix those navigation issues.

Tools:
- Developer Tools - Accessibility
- Lighthouse Report
- Manual Testing using Voiceover and Keyboard
- Wave - web accessibility evaluation tool

Form controls did not have a properly associated text label and there were as well navigation issues throughout the page using the screen reader and navigating with only the keyboard. Inserting propper aria-attributes was one way of fixing the issues.
  
**(0.5) Audio**

The `<audio>` player isn't accessible to hearing impaired (deaf) people — can you add some kind of accessible alternative for these users?

-Missing Transcript for Audio Content: The audio player currently lacks captions or a transcript, which limits accessibility for users who are for example deaf. To address this, a transcript directly below the audio player should be added. Providing a transcript ensures that all users, regardless of their hearing ability, can access the content and understand the audio’s message. Meanwhile, a placeholder was added and the implementation of a transcript still needs to be implemented.

**(1) Forms**

- The `<input>` element in the search form at the top could do with a label, but we don't want to add a visible text label that would potentially spoil the design and isn't really needed by sighted users. Fix this issue by adding a label that is only accessible to screen readers.
- The two `<input>` elements in the comment form have visible text labels, but they are not unambiguously associated with their labels — how do you achieve this? Note that you'll need to update some of the CSS rule as well.

Accessible Label for Search Input: Added a visually hidden label <label for="search-query" class="sr-only">Search our website</label> to the search form input. This sr-only class hides the label visually while keeping it accessible to screen readers, helping users understand the field's purpose.

Associating Labels with Comment Form Inputs: Added for and id attributes to explicitly link labels with input fields in the comment form. This association enhances usability for screen reader users, enabling them to identify labels correctly, and also allows mouse users to focus the input by clicking on the label.

**(0.5) Comment section**

The show/hide comment control button is not currently keyboard-accessible. Can you make it keyboard accessible, both in terms of focusing it using the tab key, and activating it using the return key?

- Keyboard Accessibility for "Show/Hide Comments" Button: The "Show/Hide comments" button was initially not accessible via keyboard. To improve accessibility, an event listener for the "key-down" event was added, allowing users to trigger the action using the "Enter" key. This ensures that keyboard-only users can easily toggle the comments section, enhancing overall accessibility.

**(1) The table**

The data table is not currently very accessible — it is hard for screen reader users to associate data rows and columns together, and the table also has no kind of summary to make it clear what it shows. Can you add some features to your HTML to fix this problem?

- Enhanced Data Table Accessibility: Added <th> elements with scope attributes and a caption to improve screen reader navigation and provide context for the table’s content.

**(1) More Findings**

- HTML Language Attribute Missing: The <html> element was missing the lang attribute. Adding lang="en" to the <html> tag specifies that English is the primary language of the page. This helps assistive technologies, like screen readers, correctly interpret and pronounce words, enhancing accessibility.
- Adjusted Placeholder Text: The font size and family of placeholder text were adjusted to enhance readability for users, making it easier for them to interact with form fields.
- Improved Readability with Sans-Serif Font: The font family was changed to sans-serif to improve readability, especially for those with visual impairments.
- Increased Font Size for Readability: Font sizes for specific elements were increased to ensure that text is easily readable by all users, improving accessibility.
- Enhanced Search Button Accessibility: The search button was updated from an input type="submit" to a <button>. This change allows for greater styling flexibility, improving visual consistency and interaction feedback.


# Extended Coding Playgrounds

Please create a new independent Repository for these playgrounds and submit a link to it in the Moodle submission.
Additionally, provide a description of how to start your frontend and backend services inside the `README.md`.

## Submission

Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:

> GitHub: leonardo1710
>
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 5. Migrate to a Frontend Framework (10 pts.)

In this playground you will migrate your application to a frontend framework of your choice.

**Tasks**:

- Migrate your application to a frontend framework of your choice (e.g. React, Angular, Vue.js, Svelte,...)
  - All previous features should still work
  - The application still should use build and dependency management
- Adapt your `npm scripts` if necessary

## 6. Integrate a Backend Framework (10 pts.)

In this playground you will use a backend framework of your choice and connect it with an API to your frontend application.

**Tasks**:

- (3) Setup a backend framework of your choice
- (2) Create an API your frontend will be connected to (REST, GraphQL, gRPC, you choose...)
- (2) Your backend should now request the bear data from presented Wikipedia API
- (3) Replace the frontend Wikipedia API calls with calls to your backend - the functionality of your frontend should work as before!
- (Optional): you may want to introduce some sort of caching layer for Wikipedia API requests

## 7. Containerize your application (10 pts.)

Dockerize your frontend and backend applications. It should be possible to start all services in the corresponding mode (development, production) with a single command (e.g. use Docker Compose for this).

**Tasks**:

- (6) Create **multi-stage Dockerfiles** for your applications (depending on your frameworks):
  - The frontend Dockerfile should: 1. run the app in a development environment 2. build the app 3. serve build artefacts over Nginx
  - The backend Dockerfile should: 1. run the app in a development environment 2. build the app if there is a build step in your framework (optional) 3. serve the app
- (4) Create two docker-compose files to orchestrate you applications in `development` and `production` mode:
  - Define ports and dependencies
  - Define corresponding stage (development, production)
  - Use environment variables if possible
- Your application should start with the following commands:
  - Development: `docker-compose -f docker-compose.yml up --build`
  - Production: `docker-compose -f docker-compose.prod.yml up --build`
