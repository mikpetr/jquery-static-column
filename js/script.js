(function () {
    function createStaticColumns () {
        var table = $(".table-container table");

        var staticCol = table.find("th.static-col");

        var leftTable = $("<table border='0'><thead></thead><tbody></tbody></table>");

        leftTable.attr("class", table.attr("class"));
        leftTable.addClass("left-table");

        if (staticCol.length) {
            var headCols = table.find("th");

            var staticIndexes = [];
            var staticWidths = [];

            for (var i = 0; i < headCols.length; i ++) {
                if ($(headCols[i]).hasClass("static-col")) {
                    staticIndexes.push(i);
                    staticWidths.push($(headCols[i]).outerWidth(true));
                }
            }
            
            staticIndexes.forEach(function (index) {
                leftTable.find("thead").append(headCols[index]);
                leftTable.find("thead").find("th").width(staticWidths[index]);
            });
            

            var bodyRows = table.find("tbody").find("tr");
            
            var marginLaft = 0;

            for (var i = 0; i < bodyRows.length; i ++) {
                var bodyCols = $(bodyRows[i]).find("td");

                var tempRow = $("<tr></tr>");

                tempRow.attr("class", $(bodyRows[i]).attr("class"));
                
                staticIndexes.forEach(function (index) {
                    $(bodyCols[index]).clone(true).appendTo(tempRow);
                    if (i == 0)
                        marginLaft += staticWidths[index];
                });

                leftTable.find("tbody").append(tempRow);
            }

            table.css({ 'margin-left': marginLaft });

            $(".table-wrapper").find(".left-table").remove();

            $(".table-wrapper").append(leftTable);
        }
    }
    
    $(document).ready(function(){
        createStaticColumns();
    });

})();