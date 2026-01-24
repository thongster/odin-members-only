document.querySelectorAll('.message-date').forEach((el) => {
  const iso = el.dataset.timestamp;
  const date = new Date(iso);

  el.textContent = date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
});
