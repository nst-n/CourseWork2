# CourseWork2

Scottish Pantry Network

The Scottish Pantry Network (TSPN) is a web application designed to facilitate the sharing of surplus fruits and vegetables between individuals and local food pantries. This initiative aims to reduce food waste while helping those experiencing food insecurity.
Features

    User Registration and Authentication: Users can register for an account and log in securely.
    Post Items for Sharing: Registered users can post details of surplus fruits and vegetables they have available for sharing, including item name, description, and use-by date.
    Browse Available Items: Visitors can view a list of available items posted by users. Items are displayed based on their availability and proximity to the user's location.
    Automatic Item Management: Items are automatically removed from the listings once they pass their use-by date or are selected by a food pantry.
    Responsive Design: The application is designed to be accessible and user-friendly across different devices and screen sizes.

Technologies Used

    Frontend: HTML, CSS, JavaScript, Mustache.js
    Backend: Node.js, Express.js
    Database: NeDB (embedded database)
    Authentication: JWT (JSON Web Tokens), bcrypt
    Deployment: Netlify (frontend), Heroku (backend)

Installation

    Clone the repository: git clone <repository-url>
    Navigate to the project directory: cd scottish-pantry-network
    Install dependencies: npm install
    Set up environment variables:
        Create a .env file in the root directory
        Define the following variables: ACCESS_TOKEN_SECRET, DATABASE_URL
    Start the server: node index
