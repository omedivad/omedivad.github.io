import { Publication } from "./publication";
 

export async function queryScholar() {
    const response = await fetch(`https://scholar.google.com/citations?user=UJ4D3rYAAAAJ&hl=en&oi=ao`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/html',
        }
    });
    const result = await response.text();
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    var dom = new JSDOM(result)
    var content = dom.window.document.getElementsByClassName("gsc_a_tr");
    var output = [];
    for (let i = 0; i < content.length; i++) {
        var authors = content[i].getElementsByClassName("gs_gray")[0].textContent;
        var title = content[i].getElementsByClassName("gsc_a_at")[0].textContent;
        var journal = content[i].getElementsByClassName("gs_gray")[1].textContent;
        var year = content[i].getElementsByClassName("gsc_a_y")[0].textContent;
        var citations = content[i].getElementsByClassName("gsc_a_c")[0].textContent;
        var link = content[i].getElementsByClassName("gsc_a_at")[0].textContent;
        var publication = new Publication(authors, title, journal, year, citations, link);
        output[i] = publication;
    }
    return output;
}
