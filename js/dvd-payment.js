$(document).ready(function() {
  $('#purchaseDvd').click(function(){
    var token = function(res){
      var $input = $('<input type=hidden name=stripeToken />').val(res.id);
      $('form').append($input).submit();
    };

    StripeCheckout.open({
      key:         'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
      address:     true,
      amount:      1500,
      currency:    'usd',
      name:        'Corey\'s Barn Benefit DVD',
      description: 'Includes free digital download!',
      panelLabel:  'Checkout',
      token:       token
    });

    return false;
  });

  $('#purchaseDvd2').click(function(){
    var token = function(res){
      var $input = $('<input type=hidden name=stripeToken />').val(res.id);
      $('form').append($input).submit();
    };

    StripeCheckout.open({
      key:         'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
      address:     true,
      amount:      1500,
      currency:    'usd',
      name:        'Corey\'s Barn Benefit DVD',
      description: 'Includes free digital download!',
      panelLabel:  'Checkout',
      token:       token
    });

    return false;
  });

});
