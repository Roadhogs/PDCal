name: Fetch iCal and Process

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  fetch-and-process:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'

    - name: Install dependencies
      run: npm install

    - name: Run fetch-ical.js
      run: node scripts/fetch-ical.js  # Correct path to your script
