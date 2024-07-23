class Publication{
    athors: string;
    title: string;
    journal: string;
    year: string;
    citations: string;
    link: string;

    constructor(athors: string, title: string, journal: string, year: string, citations: string, link: string){
        this.athors = athors;
        this.title = title;
        this.journal = journal;
        this.year = year;
        this.citations = citations;
        this.link = link;
    }
}

function printPublication(Publication: Publication){
    return (
        <div className="max-w-md my-10 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{Publication.year}</div>
                <a href={Publication.link} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{Publication.title}</a>
                <p className="mt-2 text-slate-500 pub-authors">{Publication.athors}</p>
                <p className="mt-2 text-slate-500 pub-journal">{Publication.journal}</p>
                </div>
            </div>
        </div>
    )
  }
  
  export {
    Publication,
    printPublication
  }