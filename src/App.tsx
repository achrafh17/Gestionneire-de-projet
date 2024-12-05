import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const inputName = useRef();
  const inputMember = useRef();
  const dd = useRef();
  const df = useRef();
  const [projectsList, setprojectList] = useState([]);
  const [filtredlist, setfiltredlist] = useState(projectsList);

  //----------------------------------------------------------------------------------
  const addProject = () => {
    const projectName = inputName.current.value;
    const projectMemeber = inputMember.current.value;
    const datedebut = dd.current.value;
    const datefin = df.current.value;
    const item = {
      Name: projectName,
      Member: projectMemeber,
      DateDebut: datedebut,
      DateFin: datefin,
      Status: "En cours",
    };
    setprojectList([...projectsList, item]);

    inputName.current.value = "";
    inputMember.current.value = "";
  };
  //-------------------------------------------------------------------------------
  const termine = (index) => {
    const newlist = projectsList.map((item, i) =>
      index === i
        ? {
            ...item,
            Status: item.Status === "Termine" ? "En cours" : "Termine",
          }
        : item
    );
    setprojectList(newlist);
  };
  //-------------------------------------------------------------------------------------
  const modifier = (index) => {
    const name = window.prompt("Nom de Projet:");
    const member = window.prompt("Membre de projet:");
    const nouveaudatedebut = window.prompt("Date de debut:");
    const nouveaudatefin = window.prompt("Date de fin:");
    const newlist = projectsList.map((item, i) =>
      i === index
        ? {
            Name: name,
            Member: member,
            DateDebut: nouveaudatedebut,
            DateFin: nouveaudatefin,
          }
        : item
    );
    setprojectList(newlist);
    console.log(projectsList[index]);
  };
  //=============================================================
  const supprimer = (index) => {
    const newlist = projectsList.filter((item, i) => i !== index);
    setprojectList(newlist);
  };
  //---------------------------------------------------------------
  const filtrerTerminer = () => {
    // afficher les elements termine
    setfiltredlist(projectsList.filter((item) => item.Status === "Termine"));
  };

  //-----------------------------------------------------------------------------
  const filtrerEncours = () => {
    // afficher les elements en cours
    setfiltredlist(projectsList.filter((item) => item.Status === "En cours"));
  };
  //-------------------------------------------------------------
  const all = () => {
    setfiltredlist(projectsList);
  };
  useEffect(() => {
    setfiltredlist(projectsList);
  }, [projectsList]);
  return (
    <>
      <body>
        <section className="form">
          <h1>Gestionnaire de Projets</h1>
          <div className="containers-input">
            <input ref={inputName} type="text" placeholder="Nom de projet" />
            <input
              ref={inputMember}
              type="text"
              placeholder="Membres du projet"
            />
            <input ref={dd} type="date" />
            <input ref={df} type="date" />
            <button id="ajouter" onClick={() => addProject()}>
              Ajouter Projet
            </button>
          </div>
          <div className="filter-buttons">
            <button className="filter" onClick={all}>
              Tous
            </button>
            <button className="filter" onClick={filtrerTerminer}>
              Termine
            </button>
            <button className="filter" onClick={() => filtrerEncours()}>
              En cours
            </button>
          </div>
        </section>
        <section className="projects">
          {filtredlist.map((item, index) => {
            return (
              <>
                <div className="project-container" key={index}>
                  <h1 id="project-name">{item.Name} </h1>{" "}
                  <p id="project-item">
                    Projet Memberes: &nbsp; <span>{item.Member}</span>{" "}
                  </p>{" "}
                  <p id="project-item">
                    Date de debut: &nbsp;<span>{item.DateDebut}</span>{" "}
                  </p>{" "}
                  <p id="project-item">
                    Date de fin: &nbsp; <span>{item.DateFin}</span>
                  </p>{" "}
                  <p id="project-item">
                    Status: <span>{item.Status}</span> &nbsp;
                  </p>
                  <div className="buttons-parametres">
                    <button
                      className="Projects-button"
                      onClick={() => termine(index)}
                    >
                      Marquer{" "}
                      {item.Status === "Termine" ? "En cours" : "Termine"}
                    </button>
                    <button
                      className="Projects-button"
                      onClick={() => modifier(index)}
                    >
                      Modifier
                    </button>
                    <button
                      className="Projects-button"
                      onClick={() => supprimer(index)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </section>
      </body>
    </>
  );
}
export default App;
