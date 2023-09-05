fetch('web.html')
  .then(response => response.text())
  .then(html => {
    // Insert the loaded HTML into a DOM element
    document.getElementById('container').innerHTML = html;
  })
  .catch(error => {
    console.error('Error loading HTML:', error);
  });
