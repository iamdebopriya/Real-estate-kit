# React + Vite

1. Basic Form Fields Implementation
Purpose: Developed a comprehensive data collection form that captures essential personal, identification, and property-related information. This includes fields for name, mobile number, email, Aadhaar, PAN, date of birth, marital status, occupation, income, address, city, state, pincode, property category, property type, property size, floor number, and facing direction.

2. State Management with useState for Form Data
Purpose: Utilized React’s useState hook to create a centralized formData object. This object manages the state of all input fields in real time, enabling dynamic data binding and easier form handling across the component.

3. Form Validation Logic
Purpose: Implemented a validateForm function to enforce input integrity and ensure data correctness. Validation checks include:

Required fields (e.g., name, email)

Format checks (e.g., email structure, Aadhaar must be 12 digits, PAN must follow alphanumeric rules)

Pattern matching using regular expressions

Trimming and sanitizing input before validation

This approach helps in reducing errors during data submission and ensures reliable backend processing.

4. Error Handling with a Dedicated errors State
Purpose: Created a separate errors state object using useState to track validation errors for each form field. When validation fails, appropriate error messages are stored and can be rendered conditionally next to each form input.

5. Dynamic Fields Management via extraFields Object
Purpose: Introduced an extraFields sub-object within formData to handle optional and dynamic fields such as car parking, payment plans, loan requirements, payment details, and source of information. This structure keeps the main state object organized and scalable for future additions.

6. Advanced Input Types and Dynamic Rendering
Purpose: Integrated various input types such as <select>, <radio>, and <checkbox> to provide users with flexible options. Dynamically mapped over arrays to render multiple options and used the name attribute strategically (e.g., extraFields.carParking) to update nested state properties seamlessly.

7. Conditional and Custom Input Support
Purpose: Included support for free-form text inputs such as “Preferred Financier” and “Other sources of information” to capture details that fall outside predefined options. Ensured these inputs are also bound to formData.extraFields for consistency.

8. Real-Time Live Preview Component
Purpose: Developed a live preview panel that displays all the form data entered by the user in real time. This helps users review their inputs before submission. The component is styled using TailwindCSS with glassmorphism effects for better user experience and visual feedback.

9. Dynamic Estimated Price Calculation
Purpose: Integrated a utility function to calculate and display the estimated pricing of the selected property based on user inputs such as property size, type, and additional features. This enhances the decision-making process for the applicant.

10. TailwindCSS-Based Responsive UI Design
Purpose: Applied TailwindCSS utility classes to design a responsive, clean, and modern user interface. The layout ensures a consistent look and feel across devices, with accessible design considerations and a focus on user experience.
