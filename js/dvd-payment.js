$(document).ready(function() {
  // $('#purchaseDvd').click(function(){
  //   var token = function(res){
  //     var $input = $('<input type=hidden name=stripeToken />').val(res.id);
  //     $('form').append($input).submit();
  //   };

  //   StripeCheckout.open({
  //     key:         'pk_test_nvnjjrdhvEU9gYUF7mNtbU2W',
  //     address:     true,
  //     amount:      1500,
  //     currency:    'usd',
  //     name:        'Corey\'s Barn Benefit DVD',
  //     description: 'Includes a free digital download!',
  //     panelLabel:  'Checkout',
  //     token:       token
  //   });

  //   return false;
  // });

  // $('#purchaseDvd2').click(function(){
  //   var token = function(res){
  //     var $input = $('<input type=hidden name=stripeToken />').val(res.id);
  //     $('form').append($input).submit();
  //   };

  //   StripeCheckout.open({
  //     key:         'pk_test_nvnjjrdhvEU9gYUF7mNtbU2W',
  //     address:     true,
  //     amount:      1500,
  //     currency:    'usd',
  //     name:        'Corey\'s Barn Benefit DVD',
  //     description: 'Includes a free digital download!',
  //     panelLabel:  'Checkout',
  //     token:       token
  //   });

  //   return false;
  // });




  var handler = StripeCheckout.configure({
    key: 'pk_test_nvnjjrdhvEU9gYUF7mNtbU2W',
    image: 'img/side-content-1.jpg',
    token: function(token) {
      // Use the token to create the charge with a server-side script.
      // You can access the token ID with `token.id`
      // alert();
      token.order = "DVD"
      token.charge = ex1.getValue()*100;
      $("#token").attr("value", JSON.stringify(token));
      $("#submit").click();
    }
  });

  document.getElementById('purchaseDvd').addEventListener('click', function(e) {
    // Open Checkout with further options
    handler.open({
      name:        'Corey\'s Barn Benefit DVD',
      description: 'Includes a free digital download!',
      amount:      ex1.getValue()*100,
      address:     true,
      currency:    'usd',

    });
    e.preventDefault();
  });

});
