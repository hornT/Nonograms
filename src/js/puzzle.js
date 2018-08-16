/*jshint esversion: 6 */
'use strict';

class Puzzle{

    constructor(puzzleText){

        this._parsePuzzle(puzzleText);
    }

    _parsePuzzle(puzzleText){

        const lines = puzzleText
            .split('\n')
            .map(s => s.replace('\r', ''))
            .filter(l => l !== '');

        /**
         * Формат файла:
         * n - количество цветов
         * n строк с hex цветами
         * x y размер сетки
         * x строк - с описанием строк
         * y строк - с описанием столбцов
         * 
         * Столбцы и строки:
         * n - количество клеток
         * клетка - l r g b
         * l - длина, rgb цвет в int формате
         */


        this._parseColors(lines);
        this._parseGridSize(lines);
        this._parseRows(lines);
        this._parseColumns(lines);
    }

    _parseColors(lines){

        const colorsCount = parseInt(lines[0]);
        lines.splice(0, 1); // Удаляем строку с количеством цветов

        this.Colors = lines.splice(0, colorsCount);
    }

    _parseGridSize(lines){

        const rc = lines[0].split(' ');

        this.RowCount = parseInt(rc[0]);
        this.ColumnCount = parseInt(rc[1]);

        lines.splice(0, 1); // Удаляем строку с размером таблицы
    }

    _parseRows(lines){

        this.RowsInfo = lines
            .splice(0, this.RowCount)
            .map(this._parseCellsInfo.bind(this));
    }

    _parseColumns(lines){

        this.RowsInfo = lines
            .splice(0, this.ColumnCount)
            .map(this._parseCellsInfo.bind(this));
    }

    _parseCellsInfo(cellsInfo){

        const s = cellsInfo.split(' ');

        const count = parseInt(s[0]);
        const result = [];
        
        for (let i = 0; i < count; i++) {

            let left = i * 4 + 1;
            let cellInfo = s.slice(left, left + 4);

            result.push(this._parseCellInfo(cellInfo));
        }

        return result;
    }

    _parseCellInfo(cellInfo){

        let cellCount = parseInt(cellInfo[0]);
        let r = parseInt(cellInfo[1]);
        let g = parseInt(cellInfo[2]);
        let b = parseInt(cellInfo[3]);

        return {
            Count: cellCount,
            ColorIndex: this._getColorIndex(r, g, b)
        };
    }

    _getColorIndex(r, g, b){

        const hColor = rgbToHex(r, g, b);

        return this.Colors.indexOf(hColor);
    }

    Solve(){

    }
}