# 📅 ARC Event Schedule Tracker

Track all ARC game events across all maps in real-time! Available as both a **Chrome Extension** (with notifications) and a **Website** (view-only).

---

## 🚀 Quick Start

### Option 1: Chrome Extension (Recommended - Get Notifications!)

**Download from GitHub**:
1. Go to the GitHub repository page
2. Click the green **"Code"** button (top right)
3. Click **"Download ZIP"**
4. Extract the ZIP file to a folder on your computer

**Install Extension**:
1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select the extracted `ChromeExtension` folder (not the website folder inside it)
5. Done! Click the extension icon to get started

### Option 2: Website (View & Notifications)

**🌐 Live Website**: Just visit **[https://phenomenal-eclair-ea61d6.netlify.app/](https://phenomenal-eclair-ea61d6.netlify.app/)**

That's it! No installation, no setup. Works on any device with a browser.

---

## ✨ Features

### Chrome Extension
- ✅ **Desktop Notifications** - Get alerted when events start
- ✅ **Custom Filters** - Choose which events and maps to track
- ✅ **Live Updates** - Schedule updates in real-time
- ✅ **Timezone Support** - View times in your local timezone
- ✅ **Visual Highlights** - Orange badges show your selected notifications
- ✅ **Works Offline** - No internet needed after installation

### Website
- ✅ **Desktop Notifications** - Get alerted when events start (requires local server)
- ✅ **Custom Filters** - Choose which events and maps to track
- ✅ **View Full Schedule** - See all events at a glance
- ✅ **Timezone Support** - Convert to your local time
- ✅ **Live Updates** - Schedule updates in real-time
- ⚠️ **Requires Local Server** - Must run through `http://localhost` for notifications
- ⚠️ **Keep Tab Open** - Browser and tab must stay open for notifications

---

## 📖 How to Use the Chrome Extension

### Step 1: Select Events & Maps
1. Click the extension icon
2. Click on events you want to track (e.g., "Probes", "Blooms")
3. Click on maps you want to track (e.g., "DAM", "SPACEPORT")
4. **Important**: You must select at least 1 event AND 1 map

### Step 2: Enable Notifications
- Toggle **"Enable Notifications"** to ON
- Click **"Test Notification"** to verify it works

### Step 3: View Schedule
- Click **"📅 View Event Schedule"**
- Orange badges = events you'll be notified about
- Green highlighted row = current hour

### Step 4: Adjust Timezone (Optional)
- Select your timezone from the dropdown
- Schedule automatically converts to your local time

---

## 🎯 Example Setup

**Goal**: Get notified for Probes events on DAM

1. Open extension popup
2. Click "Probes" (turns green)
3. Click "DAM" (turns green)
4. Toggle "Enable Notifications" ON
5. Done! You'll get a notification when Probes spawns on DAM

---

## 🗺️ Available Maps
- DAM
- BURIED CITY
- SPACEPORT
- BLUE GATE
- STELLA MONTIS

## 🎮 Available Events
- Harvester
- Husks
- Probes
- Caches
- Blooms
- Night
- Storm
- Matriarch
- Tower
- Bunker

---

## ⚙️ How It Works

### Event Schedule
- All times are stored in **UTC**
- Schedule automatically converts to your selected timezone
- Events are checked every hour on the hour
- Notifications trigger at the start of each event

### Notification Logic
- **Both required**: You must select at least 1 event AND 1 map
- **Combinations**: Only selected event+map pairs trigger notifications
- **Example**: If you select "Probes" + "DAM", you'll only get notified for Probes on DAM (not Probes on other maps)

---

## 🛠️ Troubleshooting

### No Notifications?
1. Check that notifications are enabled in Chrome settings
2. Make sure you selected at least 1 event AND 1 map
3. Click "Test Notification" to verify it works
4. Check that the extension has notification permissions

### Wrong Times?
1. Make sure you selected the correct timezone
2. Remember: The schedule is in UTC by default
3. Your PC time doesn't affect the schedule (it uses UTC)

### Orange Badges Not Showing?
1. You must select at least 1 event AND 1 map
2. Orange only appears for selected combinations
3. If nothing is selected, no badges are orange

---

## 📂 File Structure

```
ChromeExtension/
├── manifest.json          # Extension configuration
├── background.js          # Notification logic
├── popup.html/css/js      # Main extension UI
├── schedule.html/css/js   # Full schedule view
├── icon.png              # Extension icon
└── README.md             # This file

website/
├── index.html            # Standalone web version
├── styles.css            # Website styling
└── script.js             # Website logic
```

---

## 🔄 Updates

To update the event schedule:
1. Edit `EVENT_SCHEDULE` in `background.js`
2. Copy the same data to `schedule.js`
3. Copy the same data to `website/script.js`
4. Reload the extension

---

## 💡 Tips

- **Keep schedule page open** on a second monitor to see live updates
- **Test notifications first** before relying on them
- **Select specific combinations** to avoid notification spam
- **Use the website** if you just want to view the schedule without notifications

---

## 📝 License

Free to use and modify for personal use.

---

## 🙏 Credits

Event data sourced from the ARC game community.
