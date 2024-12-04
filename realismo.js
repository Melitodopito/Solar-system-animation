// Este modulo possui todas as funções para manipulação de realismo

// Alterar tamanhos dos planetas e seus anéis
export function alterarTamanhoPlanetas(tamanhos, planetas) {
    const novosTamanhos = tamanhos;

    for (const planeta in planetas) {
        const planetaMesh = planetas[planeta].mesh;
        const novoTamanho = novosTamanhos[planeta];

        // Muda o tamanho do planeta
        const escalaOriginal = planetaMesh.geometry.parameters.radius;
        const fatorEscala = novoTamanho / escalaOriginal;
        planetaMesh.scale.set(fatorEscala, fatorEscala, fatorEscala);


        if (planetas[planeta].anel) {
            const anel = planetas[planeta].anel;
            // Ajusta proporcionalmente
            const escalaAnel = fatorEscala;
            anel.scale.set(escalaAnel, escalaAnel, escalaAnel);
        }
    }
}
