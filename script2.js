document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("ticket-form");
  const tableBody = document.getElementById("history-body");
  const searchTrain = document.getElementById("search-train");
  const timetable = document.getElementById("timetable-table");
  const { jsPDF } = window.jspdf;

  // Ticket Booking
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let travelClass = document.getElementById("class").value;
    let date = document.getElementById("date").value;
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    let ticketId = "T" + Math.floor(Math.random() * 10000);

    let newRow = tableBody.insertRow();
    newRow.innerHTML = `
      <td>${ticketId}</td>
      <td>${name}</td>
      <td>${travelClass}</td>
      <td>${date}</td>
      <td>${from}</td>
      <td>${to}</td>
      <td>Booked</td>
      <td>
        <button class="delete-btn">❌ Delete</button>
        <button class="download-btn">📥 Download</button>
      </td>
    `;

    // Delete button
    newRow.querySelector(".delete-btn").addEventListener("click", function () {
      newRow.remove();
    });

    // Download button
    newRow.querySelector(".download-btn").addEventListener("click", function () {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("🚆 Railway Ticket", 70, 20);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Ticket ID: ${ticketId}`, 20, 40);
      doc.text(`Name: ${name}`, 20, 50);
      doc.text(`Class: ${travelClass}`, 20, 60);
      doc.text(`Date: ${date}`, 20, 70);
      doc.text(`From: ${from}`, 20, 80);
      doc.text(`To: ${to}`, 20, 90);
      doc.text(`Status: Booked`, 20, 100);

      doc.setFontSize(10);
      doc.text("Thank you for booking with Railway Ticket Booking System!", 20, 120);

      doc.save(`Ticket_${ticketId}.pdf`);
    });

    alert("✅ Ticket Booked Successfully! Ticket ID:" + ticketId);
    form.reset();
  });

  // Train Search Filter
  searchTrain.addEventListener("keyup", function () {
    let filter = searchTrain.value.toLowerCase();
    let rows = timetable.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
      let trainNo = rows[i].cells[0].textContent.toLowerCase();
      let trainName = rows[i].cells[1].textContent.toLowerCase();

      if (trainNo.includes(filter) || trainName.includes(filter)) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  });
});
