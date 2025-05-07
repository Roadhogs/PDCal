const fs = require('fs');
const fetch = require('node-fetch');
const ICAL = require('ical.js');

const url = process.env.ICAL_URL;

async function fetchICal() {
    try {
        const res = await fetch(url);
        const icalData = await res.text();
        const jcalData = ICAL.parse(icalData);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents('vevent');

        const events = vevents.map(vevent => {
            const event = new ICAL.Event(vevent);
            return {
                title: event.summary,
                start: event.startDate.toJSDate(),
                end: event.endDate.toJSDate(),
                url: event.component.getFirstPropertyValue('url') || ''
            };
        });

        fs.writeFileSync('oncall.json', JSON.stringify(events, null, 2));
        console.log("oncall.json written with", events.length, "events.");
    } catch (e) {
        console.error("Failed to fetch/parse iCal:", e);
        process.exit(1);
    }
}

fetchICal();
