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


    // --- Basic JavaScript Validation (All relevant elements) ---

    // 1. Full Name
    const fullName = document.getElementById('fullName');
    const namePattern = /^[a-zA-Z\s'-.]+$/; // Allows letters, spaces, hyphens, apostrophes, and dots
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

    // 4. Delivery Address
    const deliveryAddress = document.getElementById('deliveryAddress');
    if (deliveryAddress.value.trim() === '') {
        showError('deliveryAddressError', 'Delivery Address is required.');
        isValid = false;
    } else if (deliveryAddress.value.trim().length < 15) { // Simple length check
        showError('deliveryAddressError', 'Please enter a more complete address.');
        isValid = false;
    } else {
        clearError('deliveryAddressError');
    }

    // 5. Car Make
    const carMake = document.getElementById('carMake');
    if (carMake.value.trim() === '') {
        showError('carMakeError', 'Car Make is required.');
        isValid = false;
    } else {
        clearError('carMakeError');
    }

    // 6. Accessories Checkbox (at least one must be selected)
    const checkboxes = document.querySelectorAll('input[name="accessories"]:checked');
    if (checkboxes.length === 0) {
        showError('accessoriesError', 'Please select at least one accessory.');
        isValid = false;
    } else {
        clearError('accessoriesError');
    }

    // 7. Quantity
    const quantity = document.getElementById('quantity');
    if (!quantity.checkValidity()) { // HTML5 min/max validation
        showError('quantityError', 'Quantity must be between 1 and 10.');
        isValid = false;
    } else {
        clearError('quantityError');
    }

    // 8. Preferred Delivery Date
    const deliveryDate = document.getElementById('deliveryDate');
    if (!deliveryDate.checkValidity()) { // HTML5 min date validation
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
                const [year, month] = expiryDate.value.split('-').map(Number);
                const currentYear = new Date().getFullYear();
                const currentMonth = new Date().getMonth() + 1;

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
    }

    return isValid;
}