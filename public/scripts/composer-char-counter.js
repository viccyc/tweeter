$(document).ready(function() {
  $("#textAreaId").on('keyup', function() {
    let charLength = this.value.length;
    let charsLeft = 140 - charLength;
    $(".counter").text(charsLeft);
    if (charsLeft < 0) {
      $(".counter").css('color', 'red');
    }
  });
});