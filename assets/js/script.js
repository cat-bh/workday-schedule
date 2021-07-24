// Show today's date at top of page
var currentDay = moment().format("dddd MMMM Mo");

$("#currentDay").text(currentDay);

var savedEvents = {
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    today: currentDay
};

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

var saveEvents = function() {
    localStorage.setItem("todaysEvents", JSON.stringify(savedEvents));
}

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
    
    // Add new event to object
    var timeIndex = $(this).closest(".list-group-item").attr("data-time");
    savedEvents[timeIndex] = text;

    $(this).replaceWith(eventHolder);
    updateTime();

    saveEvents();
    
});

var loadEvents = function() {
    var tempObj = JSON.parse(localStorage.getItem("todaysEvents"));

    if (!tempObj) {
        return
    }
       
    if (tempObj.today === currentDay) {
        // load events
        $(".list-group-item").each(function() {
            var timeIndex = $(this).attr("data-time");
            var eventText = tempObj[timeIndex];

            $(this).find(".event").text(eventText);
        });

    } else {
        // delete events from yesterday and set as empty
    }
    
};

// Run update time function when page is refreshed and every 5 minutes
updateTime();

setInterval(updateTime, (300000));

loadEvents();


