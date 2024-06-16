# SuperHero App 🦸‍♂️🚀

SuperHero App is a Single Page Application (SPA) powered by Angular 18 and Angular Material.

## Features 🌟
In approximately 8 hours of work, I have implemented the following features:
- **Hero List**: Display an array of heroes sourced from our mock database. Each hero's name is capitalized, and each entry includes edit and delete buttons.
- **Filtering by name**: Filter the hero list with event handling to minimize the reload. 
- **Routing**: Set up routing for navigating between hero list with filter, and creation/editing views.
- **New hero**: Enabled creation of a new hero with a capitalized name input.
- **Edit hero**: Implemented edit a existing hero reusing new hero component.
-  **Delete hero**: Implemented hero deletion with a reusable confirmation popup.
- **Notification Service**: Implemented for create/update/delete operations on heroes.
- **Loader**: Added a loader for service calls.

## Technical decisions 💻
- **Module Structure**: Created a `hero module` to contain components `hero-list` and `hero-edit`, along with separate folders for models defining the `hero interface` and services containing the `hero service` handling necessary API calls. This organization enhances modularity and separation of concerns, making the codebase easier to navigate and maintain. By isolating hero-related functionality within its own module, we ensure that related components and services are grouped logically, promoting better code reusability and facilitating future scalability.

- **Mock Data**: Instead of utilizing an external API, I opted to create a basic mock data structure with id and name. This mock data is stored in public/mocks and accessed via the hero service using `JSON-Server` library. This approach allows for rapid development without the need for an active backend, streamlining the development process. For proper functionality, both the Angular app and JSON-Server need to be running simultaneously. Instructions for setting up the mock server can be found below.

- **Component Reusability**: Chose to reuse the same component for both hero creation and editing to streamline form usage and reduce code duplication.
- **Notification Service**: Implemented a notification service to trigger custom success/error popups throughout the application, promoting reusability.
- **Loader Implementation**: Integrated `ngx-ui-loader` library to implement loader functionality, thereby saving time.
- **Unit Testing**: Implemented unit tests using Jasmine on critical components such as list-hero and edit-hero to ensure functionality and stability.
- **Code Quality**: Maintained using Prettier and linting to ensure clean, readable code.


## Problems Encountered 🛠️
During development, I encountered issues with the latest version of JSON Server. Specifically, after adding some new heros and attempting to edit the newly added hero, the server would crash unexpectedly. To resolve this issue, I reverted to an earlier version of JSON Server, which did not exhibit this stability problem.

## Potential Improvements 🙌
Here are some areas where further enhancements could be made:
- **Internationalization**: Implement translations for better accessibility across languages.
- **Additional Testing**: Increase test coverage to ensure robustness.
- **Enhanced Frontend Design**: Enhance the frontend design to elevate user experience.


## Running proyect 🚀

Get up and running with these simple steps:

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
    ```bash
    ng serve
    ```
3. **Mock API Setup:**
Open another terminal in the project directory and start the mock API:
The mock API will be available at `http://localhost:3000`.
    ```bash
        json-server --watch public/mocks/hero-mock.json
    ```
