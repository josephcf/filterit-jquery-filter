(function($){
    function FilterIt(filter, filterButtons, noResults, searchButton, searchText){
        var filter = filter || 'filter';
        var filterButtons = filterButtons || 'filter-button';
        var noResults = noResults || 'noresults';
        var searchButton = searchButton || 'searchButton';
        var searchText = searchText || 'searchText';

        this.filterVal = "";
        this.filterButtons = $("." + filterButtons);
        this.filters = $('.' + filter);
        this.noResults = $('.' + noResults);
        this.searchButton = $('.' + searchButton);
        this.searchText = $('.' + searchText);
    }

    FilterIt.prototype.init = function() {
        this.filterVal = this.getFilter();
        var _self = this;
        _self.filterButtons.on("click", function () {
            //get the value for our filter
            _self.filterVal = $(this).attr("data-filter");
            //store it in the session storage
            _self.saveFilter(_self.filterVal);
            _self.updateView();
        });
        _self.searchButton.on('click', function(e) {
            e.preventDefault();
            _self.filterVal = _self.searchText.val();
            _self.saveFilter(_self.filterVal);
            _self.updateView();
        });
    };

    FilterIt.prototype.saveFilter = function(val) {
        sessionStorage && sessionStorage.setItem("filTerm", val);
    };

    FilterIt.prototype.getFilter = function() {
        if (sessionStorage && sessionStorage.getItem("filTerm")) {
            return sessionStorage.getItem("filTerm");
        }else{
            return "all";
        }
    };

    FilterIt.prototype.updateView = function() {
            
            if (!this.filterVal || this.filterVal === "all") {
                this.filters.show();
                this.noResults.hide();
            } else {
                if($('.' + this.filterVal).length > 0){
                    this.filters.hide();
                    this.filters.filter('.' + this.filterVal).show();
                }else{
                    this.filters.hide();
                    this.noResults.show();
                }
            
            }
    };

    $(document).ready(function () {
        var filterIt = new FilterIt()
        filterIt.init();
    });

})(jQuery);
