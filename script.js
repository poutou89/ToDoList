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

bouton.addEventListener('click', function () {
    const taskText = input.value.trim();
    if (!taskText) return;
    const deadline = dateInput.value;

    const items = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;
    const deadlineSpan = document.createElement("span");

    if (deadline) {
        const deadlineDate = new Date(deadline);
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

    const formatted = deadlineDate.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    deadlineSpan.textContent = ` (à faire avant le ${formatted}) `;
    deadlineSpan.style.marginLeft = '10px';
}

    items.appendChild(deadlineSpan);
    items.appendChild(span);

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
        if (newText !== "") {
            span.textContent = newText;
        } else {
            alert("Le nom de la tâche ne peut pas être vide")
        }
        span.style.display = '';
        editInput.remove();
    }

    editInput.addEventListener('blur', saveEdit);
    editInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
});

    const etatBtn = document.createElement('button');
    etatBtn.textContent = 'terminé';
    etatBtn.style.color = 'white';
    etatBtn.style.margin = '20px';
    etatBtn.style.background = 'blue';

    etatBtn.addEventListener('click', function () {
        const estEnCours = etatBtn.textContent === 'terminé';
        if (estEnCours) {
            document.querySelector('.listComplete').append(items);
            etatBtn.textContent = 'En cours';
        } else {
            document.querySelector('.liste').append(items);
            etatBtn.textContent = 'terminé';
        }
    });

    const supprimer = document.createElement('button');
    supprimer.textContent = 'supprimer';
    supprimer.style.color = 'white';
    supprimer.style.margin = '20px';
    supprimer.style.background = 'blue';

    supprimer.addEventListener('click', function () {
        items.remove();
    });

    items.appendChild(modifier);
    items.appendChild(etatBtn);
    items.appendChild(supprimer);

    document.querySelector('.liste').append(items);
    input.value = "";
});