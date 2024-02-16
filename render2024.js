// JavaScript to dynamically generate calendar cells for months with days
document.addEventListener("DOMContentLoaded", function () {
    const currentYear = 2024; // Set it to the next year
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const calendarTable = document.querySelector(".calendar-table tbody");

    // Code for managing events of the calendar
    const events = {};

    function addEventToDate(date, eventText) {
        if (!events[date]) {
            events[date] = [];
        }
        events[date].push(eventText);
    }
    // Loop through each month and create calendar cells
    for (let i = 0; i < 12; i++) {
        const monthName = months[i];
        const row = document.createElement("tr");

        const monthCell = document.createElement("td");
        monthCell.textContent = monthName;
        monthCell.classList.add("month-cell");
        monthCell.setAttribute("colspan", "7"); // Span the whole width of the rectangle

        row.appendChild(monthCell);
        calendarTable.appendChild(row);

        const firstDayOfMonth = new Date(currentYear, i, 1).getDay(); // Calculate the first day of the month 
        const daysInThisMonth = new Date(currentYear, i + 1, 0).getDate(); // Get the total number of days for this month
        const numWeeks = Math.ceil((daysInThisMonth + firstDayOfMonth) / 7); // Calculate the number of weeks needed for the days
        let dayCounter = 1 - firstDayOfMonth; // Initialize a counter for days, adjusted for the first day

        const dayNamesRow = document.createElement("tr");

        for (const dayName of dayNames) {
            const dayNameCell = document.createElement("td");
            dayNameCell.textContent = dayName;
            dayNamesRow.appendChild(dayNameCell);
        }

        calendarTable.appendChild(dayNamesRow);

        for (let week = 0; week < numWeeks; week++) {
            const weekRow = document.createElement("tr");

            for (let dayInWeek = 0; dayInWeek < 7; dayInWeek++) {
                if (dayCounter > 0 && dayCounter <= daysInThisMonth) {
                    const dayCell = document.createElement("td");
                    dayCell.textContent = dayCounter;
                    weekRow.appendChild(dayCell);
                } else {
                    const emptyCell = document.createElement("td");
                    weekRow.appendChild(emptyCell);
                }

                dayCounter++;
            }

            calendarTable.appendChild(weekRow);
        }
    }

    function displayEventsForMonth(event) {
        const monthIndex = event.currentTarget.getAttribute("data-month");
        const selectedMonth = months[monthIndex];
        const eventsContainer = document.querySelector(".events");

        // Clear existing events
        eventsContainer.innerHTML = "";

        // Display the events for the selected month
        for (const date in events) {
            const [year, month] = date.split("-");
            if (months[parseInt(month)] === selectedMonth) {
                const eventsList = document.createElement("ul");
                eventsList.innerHTML = `<h3>Events for ${selectedMonth} ${year}, ${date.split("-")[2]}</h3>`;
                for (const eventText of events[date]) {
                    const eventItem = document.createElement("li");
                    eventItem.textContent = eventText;
                    eventsList.appendChild(eventItem);
                }
                eventsContainer.appendChild(eventsList);
            }
        }
    }

    function handleCellClick(event) {
        const cell = event.currentTarget;
        const date = cell.textContent;
        if (date) {
            const eventText = prompt("Enter event for " + date);
            if (eventText) {
                // Add the event to the specific cell
                cell.innerHTML += `<br>${eventText}`;
            }
        }
    }

    // Add event listeners to the cells of the calendar
    const dayCells = document.querySelectorAll(".calendar-table td:not(.month-cell)");
    dayCells.forEach((cell) => {
        cell.addEventListener("click", handleCellClick);
    });

});