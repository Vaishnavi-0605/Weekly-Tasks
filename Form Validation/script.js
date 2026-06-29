const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;


    const name =document.querySelector("#name").value;

    if(name == ""){
        document.querySelector("#name-err").style.display = "block";
        valid = false;
    }

    const age = document.querySelector("#age").value;
    if(age == "" || age< 18){
        document.querySelector("#age-err").style.display = "block";
        valid = false;
    }

    const gender = document.querySelector('input[name="gender"]:checked');
    if(gender == null) {
        document.querySelector("#gender-err").style.display = "block";
        valid = false;
    }


    const contact = document.querySelector("#contact").value;
    if(!/^\d{10}$/.test(contact)){
        document.querySelector("#contact-err").style.display = "block";
        valid = false;
    }

    const email =document.querySelector("#email").value;

    const emailreg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailreg.test(email)) {
        document.querySelector("#email-err").style.display = "block";
        valid=false;
    }

    const idproof = document.querySelector("#idproof").value;
    if(idproof=="") {
        document.querySelector("#idproof-err").style.display= "block";
        valid = false;
    }

    const specdoc = document.querySelector("#specdoc").value;

    if(idproof == "Other, please specify" && specdoc == ""){
        document.querySelector("#specdoc-err").style.display= "block";
        valid = false;
    }

    const file = document.querySelector("#file").value;

    if(file == ""){
        document.querySelector("#file-err").style.display= "block";
        valid = false;
    }

    const address = document.querySelector('input[name="addr"]:checked');

    if(address == null){
        document.querySelector("#address-err").style.display= "block";
        valid = false;
    }

    const floors = document.querySelector("#floors").value;

    if (floors == "") {
        document.querySelector("#floors-err").style.display= "block";
        valid = false;
    }


    const floorno = document.querySelector("#floorno").value;

    if (floorno == "") {
        document.querySelector("#floorno-err").style.display= "block";
        valid = false;
    }


    const landmark = document.querySelector("#landmark").value.trim();

    if (landmark == "") {
        document.querySelector("#landmark-err").style.display= "block";
        valid = false;
    }

    const street = document.querySelector("#street").value.trim();

    if (street == ""){
        document.querySelector("#street-err").style.display= "block";
        valid = false;
    }

    const city = document.querySelector("#city").value.trim();
    if (city == ""){
        document.querySelector("#city-err").style.display= "block";
        valid = false;
    }

    const state = document.querySelector("#state").value.trim();
    if (state == ""){
        document.querySelector("#state-err").style.display = "block";
        valid = false;
    }

    const pin = document.querySelector("#pin").value;
    if (!/^\d{6}$/.test(pin)){
        document.querySelector("#pin-err").style.display = "block";
        valid = false;
    }

    const country = document.querySelector("#country").value.trim();
    if (country == ""){
        document.querySelector("#country-err").style.display = "block";
        valid = false;
    }

    const pass = document.querySelector("#pass").value;
    if (pass.length < 8)
        {
        document.querySelector("#pass-err").style.display = "block";
        valid = false;
    }

  const strength = document.querySelector("#strength");
    if (/^[A-Za-z]+$/.test(pass)){
        strength.textContent = "Weak Password";
        strength.style.color = "red";
    }
    else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(pass)){
        strength.textContent = "Medium Password";
        strength.style.color = "orange";
    }
    else if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/.test(pass)) {
        strength.textContent = "Strong Password";
        strength.style.color = "green";
    }
    else{
    strength.textContent = "";
    }


    const cpass = document.querySelector("#c-pass").value;
    if (pass != cpass) 
        {
            document.querySelector("#c-pass-err").style.display = "block";
            valid = false;
        }

    if(valid){
        alert("Registration Successful!");
    }
    

});