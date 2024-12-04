import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';

// Este modulo possui funcoes pertinentes as estrelas

export function criarEstrelas(quantidade, scene) {
    // Remove estrelas antigas, se estiverem presentes
    const estrelasAntigas = scene.getObjectByName('estrelas');
    if (estrelasAntigas) {
        scene.remove(estrelasAntigas);
    }

    // criaçao de geometria e material das estrelas
    const geo = new THREE.SphereGeometry(0.5, 8, 8);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const instancedMesh = new THREE.InstancedMesh(geo, mat, quantidade);
    instancedMesh.name = 'estrelas';

    const estrela = new THREE.Object3D();
    const color = new THREE.Color();

    // Insere e posiciona aleatoriamente as estrelas
    for (let i = 0; i < quantidade; i++) {

        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        const x = (Math.random() - 0.5) * 2000;

        estrela.position.set(x, y, z);
        estrela.updateMatrix();
        instancedMesh.setMatrixAt(i, estrela.matrix);

        // Criar estrelas com cor diferente
        if (Math.random() < 0.3) {
            // branco
            color.set(0xffffff);
        } else if (Math.random() > 0.3 && Math.random() < 0.6) {
            // amarelo
            color.set(0xffff00);
        } else {
            // laranja
            color.set(0xDB9D5D);
        }
        instancedMesh.setColorAt(i, color);

    }

    scene.add(instancedMesh);
    return instancedMesh;
}