/*jshint esversion: 6 */
'use strict';

$(document).ready(function () {
    var dropZone = $('#dropZone');


    if (typeof (window.FileReader) === 'undefined') {
        dropZone.text('Не поддерживается браузером!');
        dropZone.addClass('error');
    }

    dropZone[0].ondragover = function () {
        dropZone.addClass('hover');
        return false;
    };

    dropZone[0].ondragleave = function () {
        dropZone.removeClass('hover');
        return false;
    };

    dropZone[0].ondrop = function (event) {
        event.preventDefault();
        dropZone.removeClass('hover');
        dropZone.addClass('drop');

        const file = event.dataTransfer.files[0];
        const reader = new FileReader();
        //reader.onload = onFileLoad;
        reader.onload = function (e) {
            onFileLoad(e, file.name);
        };
        reader.readAsDataURL(file);
    };
});

function log(text) {
    console.log(text);
}

function dropZoneOnClick() {
    $('#fileInput').trigger('click');
}

function fileChange(e) {

    var reader = new FileReader();
    var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

    reader.onload = function (e) {
        onFileLoad(e, files[0].name);
    };
    reader.readAsDataURL(files[0]);
}

/**
 * Загрузка файла
 * @param {any} e
 * @param {any} fileName
 */
function onFileLoad(e, fileName) {

    const data = e.target.result;
    const fileText = atob(data.split(',')[1]);

    const puzzle = new Puzzle(fileText);
    

    //drowPuzzle(puzzle);
    puzzle.Solve();
    drowSolvedPuzzle(puzzle);
}

// function drowPuzzle(puzzle){

// }

function drowSolvedPuzzle(puzzle){

}