$(document).ready(function() {
  var demo1 = new Gummy($('.demo-1'));

  var demo2 = new Gummy($('.demo-2'), {
    gummyColumn: true
  });

  var demo3 = new Gummy($('.demo-3'), {
    gummyColumn: true,
    forceHeadersWidth: true,
    forceHeadersHeight: true
  });
})