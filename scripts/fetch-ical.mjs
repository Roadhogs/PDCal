import fetch from 'node-fetch'; // Import node-fetch for making HTTP requests
import ICAL from 'ical.js';

const url = 'https://example.com/your-ical-url.ics'; // Your iCal URL

async function fetchICal(url) {
    try {
        const response = await fetch(url);
        const icalData = await response.text(); // Get the raw iCal data as a string
        
        const jcalData = ICAL.parse(icalData); // Parse the iCal data
        const comp = new ICAL.Component(jcalData);
        
        // Example: Log all events in the iCal
        const events = comp.getAllSubcomponents('vevent');
        events.forEach(event => {
            const e = new ICAL.Event(event);
            console.log(e.summary); // Log the event summary
        });
    } catch (error) {
        console.error('Failed to fetch/parse iCal:', error);
    }
}

fetchICal(url);
