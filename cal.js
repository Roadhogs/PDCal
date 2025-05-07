$(document).ready(function () {
    $('.busy').show();

    // Load pre-fetched oncall data from oncall.json
    $.getJSON('oncall.json', function (events) {
        $('.busy').hide();

        // Optional: generate dynamic title
        const headline = '<h1 style="background-color: #f0f0f0">On Call Schedule</h1><br>';
        $('#calendar-title').html(headline);

        // Set page title
        document.title = 'On Call Schedule';

        // Render the calendar using FullCalendar
        $('#calendar').fullCalendar({
            events: events.map(event => ({
                title: event.title,
                start: event.start,
                end: event.end,
                color: "#0071c5", // Optional: fixed or random color
                url: event.url
            })),
            defaultView: "month",
            header: {
                left: 'title',
                center: 'month,agendaWeek,agendaDay,listMonth',
                right: 'today prev,next'
            },
            eventMouseover: function () {
                $(this)[0].style.cursor = "pointer";
            },
            eventClick: function (calEvent) {
                if (calEvent.url) {
                    window.open(calEvent.url, "_blank");
                    return false; // prevent default behavior
                }
            }
        });
    }).fail(function () {
        $('.busy').hide();
        $('#calendar').html('<h2>Failed to load on-call data</h2>');
        console.error("Could not load oncall.json");
    });
});
