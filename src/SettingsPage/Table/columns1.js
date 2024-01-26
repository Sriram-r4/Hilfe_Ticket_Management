import Capitalize from "../../Common/CapitalConverter";
import GetFormModal from "../../Common/util/FormModalPopUp";
import GetModalPopup from "../../Common/util/ModalPopup";

export const getColumns1 = (setLoading,navigate) => {
    const column1 = [
        {
            Header: "ID",
            accessor: "id",
            Cell: (props) => {
                return (
                    <p >{props.cell.value}</p>
                );
            }

        },

        {
            Header: "Category Name",
            accessor: "catname",
            filter: "includes",
            Cell: (props) => {
                return typeof props.cell.value === 'string' ?
                    <p>{Capitalize(props.cell.value)}</p> : <div>{props.cell.value}</div>;
            }
        },
        {
            Header: "",
            accessor: "icons",
            Cell: (props) => {
                return props.cell.value !== undefined ? <div>{props.cell.value}</div> :
                    <div className='d-flex justify-content-center'>
                        <div className='mx-2' onClick={()=>GetFormModal(props.id,"category",setLoading,navigate,props.cat)}>
                            <i className="bi bi-pencil-square fs-3" />
                        </div>
                        <div className='mx-2' onClick={() => GetModalPopup(props.id, "category",setLoading)}>
                            <i className="bi bi-trash fs-3" />
                        </div>
                    </div>

            }
        },
    ];
    return column1;
}