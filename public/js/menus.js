$(document).ready(function() {
  document.getElementById('challenge-selector').onchange = function(event) {

    var url = $("option:selected").attr("href");
    var request = $.ajax({
      url: url,
      dataType: 'json'
    });

    request.done(function(response) {
      console.log(response.start_id);
    });
    // window.location.href = this.children[this.selectedIndex].getAttribute('href');
}
});