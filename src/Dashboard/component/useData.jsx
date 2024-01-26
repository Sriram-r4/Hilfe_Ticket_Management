import useTicket from "../../CustomHook/useTicket";

export default function useData() {
    const [oticket, dtticket, ohticket, odticket, uaticket] = useTicket();
    const database = [
        {
            "no": oticket,
            "type": "Open tickets",
            "color": "blue"
        },
        {
            "no": dtticket,
            "type": "Tickets Due Today",
            "color": "rgba(207, 6, 6,1)"
        },
        {
            "no": ohticket,
            "type": "Tickets On Hold",
            "color": "rgba(1, 126, 84,1)"
        },
        {
            "no": uaticket,
            "type": "Unassigned Tickets",
            "color": "rgba(92, 195, 230,1)"
        },
        {
            "no": odticket,
            "type": "Overdue Tickets",
            "color": "darkviolet"
        }
    ]
    return database;
}