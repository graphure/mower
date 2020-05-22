const Mower = require('./mower.js');
const fs = require('fs');
const readline = require('readline');


async function processLineByLine() {
    //récupération du fichier d'innput
    const fileStream = fs.createReadStream('input.txt');
    try {
        //liste des tondeuses créées
        let mowers = [];
        //liste des résultats obtenus
        let result = [];
        //afin d'identifier les lignes du fichier
        let lineNmbr = 0;
        //déclaration de la variable pour récupérer taille de la surface
        const surface = { x: 0, y: 0 };

        //on ouvre le fichier 
        const lines = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        //on traite les données ligne par ligne
        for await (const line of lines) {
            //définition de la taille de la surface à tondre
            if (lineNmbr == 0) {
                let tempSurface = line.split(" ");
                surface.x = parseFloat(tempSurface[0]);
                surface.y = parseFloat(tempSurface[1]);
            }
            if (lineNmbr > 0) {
            	//gestion par régex 
            	// => permet de gérer même des fichiers contenant des erreurs
                //chaque ligne contenant des coordoonées et une direction crée une nouvelle tondeuse
                if (/[1-9]+ [1-9]+ [A-Z]/.test(line)) {
                    let mowerInfo = line.split(" ");
                    let mower = new Mower(surface, parseFloat(mowerInfo[0]), parseFloat(mowerInfo[1]), mowerInfo[2]);
                    //chaque tondeuse est stoquée dans le tableau mowers
                    mowers.push(mower);

                    //on exécute toutes les instructions à la dernière tondeuse créée
                } else if (/L|R|F/g.test(line)) {
                    //tous les résultats des instructions sont stockées dans un tableau
                    result.push(mowers[mowers.length - 1].followInstructions(line));
                }
            }
            lineNmbr++;
        }

        //écriture du fichier d'export incluant les résultats
        fs.writeFile('output.txt', result.join('\n'), function(err) {
            if (err) return console.log(err);
            console.log(result);
        });
    } catch (err) {
        throw(err);
    }
}

processLineByLine();