
<h1 align="center">
  Assignment  project - 4 🚀
</h1>

 # 📝 Bike Shop Management API


I developed a powerful backend for a blogging platform, enabling both user and admin operations with full CRUD functionality, authentication, and authorization. Users can create, read, update, and delete their blogs, while admins have extended privileges to manage all content.

Key features include advanced search and filtering for efficient content discovery. The backend is built using Node.js, Express.js, TypeScript, and MongoDB, ensuring scalability, type safety, and high performance. JWT-based authentication secures user sessions, while role-based authorization safeguards resources. Designed with clean architecture and modularity, this backend provides a robust, efficient, and secure foundation for a modern blogging platform.
* * *


## Technologies

*   **TypeScript**
*   **Node.js**
*   **Express.js**
*   **MongoDB with Mongoose**
*   **Zod**
*   **cros**
*   **dotenv**
*   **http-status-codes**
*   **JWT**
*   **bycrpt**
*   **Stripe**

* * *



## 🚀 Features

### User Roles
- **Admin**:
  - Block users.
  - Delete any blog.
  - **Cannot update blogs.**
- **User**:
  - Register and log in.
  - Create, update, and delete their own blogs.
  - **Cannot perform admin actions.**

### Core Features
- **Authentication & Authorization**:
  - Secure JWT-based authentication.
  - Role-based access control for admin and users.
- **Blog API**:
  - Public access to blog listings.
  - Advanced functionalities: search, sort, and filter.

---

## 🛠️ API Endpoints

### Authentication
- **Register**: `POST /api/auth/register`  
- **Login**: `POST /api/auth/login`

### Blog Management
- **Create Blog**: `POST /api/blogs` (Logged-in users only)
- **Update Blog**: `PATCH /api/blogs/:id` (Blog owner only)
- **Delete Blog**: `DELETE /api/blogs/:id` (Blog owner only)
- **View Blogs**: `GET /api/blogs` (Public API with search, sort, filter)

### Caregory Management
- **Create Blog**: `POST /api/categorys` 
- **Update Blog**: `PATCH /api/categorys/:id` 
- **Delete Blog**: `DELETE /api/categorys/:id` 
- **View Blogs**: `GET /api/categorys` 
### Order Management
- **Create Blog**: `GET /api/order` 
- **Update Blog**: `POST /api/cehckout/` 
- **Update Blog**: `POST /api/confirm-order` 
- **Delete Blog**: `DELETE /api/order/:id` 

### Admin Actions
- **Block User**: `PATCH /api/admin/users/:userId/block`
- **Delete Any Blog**: `DELETE /api/admin/blogs/:id`

---

## 🛡️ Error Handling
All errors are returned in a structured format with clear messages and status codes.

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details" }
}
```




Thank you for exploring this project! 🚀
# assignment-4-server
# Server Link :  https://bikeshopserver.vercel.app
# Github Link :  https://github.com/Mosiur411/bikeshopserver