# Hourly Event Notifications - Chrome Extension

A Chrome extension that sends Windows notifications every hour with random events.

## Features
- 🔔 Hourly notifications at the start of every hour
- 🎲 Random event selection from 8 events
- 🔊 Subtle notification sound
- 🎨 Modern, premium dark-themed popup UI
- ⚙️ Easy enable/disable toggle
- ⏱️ Real-time countdown to next notification

## Events
- Harvester
- Husk
- Probe
- Caches
- Lush
- Night
- Storm
- Matriarch

## Installation

1. **Download/Clone** this extension folder

2. **Add Notification Sound** (Optional but recommended)
   - Download a subtle notification sound (1-2 seconds, soft chime)
   - Save it as `notification.mp3` in this folder
   - See `SOUND_SETUP.md` for details

3. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)

4. **Load Extension**
   - Click "Load unpacked"
   - Select the `ChromeExtension` folder
   - The extension icon should appear in your toolbar

5. **Configure**
   - Click the extension icon to open the popup
   - Toggle notifications on/off as needed
   - View countdown to next notification

## How It Works

- **Hourly Alarms**: Uses Chrome's alarm API to trigger at the start of every hour
- **Random Selection**: Randomly picks one event from the list each hour
- **Windows Notifications**: Displays native Windows notifications with event name and time
- **Persistent Settings**: Your enable/disable preference is saved using Chrome storage

## Files

- `manifest.json` - Extension configuration
- `background.js` - Service worker for alarms and notifications
- `popup.html` - Popup interface structure
- `popup.js` - Popup logic and settings management
- `popup.css` - Premium dark theme styling
- `icon.png` - Extension icon
- `notification.mp3` - Notification sound (you need to add this)

## Troubleshooting

**Notifications not appearing?**
- Check if notifications are enabled in the popup
- Ensure Chrome has notification permissions
- Check Windows notification settings

**Sound not playing?**
- Make sure `notification.mp3` exists in the extension folder
- Check your system volume
- The extension will work without sound if the file is missing

**Extension not loading?**
- Make sure all files are in the same folder
- Check for errors in `chrome://extensions/` (click "Errors" button)
- Reload the extension after making changes

## Customization

**Add More Events:**
Edit the `EVENTS` array in `background.js`:
```javascript
const EVENTS = [
  'Harvester',
  'Husk',
  'YourNewEvent',
  // ... add more
];
```

**Change Notification Frequency:**
Modify the `periodInMinutes` value in `background.js` (line 31)

**Adjust Sound Volume:**
Change the `audio.volume` value in `background.js` (line 68) - currently set to 0.3 (30%)

## Version
1.0.0

## License
Free to use and modify
