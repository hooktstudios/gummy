$(function(){
  function Gummy($wrap){
    if(!$wrap) return;

    this.$wrap = $wrap;
    this.$table = $wrap.find('.gummy-table');
    this.$thead = this.$table.find('thead');

    this.init();
  }

  Gummy.prototype = {
    init: function() {
      this.tableWidth = this.$table.outerWidth();
      this.initGummyHead();
    },
    initGummyHead: function() {
      var topOffset = this.$thead.offset().top;

      this.$stickyHead = $('<table class="gummy-head"></table>');
      this.$stickyHead.html(this.$thead.html());

      this.$stickyHead.css({
        top: topOffset,
        width: this.tableWidth
      })

      this.$wrap.append(this.$stickyHead);
    }
  }

  new Gummy($('.gummy-wrap'));

})