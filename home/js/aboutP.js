let failCount=0;
function validate(){
   var isFNStartWCapLetter = firstName.value.charAt(0) === firstName.value.charAt(0).toUpperCase();
   var isLNStartWCapLetter = lastName.value.charAt(0) === lastName.value.charAt(0).toUpperCase();
   var isEmailValidation = email.value.lastIndexOf(".com")== email.value.length-4;
   var isTel10NumAndStart0 = phoneNumber.value.length == 10 && phoneNumber.value[0] === `0`;
   var isMessUnder20 = massage.value.length <= 30;

   if(isFNStartWCapLetter && isLNStartWCapLetter && isEmailValidation && isTel10NumAndStart0 && isMessUnder20){
    failCount = 0;
    alert("form send successfully!");
    return true;
   } else{
       failCount++
       
       if(failCount===4){
        alert("oppps! check again your details..")
            firstName.disabled = true;
            lastName.disabled = true;
            email.disabled = true;
            phoneNumber.disabled = true;
            message.disabled = true;
            btn.disabled = true;

            alert("You need to wait 30 seconds before the next attempt.");
            
            var mySeconds = 30;
                  interval =  setInterval(function () {
                      mySeconds--;
                      counter.textContent = `${mySeconds} seconds left to restart form`;
                      if(mySeconds ===0){
                          clearInterval(interval)
                          counter.textContent ="";
                      }
                    }, 1000);

            setTimeout(function () {
                firstName.disabled = false;
                lastName.disabled = false;
                message.disabled = false;
                email.disabled = false;
                phoneNumber.disabled = false;

                span1.innerHTML = "";
                span2.innerHTML = "";
                span3.innerHTML = "";
                span4.innerHTML = "";
                span5.innerHTML = "";
                firstName.style.border = "0.5px solid black";
                lastName.style.border = "0.5px solid black";
                message.style.border = "0.5px solid black";
                email.style.border = "0.5px solid black";
                phoneNumber.style.border = "0.5px solid black";
            }, 30000);
        }

    if(!isFNStartWCapLetter){
        span1.innerText = "*first character isn't uppercase!";
        span1.style.color ="red";
        firstName.style.border = "1.5px solid red";
    }
    if(!isLNStartWCapLetter){
        span2.innerHTML = "*last name is over 20 characters";
        span2.style.color ="red";
        lastName.style.border = "1.5px solid red";
    }
    if(!isEmailValidation){
        span3.innerHTML = "*email ia not ended with:`.com`";
        span3.style.color = "red";
        email.style.border = "1.5px solid red";
    }
    if(!isMessUnder20){
        span5.innerHTML = "*message is over 30 characters";
        span5.style.color ="red";
        message.style.border = "1.5px solid red";
    }
    if(!isTel10NumAndStart0){
        span4.innerHTML = "*start your phone number with 0!";
        span4.style.color ="red";
        phoneNumber.style.border = "1.5px solid red";
    }
    return false;
   }
}
