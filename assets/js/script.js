var savedEvents = {
    9: "",
    10: ""
};

// Show today's date at top of page
var currentDay = moment().format("dddd MMMM Mo");

$("#currentDay").text(currentDay)

// set background color based on time
var updateTime = function() {
    var currentHour = moment().format("H");
    currentHour = parseInt(currentHour);

    $(".list-group-item").each(function() {
        var eventTime = $(this).attr("data-time");
        eventTime = parseInt(eventTime);

        if (currentHour === eventTime) {
            $(this).find(".event").addClass("present");
        } else if (currentHour < eventTime) {
            $(this).find(".event").addClass("future");
        } else {
            $(this).find(".event").addClass("past");
        }
    });
};

// When an event is clicked it creates a textbox
$(".list-group-item").on("click", ".event", function() {
    var text = $(this).text().trim();

    var eventInput = $("<textarea>")
    .addClass("col").val(text);

    $(this).replaceWith(eventInput);
    eventInput.trigger("focus");
    
});

// Text input is saved when user clicks outside of box
$(".list-group").on("blur", "textarea", function() {
    var text = $(this).val().trim();

    var eventHolder = $("<div>")
        .text(text)
        .addClass("event col");
    
    $(this).replaceWith(eventHolder);
    updateTime();
});

// Run update time function when page is refreshed and every 5 minutes
updateTime();

setInterval(updateTime, (1000 * 60 * 5));


