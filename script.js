$(document).ready(function() {
    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Function to show error icon and tooltip
    function showErrorIcon(element, message) {
        var icon = $(element).next('.error-icon');
        icon.attr('title', message);
        icon.show();
    }

    // Function to hide error icon and tooltip
    function hideErrorIcon(element) {
        var icon = $(element).next('.error-icon');
        icon.hide();
    }

    // Function to calculate tax
    function calculateTax(income, extraIncome, deductions, age) {
        var totalIncome = income + extraIncome - deductions;
        var tax = 0;

        if (totalIncome > 800000) {
            if (age === '<40') {
                tax = 0.3 * (totalIncome - 800000);
            } else if (age === '≥40 & <60') {
                tax = 0.4 * (totalIncome - 800000);
            } else if (age === '≥60') {
                tax = 0.1 * (totalIncome - 800000);
            }
        }

        return tax;
    }

    // Submit form
    $('#taxForm').submit(function(event) {
        event.preventDefault();

        var income = parseFloat($('#income').val());
        var extraIncome = parseFloat($('#extraIncome').val());
        var deductions = parseFloat($('#deductions').val());
        var age = $('#age').val();

        // Validate input fields
        var isValid = true;
        if (isNaN(income)) {
            showErrorIcon('#income', 'Invalid input');
            isValid = false;
        } else {
            hideErrorIcon('#income');
        }
        if (isNaN(extraIncome)) {
            showErrorIcon('#extraIncome', 'Invalid input');
            isValid = false;
        } else {
            hideErrorIcon('#extraIncome');
        }
        if (isNaN(deductions)) {
            showErrorIcon('#deductions', 'Invalid input');
            isValid = false;
        } else {
            hideErrorIcon('#deductions');
        }
        if (age === '') {
            showErrorIcon('#age', 'Please select an option');
            isValid = false;
        } else {
            hideErrorIcon('#age');
        }

        if (isValid) {
            // Calculate tax
            var tax = calculateTax(income, extraIncome, deductions, age);
            $('#resultBody').html('<p>Tax amount: ' + tax.toFixed(2) + ' Lakhs</p>');
            $('#resultModal').modal('show');
        }
    });
});
