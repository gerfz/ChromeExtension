// Selected events and maps
let selectedEvents = new Set();
let selectedMaps = new Set();

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    setupEventListeners();
});

// Load settings from storage
function loadSettings() {
    chrome.storage.sync.get(['notificationsEnabled', 'selectedEvents', 'selectedMaps'], (result) => {
        // Load enabled state
        const enabled = result.notificationsEnabled !== false;
        document.getElementById('notificationToggle').checked = enabled;

        // Load selected events - default to empty if not saved
        if (result.selectedEvents && Array.isArray(result.selectedEvents) && result.selectedEvents.length > 0) {
            selectedEvents = new Set(result.selectedEvents);
            selectedEvents.forEach(event => {
                const tag = document.querySelector(`.event-tag[data-event="${event}"]`);
                if (tag) tag.classList.add('selected');
            });
        } else {
            // Explicitly set to empty and ensure no tags are selected
            selectedEvents = new Set();
            document.querySelectorAll('.event-tag').forEach(tag => {
                tag.classList.remove('selected');
            });
        }

        // Load selected maps - default to empty if not saved
        if (result.selectedMaps && Array.isArray(result.selectedMaps) && result.selectedMaps.length > 0) {
            selectedMaps = new Set(result.selectedMaps);
            selectedMaps.forEach(map => {
                const tag = document.querySelector(`.map-tag[data-map="${map}"]`);
                if (tag) tag.classList.add('selected');
            });
        } else {
            // Explicitly set to empty and ensure no tags are selected
            selectedMaps = new Set();
            document.querySelectorAll('.map-tag').forEach(tag => {
                tag.classList.remove('selected');
            });
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Toggle switch
    document.getElementById('notificationToggle').addEventListener('change', (e) => {
        const enabled = e.target.checked;
        chrome.storage.sync.set({ notificationsEnabled: enabled });
    });

    // Event tags
    document.querySelectorAll('.event-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const event = tag.dataset.event;

            if (selectedEvents.has(event)) {
                selectedEvents.delete(event);
                tag.classList.remove('selected');
            } else {
                selectedEvents.add(event);
                tag.classList.add('selected');
            }

            // Save to storage
            chrome.storage.sync.set({ selectedEvents: Array.from(selectedEvents) });
        });
    });

    // Map tags
    document.querySelectorAll('.map-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const map = tag.dataset.map;

            if (selectedMaps.has(map)) {
                selectedMaps.delete(map);
                tag.classList.remove('selected');
            } else {
                selectedMaps.add(map);
                tag.classList.add('selected');
            }

            // Save to storage
            chrome.storage.sync.set({ selectedMaps: Array.from(selectedMaps) });
        });
    });

    // View Schedule button
    document.getElementById('viewScheduleBtn').addEventListener('click', () => {
        chrome.tabs.create({ url: 'schedule.html' });
    });

    // Test Notification button
    document.getElementById('testNotificationBtn').addEventListener('click', () => {
        console.log('Test button clicked');

        chrome.runtime.sendMessage({ action: 'testNotification' }, (response) => {
            if (chrome.runtime.lastError) {
                console.error('Error sending message:', chrome.runtime.lastError);
                alert('Error: ' + chrome.runtime.lastError.message);
                return;
            }

            if (response && response.success) {
                console.log('Test notification sent successfully');
                alert('Test notification sent! Check your Windows notifications.');
            } else {
                console.log('No response or failed');
                alert('Failed to send test notification');
            }
        });
    });
}
