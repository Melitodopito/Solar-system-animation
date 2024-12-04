// Este modulo e responsavel pelo UI
export function criarSliders({ onVelocidadeChange, onEstrelasChange }) {

    // Cntainer para os sliders
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '50px';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.zIndex = '1000';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    container.style.padding = '10px';
    container.style.borderRadius = '5px';
    container.style.color = 'grey';

    // Slider de Velocidade (Label e Slider)
    const velocidadeLabel = document.createElement('label');
    velocidadeLabel.textContent = 'Velocidade: ';
    velocidadeLabel.style.display = 'block';

    const velocidadeSlider = document.createElement('input');
    velocidadeSlider.type = 'range';
    // Foi decidido permitir o utilizador parar os planetas, ou tornar as suas
    // rotaçoes muito rapidas
    velocidadeSlider.max = '15';
    velocidadeSlider.value = 2;
    velocidadeSlider.step = '0.05';
    velocidadeSlider.style.width = '100%';

    velocidadeSlider.addEventListener('input', () => {
        const novaVelocidade = parseFloat(velocidadeSlider.value);
        onVelocidadeChange(novaVelocidade);
    });

    // Slider de Estrelas
    const estrelasLabel = document.createElement('label');
    estrelasLabel.textContent = 'Quantidade de Estrelas: ';
    estrelasLabel.style.display = 'block';

    const estrelasSlider = document.createElement('input');
    estrelasSlider.type = 'range';
    // No minimo 0 estrelas
    estrelasSlider.min = '0';
    // Foi permitido uma grande quantidade de estrelas
    estrelasSlider.max = '30000';
    estrelasSlider.step = '200';
    estrelasSlider.value = '1000';
    estrelasSlider.style.width = '100%';

    estrelasSlider.addEventListener('input', () => {
        const novaQuantidade = parseInt(estrelasSlider.value, 10);
        onEstrelasChange(novaQuantidade);
    });

    // Adicionar elementos ao container mae
    container.appendChild(velocidadeLabel);
    container.appendChild(velocidadeSlider);
    container.appendChild(estrelasLabel);
    container.appendChild(estrelasSlider);

    // Adicionar o container ao body do documento
    document.body.appendChild(container);
}

 // Criaçao do Toogle para o modo Realista
export function criarToggleModo(onToggle) {

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '30px';
    // Posicionar no centro
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';

    container.style.color = 'grey';
    // Label
    const toggleLabel = document.createElement('label');
    toggleLabel.textContent = 'Modo Realista: ';

    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';

    // inicar ja selecionado, queremos começar com o modo realista como default

    toggleInput.checked = true;

    toggleInput.addEventListener('change', () => {
        const isRealista = toggleInput.checked;
        onToggle(isRealista);
    });

    // Adicionar elementos ao container mae
    container.appendChild(toggleLabel);
    container.appendChild(toggleInput);

    // Adicionar o container ao body do documento
    document.body.appendChild(container);
}