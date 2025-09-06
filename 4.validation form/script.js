document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date for delivery date input to today
    const deliveryDateInput = document.getElementById('deliveryDate');
    const today = new Date();
    const minDate = today.toISOString().slice(0, 10); // YYYY-MM-DD
    deliveryDateInput.setAttribute('min', minDate);

    // Event listener for payment method selection
    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const cardDetailsDiv = document.getElementById('cardDetails');

    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Credit Card') {
                cardDetailsDiv.style.display = 'block';
                // Make card fields required when selected
                document.getElementById('cardNumber').setAttribute('required', 'true');
                document.getElementById('expiryDate').setAttribute('required', 'true');
                document.getElementById('cvv').setAttribute('required', 'true');
            } else {
                cardDetailsDiv.style.display = 'none';
                // Remove required attribute when not selected
                document.getElementById('cardNumber').removeAttribute('required');
                document.getElementById('expiryDate').removeAttribute('required');
                document.getElementById('cvv').removeAttribute('required');
                // Clear any potential errors if hidden
                clearError('cardNumberError');
                clearError('expiryDateError');
                clearError('cvvError');
            }
        });
    });
});


function validateForm() {
    let isValid = true;

    // Helper function to show error
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.innerText = message;
            const inputElement = document.getElementById(elementId.replace('Error', ''));
            if (inputElement) {
                inputElement.classList.add('input-error');
            }
        }
    }

    // Helper function to clear error
    function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.innerText = '';
            const inputElement = document.getElementById(elementId.replace('Error', ''));
            if (inputElement) {
                inputElement.classList.remove('input-error');
            }
        }
    }

    // Reset all previous errors
    document.querySelectorAll('.error-message').forEach(el => clearError(el.id));
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));


    // --- Basic JavaScript Validation (8 Elements) ---

    // 1. Full Name (Improved Validation)
    const fullName = document.getElementById('fullName');
    // Allows letters, spaces, hyphens, apostrophes, and dots
    const namePattern = /^[a-zA-Z\s'-.]+$/;
    if (fullName.value.trim() === '') {
        showError('fullNameError', 'Full Name is required.');
        isValid = false;
    } else if (!namePattern.test(fullName.value)) {
        showError('fullNameError', 'Full Name can only contain letters, spaces, hyphens, apostrophes, and dots.');
        isValid = false;
    } else {
        clearError('fullNameError');
    }

    // 2. Email
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        showError('emailError', 'Email is required.');
        isValid = false;
    } else if (!emailPattern.test(email.value)) {
        showError('emailError', 'Please enter a valid email address.');
        isValid = false;
    } else {
        clearError('emailError');
    }

    // 3. Phone Number
    const phone = document.getElementById('phone');
    const phonePattern = /^[0-9]{10}$/;
    if (phone.value.trim() === '') {
        showError('phoneError', 'Phone Number is required.');
        isValid = false;
    } else if (!phonePattern.test(phone.value)) {
        showError('phoneError', 'Phone Number must be 10 digits.');
        isValid = false;
    } else {
        clearError('phoneError');
    }

    // 4. Gender
    const gender = document.getElementById('gender');
    if (gender.value === '') {
        showError('genderError', 'Please select your Gender.');
        isValid = false;
    } else {
        clearError('genderError');
    }

    // 5. Plot/House Number
    const plotNumber = document.getElementById('plotNumber');
    if (plotNumber.value.trim() === '') {
        showError('plotNumberError', 'Plot/House Number is required.');
        isValid = false;
    } else if (!/^[a-zA-Z0-9\s/,-]+$/.test(plotNumber.value)) {
        showError('plotNumberError', 'Invalid characters in Plot/House Number (e.g., A-Z, 0-9, /, -, comma).');
        isValid = false;
    } else {
        clearError('plotNumberError');
    }

    // 6. Street Name
    const streetName = document.getElementById('streetName');
    if (streetName.value.trim() === '') {
        showError('streetNameError', 'Street Name is required.');
        isValid = false;
    } else if (!/^[a-zA-Z0-9\s.,'-]+$/.test(streetName.value)) {
        showError('streetNameError', 'Invalid characters in Street Name (e.g., A-Z, 0-9, space, comma, dot, hyphen, apostrophe).');
        isValid = false;
    } else {
        clearError('streetNameError');
    }

    // 7. District
    const district = document.getElementById('district');
    if (district.value.trim() === '') {
        showError('districtError', 'District is required.');
        isValid = false;
    } else if (!/^[a-zA-Z\s.-]+$/.test(district.value)) {
        showError('districtError', 'Invalid characters in District (e.g., A-Z, space, dot, hyphen).');
        isValid = false;
    } else {
        clearError('districtError');
    }

    // 8. State
    const state = document.getElementById('state');
    if (state.value.trim() === '') {
        showError('stateError', 'State is required.');
        isValid = false;
    } else if (!/^[a-zA-Z\s.-]+$/.test(state.value)) {
        showError('stateError', 'Invalid characters in State (e.g., A-Z, space, dot, hyphen).');
        isValid = false;
    } else {
        clearError('stateError');
    }

    // --- HTML5 Self-Validating Elements & Additional JS ---

    // Pincode (pattern="[0-9]{6}" and required in HTML)
    const pincode = document.getElementById('pincode');
    if (!pincode.checkValidity()) {
        showError('pincodeError', 'Pincode must be 6 digits.');
        isValid = false;
    } else {
        clearError('pincodeError');
    }

    // Car Make (required in HTML, datalist for suggestions)
    const carMake = document.getElementById('carMake');
    if (carMake.value.trim() === '') {
        showError('carMakeError', 'Car Make is required.');
        isValid = false;
    } else {
        clearError('carMakeError');
    }

    // Accessory Type (required in HTML)
    const accessoryType = document.getElementById('accessoryType');
    if (!accessoryType.checkValidity()) {
        showError('accessoryTypeError', 'Please select an Accessory Type.');
        isValid = false;
    } else {
        clearError('accessoryTypeError');
    }

    // Accessories Checkbox (at least one must be selected)
    const checkboxes = document.querySelectorAll('input[name="accessories"]:checked');
    if (checkboxes.length === 0) {
        showError('accessoriesError', 'Please select at least one accessory.');
        isValid = false;
    } else {
        clearError('accessoriesError');
    }

    // Quantity (min="1" max="100" and required in HTML)
    const quantity = document.getElementById('quantity');
    if (!quantity.checkValidity()) {
        showError('quantityError', 'Quantity must be between 1 and 100.');
        isValid = false;
    } else {
        clearError('quantityError');
    }

    // Preferred Delivery Date (min date and required in HTML)
    const deliveryDate = document.getElementById('deliveryDate');
    if (!deliveryDate.checkValidity()) {
        showError('deliveryDateError', 'Please select a valid future delivery date.');
        isValid = false;
    } else {
        clearError('deliveryDateError');
    }

    // Payment Method (Radio buttons)
    const paymentMethodSelected = document.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentMethodSelected) {
        showError('paymentMethodError', 'Please select a payment method.');
        isValid = false;
    } else {
        clearError('paymentMethodError');

        // Conditional validation for Credit Card details
        if (paymentMethodSelected.value === 'Credit Card') {
            const cardNumber = document.getElementById('cardNumber');
            const expiryDate = document.getElementById('expiryDate');
            const cvv = document.getElementById('cvv');

            if (!cardNumber.checkValidity()) {
                showError('cardNumberError', 'Card Number must be 13-16 digits.');
                isValid = false;
            } else {
                clearError('cardNumberError');
            }

            if (!expiryDate.checkValidity()) {
                showError('expiryDateError', 'Please enter a valid expiry month/year.');
                isValid = false;
            } else {
                // Additional JS check for expiry date to be in the future
                const [year, month] = expiryDate.value.split('-').map(Number);
                const currentYear = new Date().getFullYear();
                const currentMonth = new Date().getMonth() + 1; // getMonth is 0-indexed

                if (year < currentYear || (year === currentYear && month < currentMonth)) {
                    showError('expiryDateError', 'Expiry date cannot be in the past.');
                    isValid = false;
                } else {
                    clearError('expiryDateError');
                }
            }

            if (!cvv.checkValidity()) {
                showError('cvvError', 'CVV must be 3 or 4 digits.');
                isValid = false;
            } else {
                clearError('cvvError');
            }
        }
    }


    if (isValid) {
        alert('Form submitted successfully! Thank you for your order.');
        // In a real application, you would send this data to your backend.
        const formData = new FormData(document.getElementById('orderForm'));
        const data = {};
        for (let [key, value] of formData.entries()) {
            if (key === 'accessories') {
                if (!data[key]) data[key] = [];
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }
        console.log('Form Data:', data);
        // document.getElementById('orderForm').reset(); // Optionally reset form after successful submission
    }

    return isValid;
}