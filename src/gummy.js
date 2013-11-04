function Gummy($wrap, options){
  if(!$wrap) return;

  this.defaults = {
    forceHeadersHeight: false,
    forceHeadersWidth: false,
    gummyColumn: false,
    removeHeaderAttributes: []
  }

  this.opts = $.extend(this.defaults, options);

  this.$wrap = $wrap;
  this.$table = $wrap.find('table');
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

    this.initInnerWrap();
    this.getInitialValues();
    this.gumHead();

    if(this.opts.gummyColumn && this.tableWidth > this.wrapWidth) {
      this.gumColumn();
      this.createHeaderCorner();
      this.$innerWrap.bind('scroll', this.onInnerScroll.bind(this));
      if(this.opts.forceHeadersHeight) this.forceHeadersHeight();
    }

    if(this.opts.forceHeadersWidth)  this.forceHeadersWidth();

    if(this.opts.removeHeaderAttributes) {
      this.removeHeaderAttributes(this.opts.removeHeaderAttributes);
    }
  },
  getInitialValues: function() {
    this.tableWidth = this.$table.outerWidth();
    this.wrapHeight = this.$wrap.outerHeight();
    this.wrapWidth = this.$wrap.outerWidth();
    this.theadHeight = this.$thead.outerHeight();
    this.thHeight = this.$lastHeader.outerHeight();
    this.columnWidth = this.$rowHeader.outerWidth();
    this.columnBorderWidth = parseInt(this.$rowHeader.css('borderRightWidth'), 10);
    this.headerBorderWidth = parseInt(this.$lastHeader.css('borderBottomWidth'), 10);
    this.initialPadding = {
      left: parseInt(this.$lastHeader.css('paddingLeft'), 10),
      right: parseInt(this.$lastHeader.css('paddingRight'), 10)
    }
    this.scrollbarWidth = this.getScrollbarsWidth();

    this.tableClasses = this.$table.attr('class');
  },
  initInnerWrap: function() {
    this.$table.wrap('<div class="gummy-inner-wrap"></div>');
    this.$innerWrap = this.$table.parent();

    if(this.opts.gummyColumn) this.$innerWrap.addClass('gum-column');
  },
  gumHead: function() {
    this.$gummyHead = $('<table class="gummy-head"></table>');
    this.$gummyHead.addClass(this.tableClasses);
    this.$gummyHead.append('<thead></thead>');

    this.$gummyHead.css({
      width: this.tableWidth + this.scrollbarWidth
    })

    this.updateHeadContent();
    this.$wrap.append(this.$gummyHead);
    this.handleWrapTopOverflow();
  },
  updateHeadContent: function() {
    this.$gummyHead.find('thead').html(this.$thead.html());

    if(this.scrollbarWidth > 0) {
      var spacer = $('<th class="gummy-spacer"></th>');

      spacer.css({
       width: this.scrollbarWidth
      });

      this.$gummyHead.find('tr').append(spacer);
    }
  },
  handleWrapTopOverflow: function() {
    this.$innerWrap.css({
      height: this.wrapHeight - this.theadHeight,
      marginTop: this.theadHeight
    })

    this.$table.css({
      marginTop: -this.theadHeight
    })
  },
  handleWrapLeftOverflow: function() {
    this.$innerWrap.css({
      width: this.wrapWidth - this.columnWidth,
      marginLeft: this.columnWidth
    })

    this.$table.css({
      marginLeft: -this.columnWidth
    })
  },
  gumColumn: function() {
    var self = this,
        $rows = this.$tbodyRows.clone();

    $rows.find('td').remove();

    this.$gummyColumn = $('<table class="gummy-column"></table>');
    this.$gummyColumn.addClass(this.tableClasses);
    this.$gummyColumn.append($('<tbody></tbody>'));
    this.$gummyColumn.find('tbody').append($rows);

    this.$gummyColumn.css({
      top: this.theadHeight,
      width: this.columnWidth + this.columnBorderWidth
    })

    this.$wrap.append(this.$gummyColumn);

    if(this.$thead.find('th').first().is(':empty')) this.createHeaderSpacer();
    this.handleWrapLeftOverflow();
  },
  createHeaderSpacer: function() {
    var spacer = $('<div></div>').css({
      width: this.columnWidth
           - this.headerBorderWidth
           - this.initialPadding.left
           - this.initialPadding.right
    })

    this.$gummyHead.find('th').first().append(spacer);
  },
  createHeaderCorner: function() {
    this.$corner = $('<table class="gummy-corner"></table>');
    this.$corner.addClass(this.tableClasses);
    this.$corner.append('<thead></thead>');

    this.$corner.find('thead').append(this.$thead.find('th').first().clone(true, true));

    this.$corner.css({
      width: this.columnWidth + this.columnBorderWidth
    })

    this.$corner.find('th').css({
      height: this.thHeight
    })

    this.$wrap.append(this.$corner);
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
  removeHeaderAttributes: function(attributes) {
    var self = this;

    $.each(attributes, function(i, value) {
      self.$thead.find('th [' + value + ']').removeAttr(value);
      if(self.$gummyColumn) {
        self.$tbody.find('th [' + value + ']').removeAttr(value);
      }
    })
  },
  forceHeadersWidth: function(){
    var $headerCells = this.$thead.find('th');

    this.$gummyHead.find('th').not('.gummy-spacer').each(function(i, el){
      var $currentCell = $(el),
          currentWidth = $currentCell.outerWidth(),
          headerWidth = $headerCells.eq(i).outerWidth();

      if(currentWidth < headerWidth) $currentCell.css('width', headerWidth);
    });
  },
  forceHeadersHeight: function(){
    var $headerCells = this.$tbody.find('th');

    this.$gummyColumn.find('th').each(function(i, el){
      var $currentCell = $(el),
          currentHeight = $currentCell.outerHeight(),
          headerHeight = $headerCells.eq(i).outerHeight();

      if(currentHeight < headerHeight) $currentCell.css('height', headerHeight);
    });
  },
  destroy: function() {
    this.$innerWrap.unbind('scroll');
    this.$table.unwrap();
    this.$gummyHead.remove();

    if(this.$gummyColumn) {
      this.$gummyColumn.remove();
      this.$corner.remove();
    }
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
