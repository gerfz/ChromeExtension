// Event schedule data - Times in UTC
// Each map can have multiple events (Minor + Major)
const EVENT_SCHEDULE = {
    "0:00": {
        "DAM": ["Matriarch"],
        "BURIED CITY": [],
        "SPACEPORT": ["Harvester"],
        "BLUE GATE": [],
        "STELLA MONTIS": []
    },
    "1:00": {
        "DAM": [],
        "BURIED CITY": [],
        "SPACEPORT": [],
        "BLUE GATE": ["Night"],
        "STELLA MONTIS": []
    },
    "2:00": {
        "DAM": [],
        "BURIED CITY": ["Night"],
        "SPACEPORT": [],
        "BLUE GATE": ["Husks"],
        "STELLA MONTIS": []
    },
    "3:00": {
        "DAM": ["Blooms"],
        "BURIED CITY": [],
        "SPACEPORT": ["Matriarch", "Night"],
        "BLUE GATE": [],
        "STELLA MONTIS": []
    },
    "4:00": {
        "DAM": [],
        "BURIED CITY": [],
        "SPACEPORT": [],
        "BLUE GATE": ["Night"],
        "STELLA MONTIS": []
    },
    "5:00": {
        "DAM": [],
        "BURIED CITY": ["Storm", "Husks"],
        "SPACEPORT": [],
        "BLUE GATE": [],
        "STELLA MONTIS": []
    },
    "6:00": {
        "DAM": ["Probes"],
        "BURIED CITY": [],
        "SPACEPORT": ["Night", "Tower"],
        "BLUE GATE": [],
        "STELLA MONTIS": []
    },
    "7:00": {
        "DAM": [],
        "BURIED CITY": [],
        "SPACEPORT": [],
        "BLUE GATE": ["Storm"],
        "STELLA MONTIS": []
    },
    "8:00": {
        "DAM": ["Night"],
        "BURIED CITY": ["Blooms"],
        "SPACEPORT": [],
        "BLUE GATE": ["Probes"],
        "STELLA MONTIS": []
    },
    "9:00": {
        "DAM": ["Harvester"],
        "BURIED CITY": [],
        "SPACEPORT": ["Probes"],
        "BLUE GATE": ["Blooms"],
        "STELLA MONTIS": []
    },
    "10:00": {
        "DAM": ["Husks"],
        "BURIED CITY": [],
        "SPACEPORT": [],
        "BLUE GATE": [],
        "STELLA MONTIS": []
    },
    "11:00": {
        "DAM": ["Storm"],
        "BURIED CITY": ["Probes"],
        "SPACEPORT": [],
        "BLUE GATE": ["Matriarch"],
        "STELLA MONTIS": []
    },
    "12:00": {
        "DAM": ["Probes"],
        "BURIED CITY": [],
        "SPACEPORT": ["Blooms"],
        "BLUE GATE": [],
        "STELLA MONTIS": []
    },
    "13:00": {
        "DAM": [],
        "BURIED CITY": ["Night"],
        "SPACEPORT": [],
        "BLUE GATE": [],
        "STELLA MONTIS": []
    },
    "14:00": {
        "DAM": ["Night"],
        "BURIED CITY": ["Husks"],
        "SPACEPORT": [],
        "BLUE GATE": ["Caches"],
        "STELLA MONTIS": []
    },
    "15:00": {
        "DAM": [],
        "BURIED CITY": [],
        "SPACEPORT": ["Night", "Caches"],
        "BLUE GATE": [],
        "STELLA MONTIS": []
    },
    "16:00": {
        "DAM": ["Harvester"],
        "BURIED CITY": [],
        "SPACEPORT": [],
        "BLUE GATE": ["Storm"],
        "STELLA MONTIS": []
    },
    "17:00": {
        "DAM": ["Blooms"],
        "BURIED CITY": ["Storm", "Blooms"],
        "SPACEPORT": [],
        "BLUE GATE": ["Harvester"],
        "STELLA MONTIS": []
    },
    "18:00": {
        "DAM": [],
        "BURIED CITY": [],
        "SPACEPORT": ["Night", "Harvester"],
        "BLUE GATE": ["Husks"],
        "STELLA MONTIS": []
    },
    "19:00": {
        "DAM": [],
        "BURIED CITY": [],
        "SPACEPORT": ["Bunker"],
        "BLUE GATE": [],
        "STELLA MONTIS": []
    },
    "20:00": {
        "DAM": [],
        "BURIED CITY": ["Night"],
        "SPACEPORT": [],
        "BLUE GATE": ["Night"],
        "STELLA MONTIS": []
    },
    "21:00": {
        "DAM": ["Matriarch"],
        "BURIED CITY": ["Night", "Caches"],
        "SPACEPORT": ["Matriarch"],
        "BLUE GATE": [],
        "STELLA MONTIS": []
    },
    "22:00": {
        "DAM": [],
        "BURIED CITY": [],
        "SPACEPORT": [],
        "BLUE GATE": ["Night", "Storm"],
        "STELLA MONTIS": []
    },
    "23:00": {
        "DAM": ["Caches", "Storm"],
        "BURIED CITY": ["Probes"],
        "SPACEPORT": [],
        "BLUE GATE": ["Matriarch"],
        "STELLA MONTIS": []
    }
};

