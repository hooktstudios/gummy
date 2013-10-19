$(function(){
  function Gummy($wrap){
    if(!$wrap) return;

    this.$wrap = $wrap;
    this.$table = $wrap.find('.gummy-table');
    this.$thead = this.$table.find('thead');
    this.$tbody = this.$table.find('tbody');

    this.init();
  }

  Gummy.prototype = {
    init: function() {
      this.tableWidth = this.$table.outerWidth();
      this.wrapHeight = this.$wrap.outerHeight();
      this.initWrap();
      this.initGummyHead();
    },
    initWrap: function() {
      this.$table.wrap('<div class="gummy-inner-wrap"></div>');
      this.$innerWrap = this.$table.parent();
      this.$innerWrap.css({
        height: this.wrapHeight
      })
    },
    initGummyHead: function() {
      var topOffset = this.$thead.offset().top;

      this.$stickyHead = $('<table class="gummy-head"></table>');
      this.$stickyHead.html(this.$thead.html());

      // this.$stickyHead.css({
      //   top: topOffset
      // })

      this.$wrap.append(this.$stickyHead);
    }
  }

  new Gummy($('.gummy-wrap'));

})