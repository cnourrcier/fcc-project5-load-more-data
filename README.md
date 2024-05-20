# Load More Data

Part 5 of the 25 React Projects for interview. 

This project dynamically fetches and displays a list of products with pagination. It includes the following features:

- State Management: Uses useState to manage loading state, product data, error messages, button disable state, and the count for pagination.

- Data Fetching: The fetchProducts function asynchronously fetches products from an external API (https://dummyjson.com/products) based on the current count, adding them to the existing list of products.

- Error Handling: Catches and displays any errors that occur during the data fetching process.

- Pagination: Implements a "Load More Products" button that fetches the next set of products, 20 at a time, when clicked.

- Conditional Rendering: Shows a loading message while data is being fetched and an error message if the fetch fails. Also disables the button and displays a message when there are no more products to load.

- Effect Hooks: Uses useEffect to trigger data fetching when the count changes and to disable the button after 100 products have been loaded. Ensures fetch calls are only made after the component is mounted using a ref (isMounted).