// Timezone offset in hours (default UTC = 0)
let timezoneOffset = 0;
let selectedEvents = [];
let selectedMaps = [];

// Initialize schedule page
document.addEventListener('DOMContentLoaded', () => {
    // Load saved timezone offset and user selections
    chrome.storage.sync.get(['timezoneOffset', 'selectedEvents', 'selectedMaps'], (result) => {
        timezoneOffset = result.timezoneOffset || 0;
        selectedEvents = result.selectedEvents || [];
        selectedMaps = result.selectedMaps || [];

        document.getElementById('timezoneOffset').value = timezoneOffset;
        renderSchedule();
    });

    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);

    // Back button
    document.getElementById('backBtn').addEventListener('click', () => {
        window.close();
    });

    // Timezone offset change
    document.getElementById('timezoneOffset').addEventListener('change', (e) => {
        timezoneOffset = parseInt(e.target.value);
        chrome.storage.sync.set({ timezoneOffset: timezoneOffset });
        renderSchedule();
    });
});

// Convert UTC hour to local hour based on timezone offset
function convertHour(utcHour, offset) {
    let localHour = utcHour + offset;
    // Handle day wrap-around
    if (localHour < 0) {
        localHour += 24;
    } else if (localHour >= 24) {
        localHour -= 24;
    }
    return localHour;
}

// Render schedule table
function renderSchedule() {
    const tbody = document.getElementById('scheduleBody');
    tbody.innerHTML = ''; // Clear existing content

    const now = new Date();
    const currentHourUTC = now.getUTCHours();
    const currentHourLocal = convertHour(currentHourUTC, timezoneOffset);

    // Create array of hours with their events
    const scheduleArray = [];
    for (let utcHour = 0; utcHour < 24; utcHour++) {
        const timeKey = `${utcHour}:00`;
        const localHour = convertHour(utcHour, timezoneOffset);
        scheduleArray.push({
            utcHour: utcHour,
            localHour: localHour,
            timeKey: timeKey,
            events: EVENT_SCHEDULE[timeKey]
        });
    }

    // Sort by local hour for display only if timezone offset is applied
    // When UTC (offset = 0), keep natural 0-23 order
    if (timezoneOffset !== 0) {
        scheduleArray.sort((a, b) => a.localHour - b.localHour);
    }

    scheduleArray.forEach(item => {
        const row = document.createElement('tr');

        // Highlight current hour
        if (item.localHour === currentHourLocal) {
            row.classList.add('current-hour');
        }

        // Time column - show local time
        const timeCell = document.createElement('td');
        timeCell.className = 'time-cell';
        const displayHour = item.localHour.toString().padStart(2, '0');

        // Only add UTC time as subtitle if offset is not 0
        if (timezoneOffset !== 0) {
            const utcHour = item.utcHour.toString().padStart(2, '0');
            timeCell.innerHTML = `${displayHour}:00<br><small style="color: #888; font-size: 0.75em;">UTC ${utcHour}:00</small>`;
        } else {
            timeCell.textContent = `${displayHour}:00`;
        }

        row.appendChild(timeCell);

        // Map columns
        const maps = ['DAM', 'BURIED CITY', 'SPACEPORT', 'BLUE GATE', 'STELLA MONTIS'];
        maps.forEach(map => {
            const cell = document.createElement('td');
            const events = item.events[map];

            if (events && events.length > 0) {
                cell.innerHTML = events.map(event => {
                    // Check if this event/map combination is selected for notifications
                    const isSelected = isEventSelected(event, map);
                    const selectedClass = isSelected ? ' selected' : '';
                    return `<span class="event-badge${selectedClass}">${event}</span>`;
                }).join('');
            } else {
                cell.innerHTML = '<span class="no-event">-</span>';
            }

            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });
}

// Check if an event/map combination is selected for notifications
function isEventSelected(event, map) {
    // If no events or maps are selected, all are notified (so all are "selected")
    const allEventsSelected = selectedEvents.length === 0;
    const allMapsSelected = selectedMaps.length === 0;

    // Check if this specific event and map are in the selection
    const eventMatches = allEventsSelected || selectedEvents.includes(event);
    const mapMatches = allMapsSelected || selectedMaps.includes(map);

    return eventMatches && mapMatches;
}

// Update current time display
function updateCurrentTime() {
    const now = new Date();

    // Show time in selected timezone
    const utcTime = new Date(now.getTime());
    const localTime = new Date(utcTime.getTime() + (timezoneOffset * 60 * 60 * 1000));

    const hours = localTime.getUTCHours().toString().padStart(2, '0');
    const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = localTime.getUTCSeconds().toString().padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;
    const timezoneLabel = timezoneOffset === 0 ? 'UTC' : `UTC${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset}`;

    document.getElementById('currentTime').textContent = `${timeString} (${timezoneLabel})`;
}
