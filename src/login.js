function getUserInfo(){

    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;

    const userData = {
        email: email,
        password: password
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        else if(email=='' || password==''){
            alert('all fieldssssss are required');
        }
        
        else if (response.status == 401) {
            // Invalid email or password, show alert to the user
            
            alert('Invalid email or password');
            document.getElementById('email').value='',
            document.getElementById('password').value='';
            
            // Optionally, clear the password field or take other actions
        }
        else if(response.status==404){
            alert("invalid user")
        }
        else {
            throw new Error('Network response was not ok');
        }
    }).then(data => {
        if (data &&data.success) {
            //check if password matches
            
            // Redirect based on role
            switch(data.role) {
                case 'Admin':
                    window.location.href = 'admin.html';
                    break;
                case 'Staff':
                    window.location.href = 'staff.html';
                    break;
                case 'Tenant':
                    //dont forget to change to tenant.html after it has been designed
                    window.location.href = 'ResidentHomepage.html';
                    break;
                default:
                    alert('Unknown role');
            }
        }
        // } else {
        //     alert('Invalid email or password');
        // }
    })
    
    .catch(error => {
        console.error('Error:', error);
        alert("An error occured. Please try again");
     
    });

}




