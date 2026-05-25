const fs = require('fs');

// Read the js file
const content = fs.readFileSync('data/products.js', 'utf-8');
// Extract the JSON array part
const match = content.match(/export const products = (\[[\s\S]*\]);/);
if (match) {
  const products = eval(match[1]);
  let md = "# Lista de Artículos para Generar Imágenes\n\n";
  md += "Aquí tienes la lista completa de productos. Para cada uno, he sugerido un nombre de archivo (asegúrate de nombrarlo exactamente así para que el sistema lo detecte automáticamente si reemplazamos las rutas).\n\n";
  md += "| ID | Artículo | Persona / Dueño | Nombre de Archivo Sugerido | Descripción Corta |\n";
  md += "|---|---|---|---|---|\n";
  
  products.forEach(p => {
    md += `| ${p.id} | ${p.name.replace(p.person + "'s ", "")} | ${p.person} | \`${p.slug}.png\` | ${p.description.substring(0, 50)}... |\n`;
  });
  
  fs.writeFileSync('product_list.md', md);
  console.log("Generated product_list.md");
}
