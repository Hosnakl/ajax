//send restuarant names to the server using query string
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: urlRestaurants,
        dataType: "json",
        success: function (result) {
            if (results !== null && results.length > 0) {
                var data = JSON.parse(results);
                $.each(data, function (index, value) {
                    $('#drpRestaurant').append("<option value='" + index + "'>" + value + "</option>");
                });
            }
        },
        error: function (event, request, settings) {
            window.alert('AjaxError' + ' : ' + settings);
        }
    });

});


//to get the details of the selected restaurant
$('#drpRestaurant').change(function () {
    //clear message
    $('#lblConfirmation').text("");
    var urlSelRestaurant = urlRestaurants + "?action=restaurantDetails&id=" + this.value;
    $("#restaurant-info").attr("selRestaurantId", this.value);
    getRestaurantDetails(urlSelRestaurant);
});

function getRestaurantDetails(urlSelectedRestaurant) {
    $.ajax({
        type: "GET",
        url: urlSelectedRestaurant,
        datatype: "json",
        success: function (result) {
            if (result !== null && results.length > 0) {
                var data = JSON.parse(result);

                $('#txtStreetAddress').val(data.street);
                $('#txtCity').val(data.city);
                $('#txtProvinceState').val(data.province);
                $('#txtPostalZipCode').val(data.postalCode);
                $('#txtSummary').val(data.summary);

                $('#drpRating').empty();
                for (index = data.ratingMin; index <= data.ratingMax; index++) {
                    $('#drpRating').append("<option value='" + index + "' id='" + index + "'>" + index + "</option>");
                }

                var selElement = "#" + data.rating;
                $(selElement).attr("selected", "selected");
            }
            else {
                // clear/reset the form
                $('#restaurant-review-form')[0].reset();
                $("#drpRating").empty();
            }
        },
        error: function (event, request, settings) {
            window.alert('AjaxError' + ' : ' + settings);
        }
    });
}
