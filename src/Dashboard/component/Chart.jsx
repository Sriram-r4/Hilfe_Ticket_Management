import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from 'chart.js';
import './chart.css';
import useTicket from "../../CustomHook/useTicket";

Chart.register(ArcElement,  Tooltip);
export default function CustomChart(props) {
    const [oticket, dtticket, ohticket, odticket, uaticket,loading] = useTicket();

    const options = {
        responsive: true,
        cutout: "30%",
        radius:"90%",
        plugins:{
            legend:{
                display:false
            }
        }

    }
    const data = {
        labels: ["Open Tickets", "Tickets Due Tickets", "Overdue Tickets", "Tickets On Hold", "Unassigned Tickets"],
        datasets: [
            {
                label: "Ticket status",
                data: [oticket, dtticket,  odticket,ohticket, uaticket],
                backgroundColor: ["#3568F5", "#E3603F", "#FE8B01", "#008759", "#5FB5D4"],
            }
        ]
    }

   
    
    return (
        <div className="row  my-auto mx-0 w-100">
            <div className="chart col-sm-6 col-6">


            <Doughnut data={data} options={options} className=" mr-4" />
            </div>
            
            <div className="data-labels col-sm-6 col-6">
                {
                    data.datasets[0].data.map((ds, i) => {
                        return (
                            <div className="label-data ms-lg-5" key={i}>
                                <div className=" shape mx-2" style={{backgroundColor:data.datasets[0].backgroundColor[i]}}></div>
                                <p className="labels ">{data.labels[i]}</p>
                                <p className="value  ">{data.datasets[0].data[i]} </p>
                            </div>);
                    })
                }
            </div>
        </div>
    );
}