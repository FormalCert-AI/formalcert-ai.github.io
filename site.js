document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.getElementById(button.dataset.copy).textContent);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Select and copy the citation below';
    }
  });
});
