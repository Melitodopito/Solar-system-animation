// Gira cada astro ao redor de si mesmo
export function rotacaoPlanetaria (sol,planetas,rotacoes) {
    sol.rotateY(rotacoes.sol);
    planetas.mercurio.mesh.rotateY(rotacoes.mercurio);
    planetas.venus.mesh.rotateY(rotacoes.venus);
    planetas.terra.mesh.rotateY(rotacoes.terra);
    planetas.marte.mesh.rotateY(rotacoes.marte);
    planetas.jupiter.mesh.rotateY(rotacoes.jupiter);
    planetas.saturno.mesh.rotateY(rotacoes.saturno);
    planetas.urano.mesh.rotateY(rotacoes.urano);
    planetas.neptuno.mesh.rotateY(rotacoes.neptuno);

}
// gira Planetas a volta do sol
export function translacaoPlanetaria (planetas,velocidadeAtual,velocidade) {
    planetas.mercurio.obj.rotateY(velocidadeAtual.mercurio * velocidade);
    planetas.venus.obj.rotateY(velocidadeAtual.venus * velocidade);
    planetas.terra.obj.rotateY(velocidadeAtual.terra * velocidade);
    planetas.marte.obj.rotateY(velocidadeAtual.marte * velocidade);
    planetas.jupiter.obj.rotateY(velocidadeAtual.jupiter * velocidade);
    planetas.saturno.obj.rotateY(velocidadeAtual.saturno * velocidade);
    planetas.urano.obj.rotateY(velocidadeAtual.urano * velocidade);
    planetas.neptuno.obj.rotateY(velocidadeAtual.neptuno * velocidade);
}