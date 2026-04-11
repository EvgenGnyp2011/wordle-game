function renderBoard() {
    let state = getGameState();сом
    let boardElement = document.querySelector(".grid");
    let html = '';

    state.forEach(row => {
        row.forEach(tile => {
            html += `<div class="tile status-${tile}"></div>`;
        });
    });

    if (boardElement) {
        boardElement.innerHTML = html;
    }
};