function Gummy($wrap, options){
  if(!$wrap) return;

  this.defaults = {
    gummyColumn: false
  }

  this.opts = $.extend(this.defaults, options);

  this.$wrap = $wrap;
  this.$table = $wrap.find('.gummy-table');
  this.$thead = this.$table.find('thead');
  this.$tbody = this.$table.find('tbody');
  this.$lastHeader = this.$thead.find('th').last();
  this.$tbodyRows = this.$tbody.find('tr');
  this.$rowHeader = this.$tbodyRows.find('th').first();

  this.init();
}

Gummy.prototype = {
  init: function() {
    this.$wrap.addClass('gummy-wrap');

    this.getInitialSizes();
    this.initInnerWrap();
    this.gumHead();

    if(this.opts.gummyColumn) {
      this.gumColumn();
      this.createHeaderCorner();
      this.$innerWrap.on('scroll', this.onInnerScroll.bind(this));
    }
  },
  getInitialSizes: function() {
    this.tableWidth = this.$table.outerWidth();
    this.wrapHeight = this.$wrap.outerHeight();
    this.wrapWidth = this.$wrap.outerWidth();
    this.theadHeight = this.$thead.outerHeight();
    this.columnWidth = this.$rowHeader.outerWidth();
    this.columnBorderWidth = parseInt(this.$rowHeader.css('borderRightWidth'), 10);
    this.headerBorderWidth = parseInt(this.$lastHeader.css('borderBottomWidth'), 10);
    this.initialPadding = {
     left: parseInt(this.$lastHeader.css('paddingLeft'), 10),
     right: parseInt(this.$lastHeader.css('paddingRight'), 10)
    }
    this.scrollbarWidth = this.getScrollbarsWidth();
  },
  initInnerWrap: function() {
    this.$table.wrap('<div class="gummy-inner-wrap"></div>');
    this.$innerWrap = this.$table.parent();

    if(this.opts.gummyColumn) this.$innerWrap.addClass('gum-column');
  },
  gumHead: function() {
    this.$gummyHead = $('<table class="gummy-head"></table>');
    this.$gummyHead.append('<thead></thead>');

    this.$gummyHead.css({
      width: this.tableWidth
    })

    this.$gummyHead.find('thead').html(this.$thead.html());

    if(this.scrollbarWidth > 0) {
      this.$gummyHead.find('tr').append($('<th class="gummy-spacer"></th>'));
      this.$gummyHead.find('.gummy-spacer').css({
        width: this.scrollbarWidth
      })
    }

    this.$wrap.append(this.$gummyHead);

    this.$innerWrap.css({
      height: this.wrapHeight - this.theadHeight,
      marginTop: this.theadHeight
    })

    this.$table.css({
      marginTop: -this.theadHeight
    })

  },
  gumColumn: function() {
    var self = this;

    this.$gummyColumn = $('<table class="gummy-column"></table>');

    this.$tbodyRows.each(function(i, el) {
      var $row = $(el).clone();
      $row.find('td').remove();
      self.$gummyColumn.append($row);
    })

    this.$gummyColumn.css({
      top: this.theadHeight,
      width: this.columnWidth + this.columnBorderWidth
    })

    this.$wrap.append(this.$gummyColumn);

    var spacer = $('<div></div>').css({
      width: this.columnWidth
           - this.headerBorderWidth
           - this.initialPadding.left
           - this.initialPadding.right
    })
    this.$gummyHead.find('th').first().append(spacer);

    this.$innerWrap.css({
      width: this.wrapWidth - this.columnWidth,
      marginLeft: this.columnWidth
    })

    this.$table.css({
      marginLeft: -this.columnWidth
    })

  },
  createHeaderCorner: function() {
    var $corner = $('<div class="gummy-corner"></div>');

    $corner.css({
      height: this.theadHeight + this.headerBorderWidth,
      width: this.columnWidth + this.columnBorderWidth
    })

    this.$wrap.append($corner);
  },
  onInnerScroll: function() {
    var topOffset = -this.$innerWrap.scrollTop(),
        leftOffset = -this.$innerWrap.scrollLeft();

    this.$gummyColumn.css({
      top: topOffset + this.theadHeight
    })

    this.$gummyHead.css({
      left: leftOffset
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

    return scrollbarWidth;
  }
}