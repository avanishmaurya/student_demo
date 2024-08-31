document.getElementById('student-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const major = document.getElementById('major').value;

    await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, major }),
    });

    loadStudents();
});

async function loadStudents() {
    const response = await fetch('/api/students');
    const students = await response.json();
    const studentList = document.getElementById('student-list');

    studentList.innerHTML = '';
    students.forEach((student) => {
        const li = document.createElement('li');
        li.textContent = `${student.name} - Age: ${student.age} - Major: ${student.major}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = async () => {
            await fetch(`/api/students/${student.id}`, { method: 'DELETE' });
            loadStudents();
        };

        li.appendChild(deleteBtn);
        studentList.appendChild(li);
    });
}

window.onload = loadStudents;
