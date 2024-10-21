function filterData(event) {
  event.preventDefault();
  
  const startdate = new Date(document.getElementById("startdate").value);
  const enddate = new Date(document.getElementById("enddate").value);
  console.log("Starting date: " + startdate);
  console.log("Ending date: " + enddate);

  const table = document.getElementById('pitchTable');
  const rows = table.getElementsByTagName('tr');

  // Loop through the rows, starting from the second row (index 1)
  for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      if (cells.length > 0) {
          const datetime = new Date(cells[3].textContent); // Assuming the datetime is in the 4th column

          // Check if the datetime is within the specified range
          if (datetime >= startdate && datetime <= enddate) {
              rows[i].style.display = ""; // Show the row
          } else {
              rows[i].style.display = "none"; // Hide the row
          }
      }
  }
}


async function fetchData() {
  try {
      const response = await fetch('https://compute.samford.edu/zohauth/clients/datajson');
      const data = await response.json();

      const table = document.getElementById('pitchTable');

      data.forEach(pitch => {
          const row = table.insertRow();
          const cellId = row.insertCell(0);
          const cellSpeed = row.insertCell(1);
          const cellResult = row.insertCell(2);
          const cellDatetime = row.insertCell(3);

          cellId.innerHTML = `<a href="details.html?id=${pitch.id}">Pitch ${pitch.id}</a>`;
          cellSpeed.textContent = pitch.speed || '--';
          cellResult.textContent = pitch.result || '--';
          cellDatetime.textContent = pitch.datetime || '--';
      });
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}
