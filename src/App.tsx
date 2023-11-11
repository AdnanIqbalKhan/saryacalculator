import "./App.css";
import { useState } from "react";

function App() {
  const tabs = [
    {
      title: "Water Tank",
      component: <div>1</div>,
    },
    {
      title: "Lanter",
      component: <div>3</div>,
    },
    {
      title: "Column",
      component: <div>4</div>,
    },
    {
      title: "Staircase",
      component: <div>5</div>,
    },
  ];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="container h-screen px-4 m-auto">
      <div className="tabs tabs-boxed">
        {tabs.map((tab, index) => (
          <a
            key={index}
            className={`tab ${activeTab === index ? "tab-active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </a>
        ))}
      </div>
      <div>
        <div>{tabs[activeTab].component}</div>
      </div>
    </div>
  );
}

export default App;
