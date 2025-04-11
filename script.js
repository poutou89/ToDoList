const input = document.createElement('input');
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

    const items = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;
    items.appendChild(span);

    const modifier = document.createElement('button');
    modifier.textContent = 'modifier';
    modifier.style.color = 'white';
    modifier.style.margin = '20px';
    modifier.style.background = 'blue';

    modifier.addEventListener('click', function () {
        const newText = prompt("Modifier la tâche :", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText;
        }
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