function filterData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  console.log("Starting date: " + startdate);
  console.log("Ending date: " + enddate);
  fetch("https://compute.samford.edu/zohauth/clients/data");
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
