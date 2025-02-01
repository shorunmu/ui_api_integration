function signUp(event) {
    // this prevent page refresh
    event.preventDefault();

    // this triggers spinner on the button
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";
    
    // this get data from the input and save it as variables
    const getName = document.getElementById("name").value;
    const getEmail = document.getElementById("email").value;
    const getPassword = document.getElementById("password").value;
    const getConfirmPassword = document.getElementById("confirmPassword").value;

    // this handles data validation
    if (getName === "" || getEmail === "" || getPassword === "" || getConfirmPassword === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#2D85DE'
        })

        getSpin.style.display = "none";
    }

    if (getConfirmPassword !== getPassword) {
        Swal.fire({
            icon: 'warning',
            text: 'Passwords do not match!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }

    else {
        // this converts to fromdata
        const myData = new FormData();
        myData.append("name", getName);
        myData.append("email", getEmail);
        myData.append("password", getPassword);
        myData.append("password_confirmation", getConfirmPassword);

        // this handles your request method
        const regMethod = {
            method: 'POST',
            body: myData
        }

        const url = "https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/register_admin";

        fetch(url, regMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })

                setTimeout(() => {
                    location.href = "index.html"
                }, 5000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }

        })

        .catch(error => {
            console.log('error', error)
            Swal.fire({
                icon: 'info',
                text: `${result.message}`,
                confirmButtonColor: '#2D85DE'
            })
            getSpin.style.display = "none";

        });

    }

}


function logIn(event) {
    // this prevent page refresh
    event.preventDefault();

    // this triggers spinner on the button
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const getEmail = document.getElementById("email").value;
    const getPassword = document.getElementById("password").value;

    if (getEmail === "" || getPassword === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#2D85DE'
        })

        getSpin.style.display = "none";
    }
    else {
        const myData = new FormData();
        myData.append("email", getEmail);
        myData.append("password", getPassword);

        const regMethod = {
            method: 'POST',
            body: myData
        };

        const url = "https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/admin_login";

        fetch(url, regMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.hasOwnProperty("email")) {
                localStorage.setItem("admin", result.token);
                location.href = "dashboard.html"
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
}


function adminDashboard() {
    const getCategories = document.getElementById("category");
    const getLearnmat = document.getElementById("learnmat");
    const getSubCat = document.getElementById("subCat");
    const getQuiz = document.getElementById("quiz");
    const getStudent = document.getElementById("student");
    const getAdmin = document.getElementById("adminId");

    const pageModal = document.querySelector(".pagemodal");
    pageModal.style.display = "block";

    const getToken = localStorage.getItem("admin");
    const myHeader = new Headers();
    myHeader.append("Authorization",  `Bearer ${getToken}`);

    const dashMethod = {
        method: 'GET',
        headers: myHeader
    }

    const url = "https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/admin/admin_dashboardapi";

    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        getCategories.innerHTML = result.total_number_of_categories;
        getLearnmat.innerHTML = result.total_number_of_learningmaterial;
        getSubCat.innerHTML = result.total_number_of_subcategories;
        getQuiz.innerHTML = result.total_number_of_quize;
        getStudent.innerHTML = result.total_number_of_students
        getAdmin.innerHTML = result.admin_name;

        pageModal.style.display = "none";
    })
    .catch(error => console.log('error', error));
}