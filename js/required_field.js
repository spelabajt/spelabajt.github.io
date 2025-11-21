document.addEventListener("DOMContentLoaded", function () {

    // FUNKCIJA ZA VSE LINK ELEMENTE S CLASS="link"
    document.querySelectorAll('.link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            Swal.fire({
                title: "Oops!",
                text: "Please try to recall what you entered earlier.",
                icon: "question",
                confirmButtonText: "OK",
				iconColor: "black",       
				confirmButtonColor: "#d71920"
            });
        });
    });

});

document.addEventListener('DOMContentLoaded', function () {
	// ===== VALIDACIJA OBRAZCA =====
	const form = document.getElementById('regForm');

	const fields = Array.from(form.querySelectorAll('input[required], select[required]')).map(input => {
		const box = input.closest('div');
		const error = box.querySelector('.error');
		return { input, box, error };
	});

	function validateField(item) {
		const val = item.input.value.trim();
		let valid = true;

		if (val === '') valid = false;
		if (item.input.type === 'email' && val !== '') {
			const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
			if (!ok) valid = false;
		}

		if (!valid) {
			item.error.style.display = 'block';
			item.box.classList.add('error-box');
		} else {
			item.error.style.display = 'none';
			item.box.classList.remove('error-box');
		}

		return valid;
	}

	fields.forEach(item => {
		item.input.addEventListener('blur', () => validateField(item));
		item.input.addEventListener(item.input.tagName.toLowerCase() === 'select' ? 'change' : 'input', () => {
			if (item.error) {
				item.error.style.display = 'none';
				item.box.classList.remove('error-box');
			}
		});
	});

	form.addEventListener('submit', function (e) {
		let allValid = true;
		fields.forEach(item => {
			if (!validateField(item)) allValid = false;
		});
		if (!allValid) e.preventDefault();
	});

	// ===== OMEJITEV DATUMA (max = danes - 16 let) =====
	const dateInput = form.querySelector('input[type="date"]');
	if (dateInput) {
		const today = new Date();
		const sixteenYearsAgo = new Date(
			today.getFullYear() - 16,
			today.getMonth(),
			today.getDate()
		);
		dateInput.max = sixteenYearsAgo.toISOString().split('T')[0];
	}

	// ===== DELO Z EMAILOM (odklepanje polj) =====
	const emailInput = document.getElementById("email");

	if (emailInput) {
		const allFields = form.querySelectorAll("input, select, button");
		const otherFields = Array.from(allFields).filter(el => el !== emailInput);

		const belowEmailSection = document.createElement("div");
		belowEmailSection.classList.add("below-email");

		const formChildren = Array.from(form.children).slice(1);
		formChildren.forEach(el => belowEmailSection.appendChild(el));
		form.appendChild(belowEmailSection);

		function isValidEmail(email) {
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailPattern.test(email);
		}

		function toggleFields(disabled) {
			otherFields.forEach(el => el.disabled = disabled);
			if (disabled) {
				belowEmailSection.classList.add("blurred");
			} else {
				belowEmailSection.classList.remove("blurred");
			}
		}

		// Na začetku zaklenemo vsa polja pod emailom
		toggleFields(true);

		emailInput.addEventListener("input", function () {
			if (isValidEmail(emailInput.value)) {
				toggleFields(false);
			} else {
				toggleFields(true);
			}
		});
	}
});

// ===== OB KLIKU NA GUMB USTVARI RAČUN =====
document.getElementById('create-account').addEventListener('click', function(e) {
	e.preventDefault(); // prepreči privzeto oddajo obrazca

	const form = document.getElementById('regForm');
	const requiredFields = form.querySelectorAll('input[required], select[required]');
	let allFilled = true;

	requiredFields.forEach(field => {
		if (!field.value.trim()) {
			allFilled = false;
		}
	});

	if (!allFilled) {
		Swal.fire({
			icon: "error",
			title: "You haven’t filled in all the fields.",
			text: "Check and try again.",
			iconColor: "#d71920",       
			confirmButtonColor: "#d71920"
		});
	} else {
		Swal.fire({
			title: "You have successfully registered!",
			icon: "success",
			iconColor: "black",       
			confirmButtonColor: "#d71920",
			draggable: true
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.href = 'html/index.html';
			}
		});
	}
});


