import { useEffect, useState } from "react";
import BarContainer from './BarContainer'
import classes from './styles.module.css';

const dummy = {
    "state": "En marche",
    "date": "5j 23h",
    "temp": "68",
    "dataArray": [
        {
            "label": "Cafe",
            "value": 30,
            "maxValue": 50
        },
        {
            "label": "Lait",
            "value": 80,
            "maxValue": 100
        },
        {
            "label": "Eau",
            "value": 50,
            "maxValue": 100
        },
        {
            "label": "Gobelets",
            "value": 20,
            "maxValue": 100
        }
    ]
}

const ChartComponent = () => {

    const [fetchedData, setFetchedData] = useState(dummy);

    useEffect(() => {
        setTimeout(() => {
            fetch('./dummy.json')
                .then(response => response.json())
                .then(data => setFetchedData(data));
        }, 1000);
    }, []);

    return (
        <div className={classes.supContainer} >
            <div className={classes.topInfo}>
                <p className={classes.title} >Etat :</p>
                <p className={classes.state} >{fetchedData.state}</p>
                <p className={classes.title} >Depuis ({fetchedData.date})</p>
            </div>
            <div className={classes.topInfo} >
                <p className={classes.title} >Température d'eau :</p>
                <p className={classes.temp}>{fetchedData.temp}°C</p>
            </div>
            <div>
                <p className={classes.title}>Ingredients :</p>
            </div>

            <div>
                {fetchedData.dataArray &&
                    <BarContainer dataPoints={fetchedData.dataArray} />}
            </div>

            <div className={classes.links}>
                <a href="#!">Historique des pannes</a>
                <a href="#!">Graphe d'utilisation</a>
                <a href="#!">Logs</a>
            </div>
        </div>
    )
}
export default ChartComponent;