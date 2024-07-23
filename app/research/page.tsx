import { queryScholar } from "../components/scholar"
import { use } from "react";
import { Publication } from "../components/publication";
import { printPublication } from "../components/publication";

export default function Page() {
    const pubblications = use(queryScholar());
    return (
        <main>
            <div className="container text-center">
                <div className="row p-4">
                {pubblications.map((publication: Publication) => (
                printPublication(publication)
                ))}
                </div>
            </div>
        </main>
    )
  }