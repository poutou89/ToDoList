const input = document.createElement('input');
input.placeholder = "Nom de la tâche";

const dateInput = document.createElement('input');
dateInput.type = 'date';
dateInput.style.marginLeft = '10px';
dateInput.style.marginRight = '10px';

document.querySelector('.input').append(dateInput);
document.querySelector('.input').append(input);

const bouton = document.createElement('button');
bouton.textContent = 'Ajouter';
bouton.style.color = 'white';
bouton.style.margin = '20px';
bouton.style.background = 'blue';
document.querySelector('.input').append(bouton);

// === Sauvegarde et chargement localStorage ===

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach(li => {
        const name = li.querySelectorAll('span')[1]?.textContent;
        const deadline = li.querySelectorAll('span')[0]?.textContent.match(/\d{2}\/\d{2}\/\d{4}/)?.[0] || '';
        const status = li.parentElement.classList.contains('listComplete') ? 'done' : 'todo';

        if (name) {
            tasks.push({ name, deadline, status });
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    saved.forEach(renderTask);
}

// === Fonction principale pour afficher une tâche ===

function renderTask(task) {
    const items = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.name;

    const deadlineSpan = document.createElement("span");
    if (task.deadline) {
        const parts = task.deadline.split('/');
        const deadlineDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        const today = new Date();
        deadlineDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (deadlineDate < today) {
            deadlineSpan.style.color = 'red';
        } else if (deadlineDate.getTime() === today.getTime()) {
            deadlineSpan.style.color = 'orange';
        } else {
            deadlineSpan.style.color = 'green';
        }

        deadlineSpan.textContent = ` (à faire avant le ${task.deadline}) `;
        deadlineSpan.style.marginLeft = '10px';
    }

    items.appendChild(deadlineSpan);
    items.appendChild(span);

    // === Bouton modifier ===
    const modifier = document.createElement('button');
    modifier.textContent = 'modifier';
    modifier.style.color = 'white';
    modifier.style.margin = '20px';
    modifier.style.background = 'blue';

    modifier.addEventListener('click', function () {
        const currentText = span.textContent;
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = currentText;
        editInput.style.marginRight = '10px';

        items.insertBefore(editInput, span);
        span.style.display = 'none';
        editInput.focus();

        function saveEdit() {
            const newText = editInput.value.trim();

            if (newText !== currentText) {
                const allLi = document.querySelectorAll('li');
                const nameExists = Array.from(allLi).some(li => {
                    const taskSpan = li.querySelectorAll('span')[1];
                    return taskSpan && taskSpan !== span && taskSpan.textContent === newText;
                });

                if (nameExists) {
                    alert("Une tâche avec ce nom existe déjà.");
                    return;
                }
            }

            if (newText !== "") {
                span.textContent = newText;
            } else {
                alert("Le nom de la tâche ne peut pas être vide");
            }

            span.style.display = '';
            editInput.remove();
            saveTasks();
        }

        editInput.addEventListener('blur', saveEdit);
        editInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                saveEdit();
            }
        });
    });

    // === Bouton état ===
    const etatBtn = document.createElement('button');
    etatBtn.textContent = task.status === 'done' ? 'En cours' : 'terminé';
    etatBtn.style.color = 'white';
    etatBtn.style.margin = '20px';
    etatBtn.style.background = 'blue';

    etatBtn.addEventListener('click', function () {
        const isDone = etatBtn.textContent === 'terminé';
        if (isDone) {
            document.querySelector('.listComplete').append(items);
            etatBtn.textContent = 'En cours';
        } else {
            document.querySelector('.liste').append(items);
            etatBtn.textContent = 'terminé';
        }
        saveTasks();
    });

    // === Bouton supprimer ===
    const supprimer = document.createElement('button');
    supprimer.textContent = 'supprimer';
    supprimer.style.color = 'white';
    supprimer.style.margin = '20px';
    supprimer.style.background = 'blue';

    supprimer.addEventListener('click', function () {
        items.remove();
        saveTasks();
    });

    items.appendChild(modifier);
    items.appendChild(etatBtn);
    items.appendChild(supprimer);

    if (task.status === 'done') {
        document.querySelector('.listComplete').append(items);
    } else {
        document.querySelector('.liste').append(items);
    }
}

// === Ajout de nouvelle tâche ===
bouton.addEventListener('click', function () {
    const taskText = input.value.trim();
    if (!taskText) return;

    const deadline = dateInput.value;

    // Vérifie les doublons
    const allLi = document.querySelectorAll('li');
    const nameExists = Array.from(allLi).some(li => {
        const taskSpan = li.querySelectorAll('span')[1];
        return taskSpan && taskSpan.textContent === taskText;
    });

    if (nameExists) {
        alert("Une tâche avec ce nom existe déjà.");
        return;
    }

    const task = {
        name: taskText,
        deadline: deadline ? new Date(deadline).toLocaleDateString('fr-FR') : "",
        status: 'todo'
    };

    renderTask(task);
    saveTasks();

    input.value = "";
    dateInput.value = "";
});

// Chargement des tâches au démarrage
loadTasks();