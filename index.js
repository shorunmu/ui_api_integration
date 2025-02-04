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




function topThree() {
    const getStudent = document.querySelector(".allstudent")
    const getToken = localStorage.getItem("admin");
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${getToken}`);

    const dashMethod = {
        method: 'GET',
        headers: myHeader
    }

    let data = [];

    const url = "https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/admin/top_three_students";

    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)

        if (result.length === 0) {
            getStudent.innerHTML = "No Record Found"
        }
        else {
            result.map((item) => {
                data += `
                    <div class="search-card">
                    <div class="d-flex justify-content-between">
                        <p>Name:</p>
                        <p>${item.name}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p>Email:</p>
                        <p>${item.email.slice(0, 18)}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p>Phone Number:</p>
                        <p>${item.phone_number}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p>Position:</p>
                        <p>${item.position}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p>Total Score:</p>
                        <p>${item.total_score}</p>
                    </div>
                    </div>
              `
              getStudent.innerHTML = data;
            })
        }

    })
    .catch(error => console.log('error', error));

}

function studentModal(event) {
    event.preventDefault();

    const getModal = document.getElementById("dash-modal");
    getModal.style.display = "block";

    topThree();
}

function closeDashModal() {
    const getModal = document.getElementById("dash-modal");
    getModal.style.display = "none"
}



function getAllStudent(){
    const getAllStudent = document.getElementById("table-id")
    const getToken = localStorage.getItem("admin");
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${getToken}`);

    const dashMethod = {
        method: 'GET',
        headers: myHeader
    }

    let data = [];

    const url = "https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/admin/get_all_students";

    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)

        if (result.length === 0) {
            getAllStudent.innerHTML = "No Record Found"
        }
        else {
            result.map((item) => {
                data += `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.email}</td>
                      <td>${item.phone_number}</td>
                      <td>${item.position}</td>
                      <td>${item.total_score}</td>
                      
                    </tr>
                `    
                
              getAllStudent.innerHTML = data;
            })
        }

    })
    .catch(error => console.log('error', error));

}
    

function createCategory(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const getCatName = document.getElementById("cat").value;
    const getCatImg = document.getElementById("imcat").files[0];

    if (getCatName === "" || getCatImg === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#2D85DE'
        })

        getSpin.style.display = "none";
    }

    else {
        const myData = new FormData();
        myData.append("name", getCatName);
        myData.append("image", getCatImg);

        const getToken = localStorage.getItem("admin");
        const myHeader = new Headers();
        myHeader.append("Authorization", `Bearer ${getToken}`);

        const catMethod = {
            method: 'POST',
            headers: myHeader,
            body: myData
        };

        const url = "https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/admin/create_category";

        fetch(url, catMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text:`${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })

                getCatList();

                setTimeout(() => {
                    location.reload()
                }, 3000)
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

function getCatList() {
    const scroll = document.querySelector(".scroll-object");
    const getToken = localStorage.getItem("admin");
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${getToken}`);

    const catMethod = {
        method: 'GET',
        headers: myHeader,
    };

    let data = [];

    const url = "https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/admin/category_list";

    fetch(url, catMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            scroll.innerHTML = "No categories"
        }
        else {
            result.map((item) => {
                data += `
                  <div class="searchcard">
                    <div class="search-card">
                      <img src="${item.image}" alt="${item.name}">
                      <p>${item.name}</p>
                    </div>
                    <div class="text-right">
                      <button class="update-button">Update</button>
                      <button class="delete-button">Delete</button>
                    </div>
                  </div>
                `
                scroll.innerHTML = data;
            })
        }
    })
    .catch(error => console.log('error', error));
}




// function topThree() {
//     const getToken = localStorage.getItem("admin");
//     const myHeader = new Headers();
//     myHeader.append("Authorization",  `Bearer ${getToken}`);


//     const dashMethod = {
//         method: 'GET',
//         headers: myHeader
//     }

//     let data = [];


//     const url = 'cyrilyoruba.juadebgabriel.com/yorubalearning/api/admin/top_three_students';

//     fetch(url, dashMethod)
//     .then(response => response.text())
//     .then(result => {
//         console.log(result)

//         if (result.length)
    
    
    
//     })
//     .catch(error => console.log('error', error));
// }


// function studentModal(event) {
//     event.preventDefault();

//     const getModal = document.getElementById("dashmodal");
//     getModal.style.display ="block";
// }


// function closeDashModal() {

// }






