$(document).ready(function() {
  var stripe_key = 'pk_live_26QOnVhJnfK7icuPzBcAi2iI';

  var sliderDigital = $('#sliderDigital').slider({
    formatter: function(value) {
        return 'Current value: ' + value;
    }
  }).on('slide', function(e){
    $("#sliderDigitalText").html(sliderDigital.getValue());
  }).data('slider');

  var handlerDigital = StripeCheckout.configure({
    key: stripe_key,
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
      name:        'Corey\'s Barn Benefit Video',
      description: 'Thank you for your support!',
      amount:      sliderDigital.getValue()*100,
      address:     false,
      currency:    'usd',
    });
    e.preventDefault();
  });
});
