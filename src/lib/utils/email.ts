export const validateEmail = (email: string): boolean => {
    // Function to check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
    return emailRegex.test(email); // Return the result of the test
};
