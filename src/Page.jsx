import { BakkaEditor } from './Components/BakkaEditor/BakkaEditor';

import "./css/Page.css";

export default function Page() {
    return (
        <div className="page">
          <div className="toolbar">
            <button>Load Dummy Nodes</button>
            <button>Load Page 0 Nodes</button>
          </div>
          <BakkaEditor />
        </div>
    )
}