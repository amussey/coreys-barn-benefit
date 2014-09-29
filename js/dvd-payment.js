


$(document).ready(function() {

  var sliderDvd = $('#sliderDvd').slider({
    formatter: function(value) {
        return 'Current value: ' + value;
    }
  }).on('slide', function(e){
    $("#sliderDvdText").html(sliderDvd.getValue());
  }).data('slider');

  var handlerDvd = StripeCheckout.configure({
    key: 'pk_test_nvnjjrdhvEU9gYUF7mNtbU2W',
    image: 'img/corey.jpg',
    token: function(token) {
      token.order = "DVD"
      token.charge = sliderDvd.getValue()*100;
      $("#token").attr("value", JSON.stringify(token));
      $("#submit").click();
    }
  });

  document.getElementById('purchaseDvd').addEventListener('click', function(e) {
    // Open Checkout with further options
    handlerDvd.open({
      name:        'Corey\'s Barn Benefit DVD',
      description: 'Includes a free digital download!',
      amount:      sliderDvd.getValue()*100,
      address:     true,
      currency:    'usd',

    });
    e.preventDefault();
  });



  var sliderDigital = $('#sliderDigital').slider({
    formatter: function(value) {
        return 'Current value: ' + value;
    }
  }).on('slide', function(e){
    $("#sliderDigitalText").html(sliderDigital.getValue());
  }).data('slider');

  var handlerDigital = StripeCheckout.configure({
    key: 'pk_test_nvnjjrdhvEU9gYUF7mNtbU2W',
    image: 'img/corey.jpg',
    token: function(token) {
      token.order = "Digital Download"
      token.charge = sliderDigital.getValue()*100;
      $("#token").attr("value", JSON.stringify(token));
      $("#submit").click();
    }
  });

  document.getElementById('purchaseDigital').addEventListener('click', function(e) {
    // Open Checkout with further options
    handlerDigital.open({
      name:        'Benefit Digital Download',
      description: 'Thank you for your support!',
      amount:      sliderDigital.getValue()*100,
      address:     true,
      currency:    'usd',

    });
    e.preventDefault();
  });


});
