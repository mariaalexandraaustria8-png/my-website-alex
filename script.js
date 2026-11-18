/* ==========================================================================
   BSIS 1-1 Student Portal Interactive Logic (script.js)
   Requires: jQuery 3.7.1 & Bootstrap 5.3 Bundle
   ========================================================================== */
$(document).ready(function () {
    /* ======================================================================
       1. NAVBAR MOBILE COLLAPSE & ACTIVE LINK HANDLING
       ====================================================================== */
    $("#portalNavbarMenu .nav-link").on("click", function () {
        $("#portalNavbarMenu .nav-link").removeClass("active");
        $(this).addClass("active");

        const $navbarCollapse = $("#portalNavbarMenu");
        if ($navbarCollapse.hasClass("show")) {
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance($navbarCollapse[0]);
            bsCollapse.hide();
        }
    });

    /* ======================================================================
       2. ALERT HELPER FOR ACCESSIBLE FEEDBACK
       ====================================================================== */
    function showPortalAlert(type, title, message) {
        const iconClass = type === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill";
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show shadow-sm rounded-3 d-flex align-items-center" role="alert">
                <i class="bi ${iconClass} fs-5 me-3"></i>
                <div>
                    <strong>${title}</strong> ${message}
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close notification"></button>
            </div>
        `;
        $("#portalAlertContainer").html(alertHtml);
    }

    /* ======================================================================
       3. ACCESSIBLE REGISTRATION FORM VALIDATION & LIVE PROFILE UPDATE
       ====================================================================== */
    $("#studentRegistrationForm").on("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const formEl = this;
        if (!formEl.checkValidity()) {
            $(formEl).addClass("was-validated");
            showPortalAlert("danger", "Validation Error:", "Please fill out all required fields and check the confirmation box.");
            return;
        }

        // Read validated inputs
        const fullName = $("#regFullName").val().trim();
        const email = $("#regEmail").val().trim();
        const course = $("#regCourse").val();
        const yearLevel = $("#regYearLevel").val();

        // Update Student Profile card live
        $("#displayStudentName").text(fullName);
        $("#displayStudentCourse").text(course);
        $("#displayStudentYear").text(yearLevel);

        $(formEl).removeClass("was-validated");
        showPortalAlert(
            "success",
            "Registration Submitted!",
            `Student profile updated for <strong>${$("<div>").text(fullName).html()}</strong> (${$("<div>").text(email).html()}) — ${course}, ${yearLevel}.`
        );

        $("html, body").animate({ scrollTop: 0 }, 300);
    });

    // Clear / Reset Form to Default Adrian C. Magcaling BSIS 1-1 State
    $("#clearFormBtn").on("click", function () {
        $("#regFullName").val("Maria Alexandra D. Austria");
        $("#regEmail").val("mariaalexandraaustria8@student.edu.ph");
        $("#regCourse").val("BS Information Systems");
        $("#regYearLevel").val("1st Year • BSIS 1-1");
        $("#regNotes").val("BSIS 1-1 • Web Development under Prof. Ian Africa");
        $("#regConfirmCheck").prop("checked", false);
        $("#studentRegistrationForm").removeClass("was-validated");

        $("#displayStudentName").text("Maria Alexandra D. Austria");
        $("#displayStudentCourse").text("BS Information Systems");
        $("#displayStudentYear").text("1st Year • BSIS 1-1");

        showPortalAlert("info", "Form Cleared:", "Registration fields and profile have been reset to Maria Alexandra D. Autria (BSIS 1-1).");
    });
});