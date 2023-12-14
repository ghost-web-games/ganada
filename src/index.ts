import App from "./app";

const app = new App();
/*
import MapEditor from "./editor/mapeditor";

const app = new MapEditor();
*/

window.addEventListener('load', () => {
    app.init();
    app.render();
});