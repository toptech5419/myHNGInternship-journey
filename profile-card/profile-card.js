function updateUTCTime() {
    const now = new Date();
    const utcTime = now.toUTCString();
    document.querySelector('[data-testid="currentTimeUTC"]').textContent = utcTime;
}
updateUTCTime();
// Update time every second
setInterval(updateUTCTime, 1000);