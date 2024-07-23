import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="container text-center">
          <div className="row p-4">
              <div className="col-12 col-md-4 text-center">
                  <Image priority={true} className="profile-img mx-auto my-4 my-md-auto" src="/images/davide.jpg" width={250} height={250} alt="Picture of the author"/>
              </div>
              <div className="col-12 col-md-8">
                  <h1>Davide Morelli</h1>
                  <p>PhD Student</p>
                  <p className="mt-4">University of Modena and Reggio Emilia</p>
                  <p>University of Pisa</p>
                  <p></p>
              </div>
          </div>
      </div>
    </main>
  )
}