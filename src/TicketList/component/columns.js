import { Link } from "react-router-dom";
import icon from "../../assets/svg/visibility_lock.svg";
import Capitalize from "../../Common/CapitalConverter";

export const column = [
        {
            Header: "Ticket",
            accessor: "ticket_id",
            Cell: (props) => {
                return (
                    <p >{Capitalize(props.cell.value)}</p>
                );
            }

        },

        {
            Header: "Title",
            accessor: "title",
            filter: "includes",
            Cell: (props) => {
                return (
                    <p className='border-box-style my-0 '>{Capitalize(props.cell.value)}</p>
                );
            }
        }, {
            Header: "",
            accessor: "description",
            filter: "includes",
            Cell: (props) => {
                return (
                    <p className="text-ellipsis">{Capitalize(props.cell.value)}</p>
                );
            }
        }, {
            Header: "Status",
            accessor: "status",
            filter: "includes",
            Cell: (props) => {
                return (
                    <p >{Capitalize(props.cell.value)}</p>
                );
            }
        }, {
            Header: "Priority",
            accessor: "priority",
            filter: "includes",
            Cell: (props) => {
                return (
                    <p>{Capitalize(props.cell.value)}</p>
                );
            }
        },
        {
            Header: "",
            accessor: "icon",
            Cell: (props) => {
                return (
                    <Link to="/tstatus" state={props.id}>
                    <img src={icon} alt='icon' />
                    </Link>
                );
            }
        },
    ];