/**
 * This `custom.js` file is different from one uploaded in BigCommerce File Access (WebDAV) `/content/js/custom.js`.
 */
$(function () {
  $(".home-slider").slick({
    infinite: false,
    arrows: false,
    dots: true,
  });

  $(".home-images").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  });

  productViewSwitching();

  function productViewSwitching() {
    // var gridActive = "https://cdn11.bigcommerce.com/s-zuh1yqpd6u/product_images/uploaded_images/view-by-grid-active.png?t=1584258503&_ga=2.108115851.869439310.1584218597-129864867.1573023823";
    // var grid = "https://cdn11.bigcommerce.com/s-zuh1yqpd6u/product_images/uploaded_images/view-by-grid.png?t=1584258503&_ga=2.108115851.869439310.1584218597-129864867.1573023823";
    // var listActive = "https://cdn11.bigcommerce.com/s-zuh1yqpd6u/product_images/uploaded_images/view-by-list-active.png?t=1584258504&_ga=2.108115851.869439310.1584218597-129864867.1573023823";
    // var list = "https://cdn11.bigcommerce.com/s-zuh1yqpd6u/product_images/uploaded_images/view-by-list.png?t=1584258504&_ga=2.108115851.869439310.1584218597-129864867.1573023823";

    $(".gridView").on("click", function () {
      if ($(this).hasClass("active")) {
        return;
      } else {
        $(".categoryGridView").show();
        $(".categoryListView").hide();
        $(this).addClass("active");
        $(".listView").removeClass("active");
      }
    });

    $(".listView").on("click", function () {
      if ($(this).hasClass("active")) {
        return;
      } else {
        $(".categoryListView").show();
        $(".categoryGridView").hide();
        $(this).addClass("active");
        $(".gridView").removeClass("active");
      }
    });
  }
  $("#sb-close").click(function () {
    $(".navPages-container").removeClass("is-open");
    $(".header").removeClass("is-open");
    $(".header__top .mobileMenu-toggle").removeClass("is-open");
  });

  if (window.location.pathname == "/") {
    // $(".heroCarousel").find("a[data-slick-index='0']").find(".heroCarousel-slide").children(".heroCarousel-image-wrapper").html("<iframe width='100%' height='100%' src='' frameborder='0' allow='autoplay' allowfullscreen></iframe></figure>");
    $(".heroCarousel")
      .find("a[data-slick-index='0']")
      .find(".heroCarousel-slide")
      .children(".heroCarousel-image-wrapper")
      .html(
        "<div class='splash__video-container'>" +
          "<video muted loop autoplay playsinline>" +
          "<source src='https://masters-golf-company-store-1.mybigcommerce.com/content/Mastersgolfpromo14mb.mp4' type='video/mp4 '/>" +
          "</video>" +
          "</div>"
      );
  }
  $("#profession_select option[true]").attr("selected", "selected");
  $("#profession_select").change(function () {
    var sel = $(this);
    var selectval = sel.val();
    if (selectval == "Others") {
      $('input[id="profession_text"]').remove();
      $(
        "<br><input type='text' id='profession_text' class='form-input' placeholder='Please specify'>"
      ).insertAfter(sel);
    } else {
      $('input[id="profession_text"]').remove();
    }
  });
  $("#acc-1")
    .find("span")
    .click(function () {
      window.open("/content/-Size%20Chart%20-.pdf", "_blank");
    });

  $("#editAccount").click(function (e) {
    e.preventDefault();
    if ($("#password_input").val() != $("#confirm_password").val()) {
      $("#editaccountmodal").find("h3").text("");
      $("#editaccountmodal")
        .find("h3")
        .text("Password does not match, kindly check and try again.");
      $("#open-modal").trigger("click");
      return;
    }
    if ($("#profession_text").length > 0) {
      var professionVal = $("#profession_text").val();
      var professionName = "Others";
    } else {
      var professionVal = $("#profession_select").val();
      var professionName = "Profession";
    }

    if ($("#customer-group").text() == "Parents/Consumers") {
      var accountDetails = {
        id: $("#customer-id").val(),
        first_name: $("#firstname_input").val(),
        last_name: $("#lastname_input").val(),
        email: $("#email_input").val(),
        phone: $("#phone_input").val(),
        authentication: {
          new_password: $("#password_input").val(),
        },
      };
    } else {
      var accountDetails = {
        id: $("#customer-id").val(),
        first_name: $("#firstname_input").val(),
        last_name: $("#lastname_input").val(),
        email: $("#email_input").val(),
        phone: $("#phone_input").val(),
        customer_group: "Practitioner 1",
        company: $("#practicename_input").val(),

        authentication: {
          new_password: $("#password_input").val(),
        },
        form_fields: [
          /*{
                    "name":  professionName,
                    "value": professionVal
                },*/
          {
            name: "FormField[1][31]",
            value: $("#profession_select").val(),
          },
          {
            //  "name": "Practice Location",
            name: "FormField[1][47]",
            value: $("#practicename_input").val(),
          },
          {
            //  "name": "Practice Location",
            name: "FormField[1][34]",
            value: $("#practicelocation_select").val(),
          },
          {
            //   "name": "Business Url",
            name: "FormField[1][35]",
            value: $("#url_input").val(),
          },
        ],
      };
    }

    console.log(JSON.stringify(accountDetails));
    $.post({
      url: "https://randem-clients-bc-api.randemcommerce.com/customer/updateCustomer/1653E8E7-8300-4D15-BA7C-064ECB18756F",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(accountDetails),
      beforeSend: function (data) {
        $("#editAccount").text("Saving...");
      },
      success: function (data) {
        $("#editaccountmodal").find("h3").text("");
        $("#editaccountmodal").find("h3").text("Your account has been updated");
        $("#editaccountmodal")
          .find("h3")
          .append(
            '<br><a id="myaccount" href="/account.php?action=account_details">Ok</a>'
          );

        $("#open-modal").trigger("click");

        $('input[type="text"]').val("");
        $('input[type="password"]').val("");
        //$("#country_select")[0].selectedIndex = 0;
        $("#editAccount").text("Register");
      },
      error: function (xhr, textStatus, errorThrown) {
        $("#editaccountmodal").find("h3").text("");
        var data = JSON.parse(xhr.responseText).error;
        var parsedData = JSON.parse(data);
        $("#editaccountmodal")
          .find("h3")
          .append(
            "<span class='error-header'>Edit account failed<h5 style='color: #758591;'>Kindly check the required fields</h5></span><h6><ul class='validation-value' style='margin: 0 7rem;text-align: justify;letter-spacing: 2px;'>"
          );
        $.each(parsedData.errors, function (key, value) {
          $("#editaccountmodal")
            .find(".validation-value")
            .append(
              "<li style='list-style-type: disc; color: #b40000;'>" +
                value +
                "</li>"
            );
          console.log(value);
        });

        $("#open-modal").trigger("click");
        /*$('#parentmodal').find('h3').text('');
                $('#parentmodal').find('h3').html(parsedData.errors['0.email'] + "<br>kindly try other email adress to proceed.");
                $('#open-modal').trigger('click');*/
        console.log(xhr);
        $("#editAccount").text("Register");
      },
    });
  });
  $("#createParentAccount").click(function (e) {
    e.preventDefault();
    /*before ajax post validations */
    if ($("#password_input").val() != $("#confirm_input").val()) {
      $("#parentmodal").find("h3").text("");
      $("#parentmodal")
        .find("h3")
        .text("Password does not match, kindly check and try again.");
      $("#open-modal").trigger("click");
      return;
    }
    /* end before ajax post validations */
    var parentDetails = {
      first_name: $("#firstname_input").val(),
      last_name: $("#lastname_input").val(),
      email: $("#email_input").val(),
      phone: $("#phone_input").val(),
      customer_group: "Parents/Consumers",
      addresses: [
        {
          state_or_province: $("#state_select").val(),
          address1: $("#address_line_1_input").val(),
          address2: $("#address_line_2_input").val(),
          postal_code: $("#postcode_input").val(),
          country_code: $("#country_select").val(),
          city: $("#suburb_input").val(),
        },
      ],
      authentication: {
        new_password: $("#password_input").val(),
      },
    };
    console.log(JSON.stringify(parentDetails));
    $.post({
      url: "https://randem-clients-bc-api.randemcommerce.com/customer/createCustomer/1653E8E7-8300-4D15-BA7C-064ECB18756F",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(parentDetails),
      beforeSend: function (data) {
        $("#createParentAccount").text("Saving...");
      },
      success: function (data) {
        $("#parentmodal").find("h3").text("");
        $("#parentmodal")
          .find("h3")
          .text("New personal account has been added!");

        $("#parentmodal")
          .find("h3")
          .append(
            "<br>" +
              "<p>Thank you for creating an account with us, we hope you enjoy the website and educational information we have created to add to your learning journey. </p>" +
              "<p>Your order history and any digital products you purchase will be shown on your personal dashboard.</p>" +
              "<p>We welcome you to the Munchee Movement.</p>" +
              '<form class="login-form form" action="/login.php?action=check_login" method="post" style="width:100%;">' +
              '<input class="form-input" name="login_email" id="login_email" type="email" style="display:none;" >' +
              '<input class="form-input" id="login_pass" type="password" name="login_pass" autocomplete="off" style="display:none;">' +
              '<input type="submit" class="btn btn--sm btn--brand" value="Go to My Account" style="border:0;">' +
              "</form>"
          );

        $("#open-modal").trigger("click");
        $("#parentmodal").find("#login_email").val($("#email_input").val());
        $("#parentmodal").find("#login_pass").val($("#password_input").val());
        $('input[type="text"]').val("");
        $("#country_select")[0].selectedIndex = 0;
        $("#createParentAccount").text("Register");
      },
      error: function (xhr, textStatus, errorThrown) {
        $("#parentmodal").find("h3").text("");
        var data = JSON.parse(xhr.responseText);
        //var parsedData = JSON.parse(data.error);
        var parsedData = data.error;
        //console.log(parsedData.message);
        $("#parentmodal")
          .find("h3")
          .append(
            "<span class='error-header'>Create account failed<h5 style='color: #758591;'>Kindly check the required fields</h5></span><h6><ul class='validation-value' style='margin: 0 7rem;text-align: justify;letter-spacing: 2px;'>"
          );
        $.each(parsedData.message, function (key, value) {
          if (value == "A valid country_code is required") {
            var value2 = "A valid postcode is required";
          } else if (value == "address1 is required") {
            var value2 = "Address line 1 is required";
          } else {
            var value2 = value;
          }
          console.log(value2);
          $("#parentmodal")
            .find(".validation-value")
            .append(
              "<li style='list-style-type: disc; color: #b40000;'>" +
                value +
                "</li>"
            );
          //console.log(value);
        });

        $("#open-modal").trigger("click");
        /*$('#parentmodal').find('h3').text('');
                    $('#parentmodal').find('h3').html(parsedData.errors['0.email'] + "<br>kindly try other email adress to proceed.");
                    $('#open-modal').trigger('click');*/
        console.log(xhr);
        $("#createParentAccount").text("Register");
      },
    });
  });

  $(document).on("click", "#myaccount", function () {
    $("#trigger-onclick").trigger("click");
  });
  $(".download-content").click(function () {
    window.open("/content/-Size%20Chart%20-.pdf", "_blank");
  });
  $("#createPractitionerAccount").click(function (e) {
    e.preventDefault();
    if ($("#profession_text").length > 0) {
      var professionVal = $("#profession_text").val();
      var professionName = "Others";
    } else {
      var professionVal = $("#profession_select").val();
      var professionName = "Profession";
    }

    if ($("#password_input").val() != $("#confirm_password").val()) {
      $("#loginmodal").find("h3").text("");
      $("#loginmodal")
        .find("h3")
        .text("Password does not match, kindly check and try again.");
      $("#open-modal").trigger("click");
      return;
    }

    var practitionerDetails = {
      first_name: $("#firstname_input").val(),
      last_name: $("#lastname_input").val(),
      email: $("#email_input").val(),
      phone: $("#phone_input").val(),
      customer_group: "Practitioner 1",
      company: $("#practicename_input").val(),
      addresses: [
        {
          state_or_province: $("#state_select").val(),
          address1: $("#address_line_1_input").val(),
          address2: $("#address_line_2_input").val(),
          postal_code: $("#postcode_input").val(),
          country_code: $("#country_select").val(),
          city: $("#suburb_input").val(),
        },
      ],
      authentication: {
        new_password: $("#password_input").val(),
      },
      form_fields: [
        {
          name: "Profession",
          value: $("#profession_select").val(),
        },
        {
          name: "Practice Location",
          value: $("#practicelocation_select").val(),
        },
        {
          name: "BusinessUrl",
          value: $("#url_input").val(),
        },
      ],
    };

    console.log(JSON.stringify(practitionerDetails));
    $.post({
      url: "https://randem-clients-bc-api.randemcommerce.com/customer/createCustomer/1653E8E7-8300-4D15-BA7C-064ECB18756F",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(practitionerDetails),
      beforeSend: function (data) {
        if (
          $("#url_input").val() == "" ||
          $("#practicename_input").val() == ""
        ) {
          $("#loginmodal")
            .find(".validation-value")
            .append(
              "<li style='list-style-type: disc; color: #b40000;'>" +
                data +
                "</li>"
            );
        }
        $("#createPractitionerAccount").text("Saving...");
      },
      success: function (data) {
        //$('.notif').append('<div class="notif-content"><strong>New practitioner account has been added!</strong></div>');
        //alert('New practitioner account has been added!');
        $("#loginmodal")
          .find("h3")
          .text("New practitioner account has been added!");
        $("#loginmodal")
          .find("h3")
          .append(
            "<br>" +
              "<p>Thank you for creating an account with us, we hope you enjoy the website and educational information we have created to add to your learning journey. </p>" +
              "<p>Your order history and any digital products you purchase will be shown on your personal dashboard.</p>" +
              "<p>We welcome you to the Munchee Movement.</p>" +
              '<form class="login-form form" action="/login.php?action=check_login" method="post" style="width:100%;">' +
              '<input class="form-input" name="login_email" id="login_email" type="email" style="display:none;">' +
              '<input class="form-input" id="login_pass" type="password" name="login_pass" autocomplete="off"  style="display:none;">' +
              '<input type="submit" class="btn btn--sm btn--brand" value="Go to My Account" style="border:0;">' +
              "</form>"
          );
        $("#open-modal").trigger("click");

        //window.location="/login.php";
        $("#loginmodal").find("#login_email").val($("#email_input").val());
        $("#loginmodal").find("#login_pass").val($("#password_input").val());
        $('input[type="text"]').val("");
        //$('input[type="password"]').val('');
        $("#country_select")[0].selectedIndex = 0;
        $("#profession_select")[0].selectedIndex = 0;
        $("#createPractitionerAccount").text("Register");
      },
      error: function (xhr, textStatus, errorThrown) {
        $("#loginmodal").find("h3").text("");

        var data = JSON.parse(xhr.responseText);
        //var parsedData = JSON.parse(data.error);
        var parsedData = data.error;
        //console.log(parsedData.message);
        $("#loginmodal")
          .find("h3")
          .append(
            "<span class='error-header'>Create account failed<h5 style='color: #758591;'>Kindly check the required fields</h5></span><h6><ul class='validation-value' style='margin: 0 7rem;text-align: justify;letter-spacing: 2px;'>"
          );
        $.each(parsedData.message, function (key, value) {
          if (value == "address1 is required") {
            var value2 = "Address line 1 is required";
          } else if (value == "email is required") {
            var value2 = "Account email is required";
          } else if (value == "A valid country_code is required") {
            var value2 = "A valid postcode is required";
          } else if (value == "BusinessUrl is required") {
            var value2 = "Business Url is required";
          } else {
            var value2 = value;
          }
          console.log(value2);
          $("#loginmodal")
            .find(".validation-value")
            .append(
              "<li style='list-style-type: disc; color: #b40000;'>" +
                value2 +
                "</li>"
            );
          //console.log(value);
        });

        $("#open-modal").trigger("click");
        /*$('#parentmodal').find('h3').text('');
                    $('#parentmodal').find('h3').html(parsedData.errors['0.email'] + "<br>kindly try other email adress to proceed.");
                    $('#open-modal').trigger('click');*/
        $("#createPractitionerAccount").text("Register");
      },
    });
  });

  //alert();
  var index1 = $(".custom-fields").eq(2).text();
  var index2 = $(".custom-fields").eq(3).text();
  var index3 = $(".custom-fields").eq(4).text();
  var index4 = $(".custom-fields").eq(5).text();
  var index5 = $(".custom-fields").eq(6).text();
  var index6 = $(".custom-fields").eq(7).text();
  var index7 = $(".custom-fields").eq(8).text();
  var index8 = $(".custom-fields").eq(9).text();
  var index9 = $(".custom-fields").eq(10).text();
  var index10 = $(".custom-fields").eq(11).text();
  $(".product-data").append(
    '<td style="border: 1px solid #000; padding: 1rem;">' +
      index1 +
      "</td>" +
      '<td style="border: 1px solid #000; padding: 1rem;">' +
      index2 +
      "</td>" +
      '<td style="border: 1px solid #000; padding: 1rem;">' +
      index3 +
      "</td>"
  );

  $(".product-size-data").append(
    '<td style="border: 1px solid #000; padding: 1rem;">' +
      index4 +
      "</td>" +
      '<td style="border: 1px solid #000; padding: 1rem;">' +
      index5 +
      "</td>" +
      '<td style="border: 1px solid #000; padding: 1rem;">' +
      index6 +
      "</td>"
  );

  $("#note-description").append(" " + index7 + " " + index8);
  $("#tab-shipping")
    .find(".productView-info-value")
    .append(" " + index9 + " " + index10);

  $("#mypractice-indicator").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("section#mypractice").offset().top,
      },
      100
    );
  });

  $();
  /*unloading modal video contents */
  $("#vimeo-video")
    .find(".modal-close")
    .click(function () {
      var url = $("#vimeo-player");
      url.attr("src", "");
    });
  $("#slick-slide00").click(function () {
    var url = $("#vimeo-player");
    url.attr("src", $("#vimeo-video").find(".modal-close").attr("data-link"));
  });
  $(".navUser-action.signup").click(function () {
    $(".signup-dropdown").toggleClass("active");
  });

  var login_status = $("#loggedin-indicator");
  var mypractice_status = $("#mypractice-indicator");
  var mytraining_status = $("#mytraining-indicator");
  var myproducts_status = $("#myproducts-indicator");
  var video_status = $("#video-indicator");
  if ($("#customer-group").text() == "Practitioner 1") {
    login_status.attr("href", "#freeresource");
    mypractice_status.attr("href", "#mypractice");
    mytraining_status.attr("href", "/munchee-u-online-protocols/");
    myproducts_status.attr("href", "/shop/");
    video_status.attr("href", "/for-practitioners/#freesource");
  } else {
    login_status.attr("href", "#modal-customer-group");
    login_status.attr("data-reveal-id", "modal-customer-group");

    mypractice_status.attr("href", "#mypractice");
    mypractice_status.attr("data-reveal-id", "mypractice");

    mytraining_status.attr("href", "#mytraining");
    mytraining_status.attr("data-reveal-id", "mytraining");

    myproducts_status.attr("href", "#myproducts");
    myproducts_status.attr("data-reveal-id", "myproducts");

    video_status.attr("href", "#videos-modal");
    video_status.attr("data-reveal-id", "videos-modal");
  }

  /* consumers product sizes */

  if (
    $("#sku-id").text() == "BEBE" &&
    $("#customer-group").text() != "Practitioner 1"
  ) {
    $("#product-table").remove();
    $("#product-sizes").remove();
  }
  if ($("#customer-group").text() != "Practitioner 1") {
    $("#product-sizes").remove();
  }

  /*homepage video banner */
  $("#overlay").click(function () {
    $("#video-play").find("iframe").trigger("click");
  });
  /* end video banner */

  $(".section-boss")
    .find(".read-more")
    .each(function () {
      $(this).click(function () {
        $(".boss-story-description").toggle();

        if ($(".boss-story-description").hasClass("active")) {
          $(".boss-story-description").removeClass("active");
          $(this).html("Read More >");
        } else {
          $(".boss-story-description").addClass("active");
          $(this).html("Read Less <");
        }
      });
    });
  $(".section-ceo")
    .find(".read-more")
    .each(function () {
      $(this).click(function () {
        $(".ceo-story-description").toggle();

        if ($(".ceo-story-description").hasClass("active")) {
          $(".ceo-story-description").removeClass("active");
          $(this).html("Read More >");
        } else {
          $(".ceo-story-description").addClass("active");
          $(this).html("Read Less <");
        }
      });
    });

  var signininterval = setInterval(function () {
    if ($("#customer-group").text() == "Parents/Consumers") {
      //console.log("Customer is logged in");
      $(".practitioner").find(".section-2").hide();
      $(".practitioner").find(".section-2").css("display", "none");
      localStorage.removeItem("viewed");
      clearInterval(signininterval);
    } else {
      //console.log("Customer is logged out");
      //$('.practitioner').find('.section-2').hide();
      //sessionStorage.removeItem('viewed');
      $(".practitioner").find(".section-2").show();
      $(".practitioner").find(".section-2").css("display", "block");
    }

    if (
      $(".productView-details").find("#sku-id").text() == "BEBE" &&
      $("#customer-group").text() == "Practitioner 1"
    ) {
      $(".productView-details")
        .find(".price--withoutTax")
        .append(
          '<span style="color: #ea1947;"> &nbsp; (Buy 10 BEBE and get the 11th for FREE!)</span>'
        );
    } else if (
      $(".productView-details").find("#sku-id").text() == "BEBE" &&
      $("#customer-group").text() == "Munchee Support Team"
    ) {
      $(".productView-details")
        .find(".price--withoutTax")
        .append(
          '<span style="color: #ea1947;"> &nbsp; (Buy 10 BEBE and get the 11th for FREE!)</span>'
        );
    }
    if (
      $("#customer-group").text() == "Practitioner 1" ||
      $("#customer-group").text() == "Munchee Support Team"
    ) {
      $(".productGrid")
        .find('.product .card-title:contains("Bebe Munchee")')
        .siblings()
        .append(
          '<br><span style="color: #ea1947; font-size: 1.2rem; font-weight:700;">(Buy 10 and GET 1 for FREE!)</span>'
        );
      $(".cart-list")
        .find('.cart-item-name:contains("Bebe Munchee")')
        .append(
          '<br><span style="color: #ea1947; font-size: 1.5rem; font-weight:700;">(Buy 10 and GET 1 for FREE!)</span>'
        );
    }
    if ($("#loggedin-name").text() == "") {
      $("#welcome-note").append("");
    } else {
      var a = $("#loggedin-name").text();
      var cropped = a;
      if (a.indexOf(" ") >= 0) cropped = a.substr(0, a.indexOf(" "));

      $("#welcome-note").append(
        '<span>Hi, Welcome <span id="customer-name">' +
          cropped +
          "</span>!</span>"
      );

      $("#main-content").addClass("acct-login");
    }

    if ($("#selected-currency").text() == "AUD") {
      $(".price--withoutTax").append(
        '<br><span style="font-size: 1.2rem;font-style: italic;">(exclusive of Taxes)</span>'
      );
    }

    if ($(".productView-options__qty > div").length < 1) {
      $(".shipping-stock").find("div").eq(1).text("");
      $(".shipping-stock")
        .find("div")
        .eq(1)
        .append(
          '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="30px" viewBox="0 0 122.879 122.879" enable-background="new 0 0 122.879 122.879" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#FF4141" d="M61.44,0c33.933,0,61.439,27.507,61.439,61.439 s-27.506,61.439-61.439,61.439C27.507,122.879,0,95.372,0,61.439S27.507,0,61.44,0L61.44,0z M73.451,39.151 c2.75-2.793,7.221-2.805,9.986-0.027c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.076,12.249 c2.729,2.77,2.689,7.257-0.08,10.022c-2.773,2.765-7.23,2.758-9.955-0.013L61.446,71.54L49.428,83.728 c-2.75,2.793-7.22,2.805-9.986,0.027c-2.763-2.776-2.776-7.293-0.027-10.084L51.48,61.434L39.403,49.185 c-2.728-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.953,0.013l11.997,12.165L73.451,39.151L73.451,39.151z"></path></g></svg>&nbsp;&nbsp;Not in stock'
        );
    }
    clearInterval(signininterval);
  }, 100);

  /*var instaFeed = setInterval(function(){
      $('.slick-next').trigger('click');
    }, 3000);*/

  window.CustomUtility = new CustomUtility();
  initPdfLinks();
  setCurrentRegion();
});

