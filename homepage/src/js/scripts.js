$("#email-register-btn").click(function () {
  subscribe();
});

function subscribe() {
  $("#error-msg").hide();
  $("#email-input").removeClass("error");
  var email = $("#email-input").val();

  if (!email.trim()) {
    $("#email-input").addClass("error");
    $("#error-msg").show();
    $("#error-msg").text("Enter your email!");
  } else if (validateEmail(email.trim())) {
    $.ajax({
      url: "https://1o82afhqg8.execute-api.us-east-1.amazonaws.com/PROD/subscribe",
      method: "POST",
      data: {
        email: email,
        source: "exclusive_promocode_main_page",
      },
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        $("#success-msg").show();
        $("#success-msg").text("You were subscribe successfully!");

        setTimeout(() => {
          window.location.href =
            "https://exclusive-promocode.com/surveys/?cpid=7254b785-c7e9-453d-9259-18682b7b638c&target=exclusive_promocode&clickid={clickid}";
        }, 2000);
      },
      error: function (err) {
        $("#error-msg").text("An error occured!");
      },
    });
  } else {
    $("#email-input").addClass("error");
    $("#error-msg").show();
    $("#error-msg").text("Invalid email!");
  }
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
