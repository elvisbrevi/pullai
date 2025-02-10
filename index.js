const simpleGit = require("simple-git");
const git = simpleGit(
  "/Users/elvisbrevi/Code/sag/sag.portalpagos.micsrv.obtenertoken.v1"
);

// Definir las ramas y el directorio a comparar
const branch1 = "master";
const branch2 = "feature/15256-portar-logica-biztalk";
const base_dir =
  "/Users/elvisbrevi/Code/sag/sag.portalpagos.micsrv.obtenertoken.v1/"; // Ruta del directorio que quieres comparar

git.diffSummary([`${branch1}..${branch2}`, "--", base_dir], (err, diff) => {
  if (err) {
    //console.error('Error al obtener las diferencias:', err);
  } else {
    diff.files.forEach((file, index) => {
      //Comparar las diferencias entre las ramas para un directorio específico
      getDiff(branch1, branch2, file.file);
    });
  }
});

function getDiff(branch1, branch2, file) {
  git.diff([`${branch1}..${branch2}`, "--", base_dir + file], (err, diff) => {
    if (err) {
      console.error("Error al obtener las diferencias:", err);
    } else {
      console.log(diff);
    }
  });
}
