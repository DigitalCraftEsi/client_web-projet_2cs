import { useParams } from "react-router-dom";

export function NotificationDetails() {
    const { id } = useParams();
    const data = {
        date: "23/01/2023 15:23",
        idDistrubuteur: "2",
        description: "lorem ipsmu",
    }

    const suspectActions = [
        {
            date: "14:52",
            text: "lorem ipusm lorem ipusm lorem ipusm lorem ipusm"
        },
        {
            date: "14:52",
            text: "lorem ipusm lorem ipusm lorem ipusm lorem ipusm"
        },
        {
            date: "14:52",
            text: "lorem ipusm lorem ipusm lorem ipusm lorem ipusm"
        },
    ]

    return (
        <div className="w-full p-10 flex flex-col gap-10">
            <h1 className="text-2xl font-bold">Notifications</h1>

            <div className="bg-gray-50 flex flex-col gap-4 w-full p-4 rounded-md shadow hover:shadow-lg border-solid border-2">
                <div className="font-medium" >Date: {data.date}</div>
                <div className="font-medium" >Distributeur: {data.idDistrubuteur}</div>
                <div className="font-medium" >Description: {data.description}</div>
            </div>

            <div className="bg-gray-50 flex flex-col gap-4 w-full p-4 rounded-md shadow hover:shadow-lg border-solid border-2">
            <h3 className="text-xl font-bold">Suspect Actions</h3>
                {
                    suspectActions.map((action, index) => (
                        <div key={index} className="font-medium" >{action.date} : {action.text} </div>
                    ))
                }
            </div>
        </div>
    );
}