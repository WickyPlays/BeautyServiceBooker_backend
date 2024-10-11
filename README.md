### 1. **User Routes**

* `GET /users`: Get a list of all users.
* `GET /users/{id}`: Get a single user by their ID.
* `POST /users`: Create a new user (e.g., sign up).
* `PUT /users/{id}`: Update user information (e.g., update profile, password, etc.).
* `DELETE /users/{id}`: Delete a user.

### 2. **Location Routes**

* `GET /locations`: Get a list of all locations.
* `GET /locations/{id}`: Get details for a specific location.
* `POST /locations`: Add a new location.
* `PUT /locations/{id}`: Update details of a location.
* `DELETE /locations/{id}`: Delete a location.

### 3. **Promo Code Routes**

* `GET /promocodes`: Get a list of all promo codes.
* `GET /promocodes/{id}`: Get details of a specific promo code.
* `POST /promocodes`: Add a new promo code.
* `PUT /promocodes/{id}`: Update a promo code (e.g., mark it as used).
* `DELETE /promocodes/{id}`: Delete a promo code.
* `GET /locations/{id}/promocodes`: Get promo codes for a specific location.

### 4. **Service Routes**

* `GET /services`: Get a list of all services.
* `GET /services/{id}`: Get details of a specific service.
* `POST /services`: Add a new service.
* `PUT /services/{id}`: Update a service (e.g., change price or duration).
* `DELETE /services/{id}`: Delete a service.
* `GET /locations/{id}/services`: Get services offered at a specific location.

### 5. **Bill Routes**

* `GET /bills`: Get a list of all bills.
* `GET /bills/{id}`: Get details of a specific bill.
* `POST /bills`: Create a new bill (when a user purchases services).
* `DELETE /bills/{id}`: Delete a bill.
* `GET /users/{id}/bills`: Get all bills for a specific user.
* `GET /locations/{id}/bills`: Get all bills for a specific location.

### 6. **Bill Service Routes**

* `GET /bills/{id}/services`: Get services associated with a specific bill.
* `POST /bills/{id}/services`: Add services to a bill.
* `DELETE /bills/{id}/services/{serviceID}`: Remove a service from a bill.

### **Special Cases / Additional Routes:**

1. `POST /users/{id}/apply-promocode`: Apply a promo code to a user's bill (if available and not used).
2. `GET /locations/{id}/available-promocode`: Get valid promo codes for a user for a specific location.
