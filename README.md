![](./img/inteli-logo.png) 

# Introdução

Este é um dos repositórios do projeto de alunos do Inteli em parceria com uma grande indústria de papel nacional no 1º semestre de 2023. Este projeto foi desenvolvido por alunos do Módulo 6 do curso de Ciência da Computação.

# Projeto: *Solução de otimização de corte de bobinas de papel*

# Grupo: OptCutters
![](./img/optcutters-high-resolution-logo-color-on-transparent-background%201.png)
O Grupo OptCutters é composto por um time extremamente diverso que possibilitou estabelecer soluções inovadoras para o problema. Abaixo, segue os integrantes da nossa equipe:

- [Allan Casado](https://www.linkedin.com/in/allan-casado-6339a9177/)
- [Frederico Schur](https://www.linkedin.com/in/frederico-schur-6a3313237/)
- [Gabriel Carneiro](https://www.linkedin.com/in/gabecarneiro/)
- [Pedro Romão](https://www.linkedin.com/in/pedro-rom%C3%A3o-734b4920a/)
- [Sarah Ribeiro](https://www.linkedin.com/in/sarah-ribeiro-361130195/)
- [Stefano Butori](https://www.linkedin.com/in/sbutori/)
- [Moises Caze](https://www.linkedin.com/in/moises-caze/)

# Descrição

O objetivo do projeto é desenvolver um algoritmo para conjugação das bobinas de papel, de forma a respeitar restrições e minimizar perdas.

A aplicação final terá um front end para possibilitar a interação do usuário e o algoritmo, com o input e output de dados. O back end conterá a lógica para a otimização, a partir da modelagem matemática provida.

# Guia de instalação

Optamos por utilizar as tecnologias mais recorrentes hoje no mercado, possibilitando um grande desempenho de máquina e atualização recorrente, proporcionando a possibilidade de melhoria constante. 

Toda a solução está sendo executada através do Docker, logo, não será necessário que entre a fundo no código para executa-lo e testar. O Docker é ferramenta de código aberto usado para implantar aplicativos dentro de containers virtuais. A conteinerização permite que vários aplicativos. Baixe-o a partir [desse link](https://www.docker.com/). 

Uma vez instalado, é importante que você se atente na instalação de outras ferramentas que utilizamos:

- [Java JDK 19 ou posterior](https://www.oracle.com/br/java/technologies/downloads/): todo nosso algoritmo foi escrito em Java através de APIs em [Spring Boot](https://spring.io/projects/spring-boot). Java é uma linguagem de alto nível e extremamente performatico.

- [React](https://react.dev/): nosso frontend foi desenvolvido a paritr da Stack do React, por isso é importante que o usuário esteja atento a documentação do React e outras dependências como [Node JS](https://nodejs.org/en).

- [Maven](https://maven.apache.org/): o backend da aplicação conta com algumas dependências externas que estão listadas em nosso arquivo [POM.xml](/codigo/planejador/pom.xml). Portanto, é necessário instalar o Maven para que as dependências estejam devidamente instaladas.

É válido ressaltar, que dentre as dependências mais importantes para nossa solução estão:
- [Biblioteca OR-Tools](https://developers.google.com/optimization?hl=pt-br): responsável por executar nossa estratégia de solução, utilizando algoritmos como Knapsack e Simplex.
- [MongoDB](https://www.mongodb.com/): provê nosso banco de dados de forma não relacional.

# Guia para preparar o ambiente de desenvolvimento

Uma vez que o ambiete satisfaça todas as dependências acima, é possível rodar nossa aplicação através do Docker. Para isto, basta que o Docker esteja rodando na máquina e na pasta raiz do projeto, através do terminal execute:

```
docker compose build
```

Este comando irá realizar as configurações necessárias para que o ambiente esteja configurado e pronto para ser ligado, através desse outro comando:

```
docker compose up
```

Este comando permite que possamos trabalhar em nossa solução de forma totalmente integrada através do link: http://localhost:3000/projects. 

*Observação:* você pode encontrar um modelo CSV para ser utilizado em [modelo](./MODELO_CSV.csv).

# Licença

Este projeto utiliza a [licença Apache 2.0](LICENSE).
