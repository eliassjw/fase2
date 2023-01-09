const neighbors = [
    'Abolição',
    'Acari',
    'Água Santa',
    'Alto Da Boa Vista',
    'Anchieta',
    'Andaraí',
    'Anil',
    'Bancários',
    'Bangu',
    'Barra Da Tijuca',
    'Barra De Guaratiba',
    'Barros Filho',
    'Benfica',
    'Bento Ribeiro',
    'Bonsucesso',
    'Botafogo',
    'Brás De Pina',
    'Cachambi',
    'Cacuia',
    'Caju',
    'Camorim',
    'Campinho',
    'Campo Dos Afonsos',
    'Campo Grande',
    'Cascadura',
    'Catete',
    'Catumbi',
    'Cavalcanti',
    'Centro',
    'Cidade De Deus',
    'Cidade Nova',
    'Cidade Universitária',
    'Cocotá',
    'Coelho Neto',
    'Colégio',
    'Complexo do Alemão'
]

window.onload = () => {
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault()
        const date = new Date()
        const informedDate = document.getElementById('nascimento').value.split('-')
        const filteredNeighbors = neighbors.filter(neighbor => {return (neighbor.toLocaleLowerCase() == document.getElementById('neighborhood').value.toLocaleLowerCase())})
        const informedPhoneNumber = document.getElementById('phone').value
        let error = false;

        clearBlockClasses()

        if (informedDate[0] >= date.getFullYear() || informedDate[0] < 1930) error = blockSubmition('nascimento', 'birthday'); else {
                const prevAge = Math.abs((date.getFullYear() - 1) - informedDate[0])
                const age = informedDate[1] > date.getMonth() + 1 ? prevAge : (informedDate[2] > date.getDate() ? prevAge : prevAge + 1)
                if (age < 18) {
                    error = blockSubmition('nascimento', 'age')
                }
        }
        if (informedPhoneNumber.length != 16 || !Number(removeSpecialCharacters(informedPhoneNumber))) {
            error = blockSubmition('phone', 'phoneNumber')
        }
        if (filteredNeighbors.length == 0) {
            error = blockSubmition('neighborhood', 'neighbor')
        }

        if (!error) document.formulario.submit()

    })
    function clearBlockClasses(){
        let element = document.getElementsByClassName('invalid')
        while(element.length > 0){
            element[0].classList.remove('birthday')
            element[0].classList.remove('age')
            element[0].classList.remove('neighbor')
            element[0].classList.remove('invalid')
        }
    }

    function blockSubmition(elementID, invalidClass){
        document.getElementById(elementID+'Input').classList.add('invalid')
        document.getElementById(elementID+'Input').classList.add(invalidClass)
        return true
    }
    function removeSpecialCharacters(string){
        return string.replace('(', '').replace(')', '').replaceAll(' ', '').replace('-', '')
    }

    for (let i = 0; i < document.querySelectorAll('input[type="text"], input[type="date"], input[type="email"]').length; i++){
        const element = document.querySelectorAll('input[type="text"], input[type="date"], input[type="email"]')[i];
        element.addEventListener('focusin', () => focusIn(element))
        element.addEventListener('focusout', () => {
            if (element.value === '') {
                element.parentNode.querySelector('.label').classList.remove('activeLabel')
            }
        })
    }
    document.getElementById('neighborhood').addEventListener('focusin', () => {
        if (document.getElementById('neighborhood').value == '') document.getElementById('neighborhood').placeholder = 'Procurar bairro...';
        document.getElementById('neighborSearch').classList.add('openedSearch')
    })
    document.getElementById('neighborhood').addEventListener('focusout', () => {
        document.getElementById('neighborhood').placeholder = ''
        setTimeout(() => {document.getElementById('neighborSearch').classList.remove('openedSearch')}, 100);
    })
    document.getElementById('neighborhood').addEventListener('input', () => {
        document.getElementById('neighborhoodInput').classList.remove('invalidInput')
        if (document.getElementById('neighborhood').value == '') {
            document.getElementById('neighborhood').placeholder = 'Procurar bairro...'
        } else document.getElementById('neighborhood').placeholder = ''
        const filteredNeighbors = neighbors.filter((name) => {
            return name.toLocaleLowerCase().includes(document.getElementById('neighborhood').value.toLocaleLowerCase())
        }).sort();
        document.getElementById('neighborSearch').innerHTML = ''
        filteredNeighbors.map((neighboor) => {insertNeighbor(neighboor)})
        if (filteredNeighbors.length === 0) {
            document.getElementById('neighborSearch').innerHTML = '<span id="neighborNotFound">Bairro não disponível ou não encontrado.</span>'
        }
    })
    document.getElementById('phone').addEventListener('input', () => {
        const input = document.getElementById('phone');
        input.value = removeSpecialCharacters(input.value)
        if (input.value.length == 11) {
            input.value = '(' + input.value.slice(0, 2) + ') ' + input.value.slice(2, 3) + ' ' + input.value.slice(3, 7) + '-' + input.value.slice(7)
        }
    })
    neighbors.map((neighboor) => {insertNeighbor(neighboor)})
}

function insertNeighbor(neighboor){
    let newNeighbor = document.createElement('div');
    newNeighbor.className = 'option';
    newNeighbor.innerHTML = neighboor;
    document.getElementById('neighborSearch').appendChild(newNeighbor)
    newNeighbor.addEventListener('click', () => {
        document.getElementById('neighborhood').value = newNeighbor.innerHTML;
        focusIn(document.getElementById('neighborhood'));
    })
}

function focusIn(element){
    element.parentNode.querySelector('.label').classList.add('activeLabel')
}