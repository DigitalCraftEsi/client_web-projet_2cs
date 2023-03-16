import { React } from "react";
import MaterialTable, { Column } from "@material-table/core";
import "@fontsource/poppins";
import classes from './styles.module.css';

const CoreTable = () => {

    const columns = [
        { title: "ID", field: "id", type: "numeric" },
        { title: "Email", field: "email" },
        { title: "Nom", field: "nom", },
        { title: "Telephone", field: "tel", type: "numeric" },
        {
            title: "Details", field: "details", cellStyle: {
                textDecoration: 'underline',
                color: '#218261'
            }
        }

    ];

    const data = [
        {
            id: '1',
            email: 'jamal@gmail.com',
            nom: 'Jamal',
            tel: '0771890493',
            details: 'Details',
        },
        {
            id: '2',
            email: 'taher32@gmail.com',
            nom: 'Taher',
            tel: '0771899876',
            details: 'Details',
        },
        {
            id: '3',
            email: 'kamel@gmail.com',
            nom: 'Kamel',
            tel: '0678980989',
            details: 'Details',
        },
        {
            id: '4',
            email: 'mohamed567@gamil.com',
            nom: 'mohamed',
            tel: '0578568934',
            details: 'Details',
        },
        {
            id: '4',
            email: 'mohamed567@gamil.com',
            nom: 'mohamed',
            tel: '0578568934',
            details: 'Details',
        }
    ];
    return (
        <div className={classes.tableCore} >
            <MaterialTable columns={columns} data={data} title='' options={{
                headerStyle: {
                    borderBottom: 'solid 1px black',
                    color: '#757575',
                    fontSize: '12px',
                    fontWeight: '600',
                    fontFamily: 'Poppins',
                    lineHeight: '18px',
                    paddingBottom: '10px',
                    textAlign: 'center'
                
                },
            }} />
        </div>
    )
}

export default CoreTable;