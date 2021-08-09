const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const neatCsv = require('neat-csv');
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');
const mkdirp = require('mkdirp');


const folderPath = '/mydata';
const filePath = folderPath + '/apistats.csv';

async function updateStats(api) {
    try {
        fs.readFile(filePath, async (err, data) => {
            if (err) {
                console.log("readFile error = " + JSON.stringify(err));
                if (err.errno == -2) { // file does not exist
                    mkdirp(folderPath).then(async function () {
                        var stat = [{ "api": api, "count": 1 }];
                        const firstEntry = new ObjectsToCsv(stat);
                        await firstEntry.toDisk(filePath);
                        console.log("Created new file");

                    });
                } else {
                    console.error(err.errno);
                }
                return;
            };

            fileContent = await neatCsv(data);

            var found = false;

            for (var i = 0; i < fileContent.length; i++) {
                if (fileContent[i].api === api) {
                    fileContent[i].count = parseInt(fileContent[i].count) + 1;
                    found = true;
                    break;
                }
            }
            if (!found) {
                fileContent[fileContent.length] = { "api": api, "count": 1 };
            }

            const csv = new ObjectsToCsv(fileContent);

            await csv.toDisk(filePath);

            console.log("file updated");
        });
    } catch (error) {
        console.log("Error in updateStats");
        res.send('Some error occurred. Check log files to determine the error');
    }

}


app.get('/', (req, res) => {
    try {
        res.send('Welcome to Sample application');
    } catch (err) {
        res.send('Error occurred');
    }
});

app.get('/api1', (req, res) => {
    try {
        updateStats('api1');
        res.send('Hello World! from api1');
    } catch (err) {
        res.send('Error occurred while calling from api1');
    }
});

app.get('/api2', (req, res) => {
    updateStats('api2');
    res.send('Hello World! from api2');
});

app.get('/api3', (req, res) => {
    updateStats('api3');
    res.send('Hello World! from api3');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})