$(document).ready(function () {
    var sports = ["baseball", "boxing", "basketball", "soccer", "mma"]
    function createButtons(sportsList, classToAdd, area) {
        $(area).empty();
        for (var index = 0; index < sportsList.length; index++) {
            var button = $("<button>")
            button.addClass(classToAdd);
            button.attr("data-type", sportsList[index])
            button.text(sportsList[index])
            $(area).append(button)

        }

    }


    $(document).on("click", "sportsList", function () {
        $("#sports").empty()
        $("#sportsList").removeClass("active")
        $(this).addClass("active")
        var type = $(this).attr("data-type");
        var url = "https://api.giphy.com/v1/gifs/search?api_key=06k9LofR4gDUHkJmtI7Az9ftSEd44uaw&q=" + type + "&limit=25&offset=0&rating=G&lang=en"
        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            var results = response.data
            for (var i = 0; i < results.length; i++) {
                var sportsDiv = $('<div class="sportsGiphy" >')
                var rating = results[i].rating
                var p = $('<p>').text("Ratings:" + rating);

                var stillImage = results[i].images.fixed_height_still.url

                var sportsImage = $('<img>')
                sportsImage.attr("src", stillImage)
                sportsImage.addClass("sportsImage")
                sportsDiv.append(p)
                sportsDiv.append(sportsImage)
                $("#sports").append(sportsDiv)
            }
        })
    })



    $("#addSports").on("click", function (event) {
        event.preventDefault();
        var newSport = $("input").eq(0).val()
        if (newSport.length > 2) {
            sports.push(newSport)
        }
        else {
            alert("Please enter a valid sport")
        }
        createButtons(sports, "sportsList", "#sportsButtons")

    })








    createButtons(sports, "sportsList", "#sportsButtons")

})