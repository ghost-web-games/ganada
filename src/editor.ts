import MapEditor from "./editor/mapeditor";

const app = new MapEditor();

window.addEventListener('load', () => {
    app.init();
    app.render();
});