$("#sb-close").click(function () {
  $("body").removeClass("has-activeNavPages");
});
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

customerGroupClass();
function customerGroupClass() {
  var customerG = $("#customer-group").text();
  $("main#product-listing-container").addClass(customerG);
}

function initPdfLinks() {
  const url = window.location.href;
  if (url.indexOf("brochures") !== -1) {
    const TARGET = "target";
    const pdflinks = Array.from(document.querySelectorAll('a[href*="pdf"]'));
    for (const link of pdflinks) {
      if (!link.hasAttribute(TARGET)) {
        link.setAttribute(TARGET, "_blank");
      }
    }
  }
}

// function setCurrentRegion() {
//   const url = document.getElementById("ip-geolocation-url");

//   $(".currency-swicher .currency-loc").hide();

//   $.getJSON(url.value, function (data) {
//     const { country_name_official, country_name } = data;
//     let selector = ".currency-usd";

//     for (const countryObj of window.CustomUtility.countriesObject) {
//       if (
//         countryObj.names.some(
//           (x) => x === country_name_official || x === country_name
//         )
//       ) {
//         selector = countryObj.selector;
//         break;
//       }
//     }
//     $(".currency-loading-image").hide();
//     $(`.currency-loc${selector}`).show();
//   });
// }

function setCurrentRegion() {
  const url = document.getElementById("ip-geolocation-url");

  $(".currency-swicher .currency-loc").hide();

  $.getJSON(url.value, function (data) {
    const { country_name_official, country_name, country_code2 } = data;

    let selector = ".currency-usd";
    for (const countryObj of window.CustomUtility.countriesObject) {
      if (
        countryObj.names.some(
          (x) => x === country_name_official || x === country_name
        )
      ) {
        selector = countryObj.selector;
        break;
      }
    }
    $(".currency-loading-image").hide();
    $(`.currency-loc${selector}`).show();

    // Update the store currency based on the country code.
    const currencyCode =
      window.CustomUtility.getCurrencyByCountryCode(country_code2);
    $.ajax({
      url: "/cart/change-currency",
      contentType: "application/json",
      method: "POST",
      data: JSON.stringify({ currencyCode }),
    }).done(() => {
      console.log("Currency Changed");
    });
  });
}
