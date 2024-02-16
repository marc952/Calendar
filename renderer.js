document.addEventListener("DOMContentLoaded", function () {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const calendarTable = document.querySelector(".calendar-table tbody");
    const yearInput = document.getElementById("year-input");
    const generateButton = document.getElementById("generate-button");
    const events = {};

    generateButton.addEventListener("click", generateCalendar);

    function generateCalendar() {
        const inputYear = parseInt(yearInput.value);
        if (!isNaN(inputYear)) {
            calendarTable.innerHTML = ''; // For clearing the previous calendar
            const currentYear = inputYear;

            // Loop through each month and create a cell for each day of the month
            for (let i = 0; i < 12; i++) {
                const monthName = months[i];
                const row = document.createElement("tr");

                const monthCell = document.createElement("td");
                monthCell.textContent = monthName;
                monthCell.classList.add("month-cell");
                monthCell.setAttribute("colspan", "7"); // makes the month in rectangle format

                row.appendChild(monthCell);
                calendarTable.appendChild(row);

                const firstDayOfMonth = new Date(currentYear, i, 1).getDay(); // Calculate the first day of each month
                const daysInThisMonth = new Date(currentYear, i + 1, 0).getDate(); // Get the number of days for this month
                const numWeeks = Math.ceil((daysInThisMonth + firstDayOfMonth) / 7); // Calculate the number of weeks needed
                let dayCounter = 1 - firstDayOfMonth; // Initialize a counter for days, adjusted for the first day of each month

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
                // Create a clickable button for each event
                const eventButton = document.createElement("button");
                eventButton.textContent = eventText;
                eventButton.classList.add("event-button");

                // Add a click event listener to the button
                eventButton.addEventListener("click", () => showDeleteConfirmation(date, eventText));

                // Create an li element to hold the event button
                const eventItem = document.createElement("li");
                eventItem.appendChild(eventButton);

                // Append the event item to the events list
                eventsList.appendChild(eventItem);
            }
            eventsContainer.appendChild(eventsList);
        }
    }
}

// Function to show a confirmation dialog and delete the event if confirmed
function showDeleteConfirmation(date, eventText) {
    const isConfirmed = confirm(`Do you want to delete the event: ${eventText}?`);
    if (isConfirmed) {
        // Delete the event
        deleteEvent(date, eventText);
    }
}

            function handleCellClick(event) {
                const cell = event.currentTarget;
                const date = cell.textContent;
                if (date) {
                    const eventText = prompt("Enter event for 1" + date);
                    if (eventText) {
                        // Add the event to the specific cell
                        cell.innerHTML += `<br>${eventText}`;
                        addEvent(date, { text: eventText });
                    }
                }
            }

            function addEvent(date, event) {
                if (!events[date]) {
                    events[date] = [];
                }
                events[date].push(event);
                displayEventsForMonth({ currentTarget: { getAttribute: () => date.split("-")[1] } }); // Refresh events for the selected month
            }

            function deleteEvent(date, event) {
                if (events[date]) {
                    const index = events[date].indexOf(event);
                    if (index !== -1) {
                        events[date].splice(index, 1);
                        displayEventsForMonth({ currentTarget: { getAttribute: () => date.split("-")[1] } }); // Refresh events for the selected month
                    }
                }
            }

            function updateEvent(date, event) {
                const newEventText = prompt("Update event for " + date, event.text);
                if (newEventText !== null) {
                    event.text = newEventText;
                    displayEventsForMonth({ currentTarget: { getAttribute: () => date.split("-")[1] } }); // Refresh events for the selected month
                }
            }

            // Add event listeners to the cells of the calendar
            const dayCells = document.querySelectorAll(".calendar-table td:not(.month-cell)");
            dayCells.forEach((cell) => {
                cell.addEventListener("click", handleCellClick);
            });

        } else {
            alert("Please enter a valid year.");
        }
    }
});
