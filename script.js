document.getElementById("student-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form values
    const studentName = document.getElementById("student-name").value;
    const studentId = document.getElementById("student-id").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
  
    // Validate inputs
    if (!studentName || !studentId || !email || !contact) {
      alert("Please fill out all fields.");
      return;
    }
  
    if (!/^[A-Za-z]+$/.test(studentName)) {
      alert("Student name should only contain letters.");
      return;
    }
  
    if (!/^\d+$/.test(studentId)) {
      alert("Student ID should only contain numbers.");
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (!/^\d{10}$/.test(contact)) {
      alert("Please enter a valid contact number (10 digits).");
      return;
    }
  
    // Create a student record object
    const student = { studentName, studentId, email, contact };
  
    // Retrieve stored records and add the new one
    const studentRecords = JSON.parse(localStorage.getItem("students")) || [];
    studentRecords.push(student);
    localStorage.setItem("students", JSON.stringify(studentRecords));
  
    // Add student to the table
    addStudentToTable(student);
  
    // Clear the form
    document.getElementById("student-form").reset();
  });
  
  function addStudentToTable(student) {
    const tableBody = document.querySelector("#records-table tbody");
    const row = document.createElement("tr");
  
    row.innerHTML = `
      <td>${student.studentName}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td><button onclick="editStudent(this)">Edit</button><button onclick="deleteStudent(this)">Delete</button></td>
    `;
  
    tableBody.appendChild(row);
  }
  
  function editStudent(button) {
    const row = button.parentElement.parentElement;
    const cells = row.querySelectorAll("td");
    
    document.getElementById("student-name").value = cells[0].textContent;
    document.getElementById("student-id").value = cells[1].textContent;
    document.getElementById("email").value = cells[2].textContent;
    document.getElementById("contact").value = cells[3].textContent;
  
    deleteStudent(button); // Remove the old record before updating
  }
  
  function deleteStudent(button) {
    const row = button.parentElement.parentElement;
    row.remove();
  
    // Update localStorage
    const studentRecords = JSON.parse(localStorage.getItem("students")) || [];
    const studentId = row.cells[1].textContent;
    const updatedRecords = studentRecords.filter(record => record.studentId !== studentId);
    localStorage.setItem("students", JSON.stringify(updatedRecords));
  }
  
  // Load saved records from localStorage when the page loads
  window.onload = function() {
    const savedRecords = JSON.parse(localStorage.getItem("students")) || [];
    savedRecords.forEach(addStudentToTable);
  };
  