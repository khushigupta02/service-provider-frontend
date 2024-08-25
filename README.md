# Service Provider Application

This Service Provider Application is designed to manage household chores by connecting customers with service providers. The application consists of two main dashboards: one for customers and another for service providers. Both types of users can register, log in, and manage their profiles independently. The service providers can add, update, and delete the services they offer, while customers can browse and book these services based on their requirements.

Features-

1. User Registration and Login
* Separate registration and login functionalities for both customers and service providers.
* Users can edit their profiles after registration.

2. Service Management for Service Providers
* Service providers can add, update, and delete the services they offer.
* Manage service availability and pricing.
* Service providers have a dedicated dashboard to track their services and booking requests.

3. Service Booking for Customers
* Customers can browse available services and book a service from any service provider.
* After booking, service providers can change the status of the booking request with various statuses such as:
- Request Sent
- Confirmed
- Accepted
- Scheduled
- Rescheduled
- Ongoing
- Completed
- Declined by Service Provider
- Cancelled by Customer

4. Booking Management
* Service providers have the ability to manage and update the status of the service requests.
* Customers can cancel their booking if needed.

5. Feedback System
After a service is completed, customers have the option to provide feedback on the service provider.

7. Dashboard
* Both customers and service providers have personalized dashboards to view their respective details and activities.
* The dashboard shows history and current bookings for customers.
* Service providers can view their active and completed services.

7. Security
* The application uses JWT (JSON Web Token) for session management and security purposes.
* Session management ensures secure handling of login sessions and data access.

8. Database
All customer, service provider, and booking data is stored securely in a MySQL database.

Tech Stack-
- Frontend : ReactJS, Bootstrap, CSS, JavaScript
- Backend : Java, Spring Boot, Spring Security (Session Management with JWT)
- Database : MySQL
- Tools : Postman (for API testing)
