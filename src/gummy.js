$(function(){
  function Gummy($wrap){
    if(!$wrap) return;

    this.$wrap = $wrap;
    this.$table = $wrap.find('.gummy-table');
    this.$thead = this.$table.find('thead');
    this.$tbody = this.$table.find('tbody');
    this.$lastHeader = this.$thead.find('th').last();

    this.init();
  }

  Gummy.prototype = {
    init: function() {
      this.tableWidth = this.$table.outerWidth();
      this.wrapHeight = this.$wrap.outerHeight();
      this.theadHeight = this.$thead.outerHeight();
      this.initialPadding = parseInt(this.$lastHeader.css('paddingRight'), 10);
      this.scrollbarWidth = this.getScrollbarsWidth();

      this.initWrap();
      this.initHead();
    },
    initWrap: function() {
      this.$table.wrap('<div class="gummy-inner-wrap"></div>');
      this.$innerWrap = this.$table.parent();
    },
    initHead: function() {
      var topOffset = this.$thead.offset().top;

      this.$stickyHead = $('<table class="gummy-head"></table>');
      this.$stickyHead.html(this.$thead.html());

      if(this.scrollbarWidth > 0) {
        this.$stickyHead.find('tr').append($('<th class="scrollbarSpacer"></th>'));
        this.$stickyHead.find('.scrollbarSpacer').css({
          width: this.scrollbarWidth + 'px'
        })
      }

      this.$wrap.append(this.$stickyHead);

      this.$innerWrap.css({
        height: this.wrapHeight - this.theadHeight,
        marginTop: this.theadHeight
      })

      this.$table.css({
        marginTop: -this.theadHeight
      })

    },
    // Scrollbar width detection snippet from David Walsh
    // http://davidwalsh.name/detect-scrollbar-width
    getScrollbarsWidth: function() {
      var scrollDiv = document.createElement("div");
      scrollDiv.className = "scrollbar-measure";
      document.body.appendChild(scrollDiv);

      var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

      document.body.removeChild(scrollDiv);

      return scrollbarWidth
    }
  }

  new Gummy($('.gummy-wrap'));

})