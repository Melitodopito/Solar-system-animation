import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';

// Este modulo possui todas as funções para manipulação do nosso Sistema solar

// Criar Planetas
export function criarPlaneta(tamanho,textura,posicao,textureLoader,scene,anel = null) {
    // Criar os respetivos elementos
    const geo = new THREE.SphereGeometry(tamanho,30,30);
    const mat = new THREE.MeshStandardMaterial({
      map: textureLoader.load(textura)
    });

    const mesh = new THREE.Mesh(geo,mat);
    const obj = new THREE.Object3D();

    obj.add(mesh);
    // Adicionar o planeta a cena
    scene.add(obj);
    mesh.position.x = posicao;

    // Criar Anel se inserido como parametro
    if (anel) {
        const geoAnel = new THREE.RingGeometry(
            anel.radiosInterior,
            anel.radiosExterior,
            32
        );

        const matAnel = new THREE.MeshBasicMaterial({
            map: textureLoader.load(anel.textura),
            side: THREE.DoubleSide,
            transparent: true
        });

        const meshAnel = new THREE.Mesh(geoAnel, matAnel);

        /// inserçao do Anel no "centro" do planeta
        meshAnel.rotation.x = -0.5 * Math.PI;
        meshAnel.position.x = posicao;

        obj.add(meshAnel);
    }

    return {mesh,obj}
}

export function eliminarPlanetas(planetas, scene) {
    // Loop que itera por todos os planetas
    Object.keys(planetas).forEach(key => {
        const planeta = planetas[key];
        // Verifica a existencia do planeta e remove os respectivos elementos
        if (planeta && planeta.obj && planeta.mesh) {
            scene.remove(planeta.obj);

            if (planeta.mesh.geometry) {
                planeta.mesh.geometry.dispose();
            }

            if (planeta.mesh.material) {
                planeta.mesh.material.map?.dispose();
                planeta.mesh.material.dispose();
            }

        }
    });
}


export function criarSistemaSolar(tamanhosPlanetas, texturasPlanetas, texturasAneis, orbitas, textureLoader, scene) {
    // Planetas com posições específicas
    const mercurio = criarPlaneta(tamanhosPlanetas.mercurio, texturasPlanetas.mercurio, orbitas.mercurio, textureLoader, scene);
    const venus = criarPlaneta(tamanhosPlanetas.venus, texturasPlanetas.venus, orbitas.venus, textureLoader, scene);
    const terra = criarPlaneta(tamanhosPlanetas.terra, texturasPlanetas.terra, orbitas.terra, textureLoader, scene);
    const marte = criarPlaneta(tamanhosPlanetas.marte, texturasPlanetas.marte, orbitas.marte, textureLoader, scene);
    const jupiter = criarPlaneta(tamanhosPlanetas.jupiter, texturasPlanetas.jupiter, orbitas.jupiter, textureLoader, scene);
    const saturno = criarPlaneta( tamanhosPlanetas.saturno,texturasPlanetas.saturno,orbitas.saturno,textureLoader, scene,
        {
            radiosInterior: 10,
            radiosExterior: 20,
            textura: texturasAneis.saturno
        }
    );
    const urano = criarPlaneta(tamanhosPlanetas.urano,texturasPlanetas.urano,orbitas.urano, textureLoader,scene,
        {
            radiosInterior: 7,
            radiosExterior: 12,
            textura: texturasAneis.saturno
        }
    );
    const neptuno = criarPlaneta(tamanhosPlanetas.neptuno, texturasPlanetas.neptuno, orbitas.neptuno, textureLoader, scene);


    // Retornar objeto com todos os planetas para facilitar acesso e manipulacao
    return {
        mercurio,
        venus,
        terra,
        marte,
        jupiter,
        saturno,
        urano,
        neptuno
    };
}


export function marcarOrbita(raio){
    const segmentos = 100;
    const pontos = [];

    // calculo da rota
    for (let i = 0; i <= segmentos; i++) {
        const angulo = (i / segmentos) * Math.PI * 2;
        const x = Math.cos(angulo) * raio;
        const z = Math.sin(angulo) * raio;
        pontos.push(new THREE.Vector3(x, 0, z));
    }

    // Criaçao de geometria das rotas
    const geometriaOrbita = new THREE.BufferGeometry().setFromPoints(pontos);
    const materialOrbita = new THREE.LineDashedMaterial({ color: 0xffffff,
                                                         dashSize:0.5,
                                                         gapSize: 0.3
    });
    const linhaOrbita = new THREE.Line(geometriaOrbita, materialOrbita);
    linhaOrbita.computeLineDistances();

    return linhaOrbita;
}

export function criarOrbitas(orbitasPlanetasRealista, scene, marcarOrbita) {
    const orbitas = {};

    // Criar orbita para cada planeta
    Object.keys(orbitasPlanetasRealista).forEach(planeta => {

        const orbita = marcarOrbita(orbitasPlanetasRealista[planeta]);

        // Addicionar a cena
        scene.add(orbita);

        // Store the orbit in the orbitas object
        orbitas[planeta] = orbita;
    });

    return orbitas;
}

export function removerOrbitas(orbitas, scene) {
    Object.keys(orbitas).forEach(planeta => {
        const orbita = orbitas[planeta];

        // Remover
        scene.remove(orbita);

        // Remover geometria
        if (orbita.geometry) {
            orbita.geometry.dispose();
        }

        // Remover material
        if (orbita.material) {
            orbita.material.dispose();
        }
    });
}




